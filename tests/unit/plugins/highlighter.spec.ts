import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock rangy and jQuery before importing the module
vi.mock('rangy', () => ({
  default: {
    getSelection: vi.fn().mockReturnValue({
      getRangeAt: vi.fn().mockReturnValue({
        containsNode: vi.fn().mockReturnValue(false),
        getBookmark: vi.fn().mockReturnValue({ start: 0, end: 10 })
      })
    })
  }
}))

vi.mock('jquery', () => ({
  default: vi.fn((selector) => ({
    find: vi.fn().mockReturnValue({
      each: vi.fn()
    }),
    replaceWith: vi.fn(),
    html: vi.fn().mockReturnValue('')
  }))
}))

// Import Highlighter class by extracting it from the plugin
// Since the class is not exported directly, we'll test the plugin interface
import HighlighterPlugin from '@/plugins/Highlighter/index.js'

describe('Highlighter Plugin', () => {
  describe('plugin installation', () => {
    it('should install $highlighter on globalProperties', () => {
      const mockApp = {
        config: {
          globalProperties: {} as Record<string, any>
        }
      }

      HighlighterPlugin.install(mockApp as any, {})

      expect(mockApp.config.globalProperties.$highlighter).toBeDefined()
    })

    it('should have install function', () => {
      expect(typeof HighlighterPlugin.install).toBe('function')
    })
  })

  describe('Highlighter class', () => {
    let highlighter: any

    beforeEach(() => {
      const mockApp = {
        config: {
          globalProperties: {} as Record<string, any>
        }
      }
      HighlighterPlugin.install(mockApp as any, {})
      highlighter = mockApp.config.globalProperties.$highlighter
    })

    describe('normalizeInnerHTML', () => {
      it('should remove newlines', () => {
        const input = 'Hello\nWorld'
        const result = highlighter.normalizeInnerHTML(input)
        expect(result).toBe('HelloWorld')
      })

      it('should replace &nbsp; with non-breaking space', () => {
        const input = 'Hello&nbsp;World'
        const result = highlighter.normalizeInnerHTML(input)
        expect(result).toBe('Hello\u00a0World')
      })

      it('should handle multiple newlines', () => {
        const input = 'Line1\nLine2\nLine3'
        const result = highlighter.normalizeInnerHTML(input)
        expect(result).toBe('Line1Line2Line3')
      })

      it('should handle multiple &nbsp;', () => {
        const input = 'Word1&nbsp;&nbsp;Word2'
        const result = highlighter.normalizeInnerHTML(input)
        expect(result).toBe('Word1\u00a0\u00a0Word2')
      })

      it('should handle mixed content', () => {
        const input = 'Hello\n&nbsp;World\n'
        const result = highlighter.normalizeInnerHTML(input)
        expect(result).toBe('Hello\u00a0World')
      })

      it('should handle empty string', () => {
        const result = highlighter.normalizeInnerHTML('')
        expect(result).toBe('')
      })

      it('should handle string without newlines or &nbsp;', () => {
        const input = 'Hello World'
        const result = highlighter.normalizeInnerHTML(input)
        expect(result).toBe('Hello World')
      })
    })

    describe('findNextTag', () => {
      it('should return undefined for string with tags (due to global flag behavior)', () => {
        // Note: The original function uses match with 'g' flag which returns an array,
        // so match.index is undefined. This tests the actual behavior.
        const input = 'text<span>content</span>'
        const result = highlighter.findNextTag(input)
        // With global flag, match returns array, array.index is undefined
        expect(result).toBeUndefined()
      })

      it('should return null for string without tags', () => {
        const input = 'plain text without tags'
        const result = highlighter.findNextTag(input)
        expect(result).toBeNull()
      })

      it('should return undefined for self-closing tags (due to global flag behavior)', () => {
        // Same behavior as above - global flag causes array return
        const input = 'text<br/>more text'
        const result = highlighter.findNextTag(input)
        expect(result).toBeUndefined()
      })

      it('should handle empty string', () => {
        const result = highlighter.findNextTag('')
        expect(result).toBeNull()
      })
    })

    describe('getPositionsIgnoringTags', () => {
      it('should return positions for simple text', () => {
        const input = 'Hello'
        const result = highlighter.getPositionsIgnoringTags(input)
        expect(result.length).toBe(5)
        result.forEach((pos: any) => {
          expect(pos.insideTag).toBe(false)
        })
      })

      it('should track positions inside tags', () => {
        const input = '<span>Hello</span>'
        const result = highlighter.getPositionsIgnoringTags(input)
        // Characters inside <span>...</span> should have insideTag = true
        const insideTagPositions = result.filter((pos: any) => pos.insideTag)
        expect(insideTagPositions.length).toBeGreaterThan(0)
      })

      it('should handle nested tags', () => {
        const input = '<p><span>text</span></p>'
        const result = highlighter.getPositionsIgnoringTags(input)
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
      })

      it('should track tag boundaries', () => {
        const input = '<span>A</span>'
        const result = highlighter.getPositionsIgnoringTags(input)
        const positionsWithBoundaries = result.filter(
          (pos: any) => pos.tagBoundaries !== null
        )
        expect(positionsWithBoundaries.length).toBeGreaterThan(0)
      })

      it('should handle empty string', () => {
        const result = highlighter.getPositionsIgnoringTags('')
        expect(result).toEqual([])
      })

      it('should handle text with multiple tags', () => {
        const input = '<p>Hello</p><p>World</p>'
        const result = highlighter.getPositionsIgnoringTags(input)
        expect(result.length).toBe(10) // "HelloWorld" = 10 characters
      })
    })

    describe('filterOverlappingHighlights', () => {
      it('should return array with new highlight when no overlap', async () => {
        const newHighlight = { startIndex: 0, endIndex: 5, color: 'yellow' }
        const existingHighlights = [
          { startIndex: 10, endIndex: 15, color: 'blue' }
        ]

        const result = await highlighter.filterOverlappingHighlights(
          newHighlight,
          existingHighlights
        )

        expect(result).toContain(newHighlight)
        expect(result).toContain(existingHighlights[0])
      })

      it('should filter highlight that overlaps at start', async () => {
        const newHighlight = { startIndex: 0, endIndex: 10, color: 'yellow' }
        const existingHighlights = [
          { startIndex: 5, endIndex: 15, color: 'blue' }
        ]

        const result = await highlighter.filterOverlappingHighlights(
          newHighlight,
          existingHighlights
        )

        expect(result).toContain(newHighlight)
        expect(result).not.toContain(existingHighlights[0])
      })

      it('should filter highlight that overlaps at end', async () => {
        const newHighlight = { startIndex: 10, endIndex: 20, color: 'yellow' }
        const existingHighlights = [
          { startIndex: 5, endIndex: 15, color: 'blue' }
        ]

        const result = await highlighter.filterOverlappingHighlights(
          newHighlight,
          existingHighlights
        )

        expect(result).toContain(newHighlight)
        expect(result).not.toContain(existingHighlights[0])
      })

      it('should filter highlight contained within new highlight', async () => {
        const newHighlight = { startIndex: 0, endIndex: 20, color: 'yellow' }
        const existingHighlights = [
          { startIndex: 5, endIndex: 15, color: 'blue' }
        ]

        const result = await highlighter.filterOverlappingHighlights(
          newHighlight,
          existingHighlights
        )

        expect(result).toContain(newHighlight)
        expect(result).not.toContain(existingHighlights[0])
      })

      it('should handle empty existing highlights', async () => {
        const newHighlight = { startIndex: 0, endIndex: 5, color: 'yellow' }
        const existingHighlights: any[] = []

        const result = await highlighter.filterOverlappingHighlights(
          newHighlight,
          existingHighlights
        )

        expect(result).toEqual([newHighlight])
      })

      it('should filter multiple overlapping highlights', async () => {
        const newHighlight = { startIndex: 5, endIndex: 15, color: 'yellow' }
        const existingHighlights = [
          { startIndex: 0, endIndex: 10, color: 'blue' },
          { startIndex: 10, endIndex: 20, color: 'green' },
          { startIndex: 25, endIndex: 30, color: 'red' } // non-overlapping
        ]

        const result = await highlighter.filterOverlappingHighlights(
          newHighlight,
          existingHighlights
        )

        expect(result).toContain(newHighlight)
        expect(result).not.toContain(existingHighlights[0])
        expect(result).not.toContain(existingHighlights[1])
        expect(result).toContain(existingHighlights[2])
      })
    })

    describe('rangy integration', () => {
      it('should have rangy instance', () => {
        expect(highlighter.rangy).toBeDefined()
      })
    })
  })

  describe('highlight colors', () => {
    let highlighter: any

    beforeEach(() => {
      const mockApp = {
        config: {
          globalProperties: {} as Record<string, any>
        }
      }
      HighlighterPlugin.install(mockApp as any, {})
      highlighter = mockApp.config.globalProperties.$highlighter
    })

    it('should support yellow color', async () => {
      const highlight = { startIndex: 0, endIndex: 5, color: 'yellow' }
      const result = await highlighter.filterOverlappingHighlights(highlight, [])
      expect(result[0].color).toBe('yellow')
    })

    it('should support blue color', async () => {
      const highlight = { startIndex: 0, endIndex: 5, color: 'blue' }
      const result = await highlighter.filterOverlappingHighlights(highlight, [])
      expect(result[0].color).toBe('blue')
    })

    it('should support green color', async () => {
      const highlight = { startIndex: 0, endIndex: 5, color: 'green' }
      const result = await highlighter.filterOverlappingHighlights(highlight, [])
      expect(result[0].color).toBe('green')
    })

    it('should support orange color', async () => {
      const highlight = { startIndex: 0, endIndex: 5, color: 'orange' }
      const result = await highlighter.filterOverlappingHighlights(highlight, [])
      expect(result[0].color).toBe('orange')
    })
  })

  describe('edge cases', () => {
    let highlighter: any

    beforeEach(() => {
      const mockApp = {
        config: {
          globalProperties: {} as Record<string, any>
        }
      }
      HighlighterPlugin.install(mockApp as any, {})
      highlighter = mockApp.config.globalProperties.$highlighter
    })

    describe('normalizeInnerHTML edge cases', () => {
      it('should handle only newlines', () => {
        const result = highlighter.normalizeInnerHTML('\n\n\n')
        expect(result).toBe('')
      })

      it('should handle only &nbsp;', () => {
        const result = highlighter.normalizeInnerHTML('&nbsp;&nbsp;&nbsp;')
        expect(result).toBe('\u00a0\u00a0\u00a0')
      })

      it('should preserve other HTML entities', () => {
        const input = 'Hello &amp; World'
        const result = highlighter.normalizeInnerHTML(input)
        expect(result).toBe('Hello &amp; World')
      })
    })

    describe('highlight with same start and end', () => {
      it('should handle zero-length highlight', async () => {
        const highlight = { startIndex: 5, endIndex: 5, color: 'yellow' }
        const result = await highlighter.filterOverlappingHighlights(highlight, [])
        expect(result).toContainEqual(highlight)
      })
    })

    describe('boundary conditions', () => {
      it('should handle highlights at index 0', async () => {
        const highlight = { startIndex: 0, endIndex: 5, color: 'yellow' }
        const result = await highlighter.filterOverlappingHighlights(highlight, [])
        expect(result[0].startIndex).toBe(0)
      })

      it('should handle adjacent non-overlapping highlights', async () => {
        const newHighlight = { startIndex: 10, endIndex: 20, color: 'yellow' }
        const existingHighlights = [
          { startIndex: 0, endIndex: 9, color: 'blue' }
        ]

        const result = await highlighter.filterOverlappingHighlights(
          newHighlight,
          existingHighlights
        )

        // Adjacent highlights (end of one = start of another - 1) should not overlap
        expect(result).toContain(newHighlight)
        expect(result).toContain(existingHighlights[0])
      })

      it('should handle touching highlights (end = start)', async () => {
        const newHighlight = { startIndex: 10, endIndex: 20, color: 'yellow' }
        const existingHighlights = [
          { startIndex: 0, endIndex: 10, color: 'blue' }
        ]

        const result = await highlighter.filterOverlappingHighlights(
          newHighlight,
          existingHighlights
        )

        // When newHighlight.startIndex equals existingHighlight.endIndex,
        // they touch but according to the condition, this is considered overlapping
        expect(result).toContain(newHighlight)
        // The existing highlight is filtered out because startIndex (10) >= startIndex (0)
        // AND startIndex (10) <= endIndex (10)
        expect(result).not.toContain(existingHighlights[0])
      })
    })
  })

  describe('getPositionsIgnoringTags complex scenarios', () => {
    let highlighter: any

    beforeEach(() => {
      const mockApp = {
        config: {
          globalProperties: {} as Record<string, any>
        }
      }
      HighlighterPlugin.install(mockApp as any, {})
      highlighter = mockApp.config.globalProperties.$highlighter
    })

    it('should handle deeply nested tags', () => {
      const input = '<div><p><span>X</span></p></div>'
      const result = highlighter.getPositionsIgnoringTags(input)
      // Only 'X' should be counted as a position
      expect(result.length).toBe(1)
    })

    it('should handle self-closing tags', () => {
      const input = 'Hello<br/>World'
      const result = highlighter.getPositionsIgnoringTags(input)
      // 'HelloWorld' = 10 characters, but <br/> might affect counting
      expect(result.length).toBeGreaterThan(0)
    })

    it('should handle tags with attributes', () => {
      const input = '<span class="test" id="abc">Text</span>'
      const result = highlighter.getPositionsIgnoringTags(input)
      // 'Text' = 4 characters
      expect(result.length).toBe(4)
    })

    it('should handle multiple adjacent tags', () => {
      const input = '<b>A</b><i>B</i><u>C</u>'
      const result = highlighter.getPositionsIgnoringTags(input)
      // 'ABC' = 3 characters
      expect(result.length).toBe(3)
    })
  })
})
