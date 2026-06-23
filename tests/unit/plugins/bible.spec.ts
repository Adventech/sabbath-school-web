import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import BiblePlugin from '@/plugins/Bible/index.js'

describe('Bible Plugin', () => {
  describe('plugin installation', () => {
    it('should register v-bible-links directive', () => {
      const mockApp = {
        directive: vi.fn(),
        config: {
          globalProperties: {
            emitter: {
              emit: vi.fn()
            }
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      expect(mockApp.directive).toHaveBeenCalledWith('bible-links', expect.any(Object))
    })

    it('should have install function', () => {
      expect(typeof BiblePlugin.install).toBe('function')
    })
  })

  describe('v-bible-links directive', () => {
    let mockEmitter: { emit: ReturnType<typeof vi.fn> }

    beforeEach(() => {
      mockEmitter = {
        emit: vi.fn()
      }
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    it('should emit bible-click event when clicking bible link', async () => {
      // Create a test component with the directive
      const TestComponent = defineComponent({
        template: `
          <div v-bible-links="{ documentId: 'doc-1' }">
            <a href="John 3:16" class="resource-link-sspm-bible">John 3:16</a>
          </div>
        `
      })

      // Create a mock app to install the plugin
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      // Install the plugin to get the directive definition
      BiblePlugin.install(mockApp as any, {})

      // Create an element and simulate the directive's mounted behavior
      const container = document.createElement('div')
      container.innerHTML = `
        <a href="John 3:16" class="resource-link-sspm-bible">John 3:16</a>
      `

      const binding = { value: { documentId: 'doc-1' } }

      // Call the mounted hook
      directiveHandlers['bible-links'].mounted(container, binding)

      // Simulate click on the link
      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('bible-click', {
        verse: 'John 3:16',
        documentId: 'doc-1'
      })
    })

    it('should emit egw-click event when clicking EGW link', async () => {
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      const container = document.createElement('div')
      container.innerHTML = `
        <a href="GC 123.4" class="resource-link-sspm-egw">Great Controversy, p. 123</a>
      `

      const binding = { value: { documentId: 'doc-1' } }
      directiveHandlers['bible-links'].mounted(container, binding)

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('egw-click', {
        reference: 'GC 123.4',
        title: 'Great Controversy, p. 123',
        documentId: 'doc-1'
      })
    })

    it('should emit completion-click event when clicking completion link', async () => {
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      const container = document.createElement('div')
      container.innerHTML = `
        <a href="completion-123" class="resource-link-sspm-completion">Complete Task</a>
      `

      const binding = { value: { documentId: 'doc-1' } }
      directiveHandlers['bible-links'].mounted(container, binding)

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('completion-click', {
        completionId: 'completion-123',
        userCompletion: 'Complete Task',
        documentId: 'doc-1'
      })
    })

    it('should not emit event for regular links', async () => {
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      const container = document.createElement('div')
      container.innerHTML = `
        <a href="https://example.com" class="regular-link">Regular Link</a>
      `

      const binding = { value: { documentId: 'doc-1' } }
      directiveHandlers['bible-links'].mounted(container, binding)

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).not.toHaveBeenCalled()
    })

    it('should prevent default on bible link click', async () => {
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      const container = document.createElement('div')
      container.innerHTML = `
        <a href="John 3:16" class="resource-link-sspm-bible">John 3:16</a>
      `

      const binding = { value: {} }
      directiveHandlers['bible-links'].mounted(container, binding)

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault')

      link?.dispatchEvent(clickEvent)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should prevent default on EGW link click', async () => {
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      const container = document.createElement('div')
      container.innerHTML = `
        <a href="GC 123" class="resource-link-sspm-egw">EGW Reference</a>
      `

      const binding = { value: {} }
      directiveHandlers['bible-links'].mounted(container, binding)

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault')

      link?.dispatchEvent(clickEvent)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should prevent default on completion link click', async () => {
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      const container = document.createElement('div')
      container.innerHTML = `
        <a href="task-1" class="resource-link-sspm-completion">Complete</a>
      `

      const binding = { value: {} }
      directiveHandlers['bible-links'].mounted(container, binding)

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault')

      link?.dispatchEvent(clickEvent)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should handle click on nested element inside link', async () => {
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      const container = document.createElement('div')
      container.innerHTML = `
        <a href="Romans 8:28" class="resource-link-sspm-bible">
          <span class="verse-text">Romans 8:28</span>
        </a>
      `

      const binding = { value: { blockId: 'block-1' } }
      directiveHandlers['bible-links'].mounted(container, binding)

      // Click on the span inside the link
      const span = container.querySelector('span')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: span })

      span?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('bible-click', {
        verse: 'Romans 8:28',
        blockId: 'block-1'
      })
    })

    it('should not emit when clicking on non-link element', async () => {
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      const container = document.createElement('div')
      container.innerHTML = `
        <p>Some text without links</p>
        <a href="John 3:16" class="resource-link-sspm-bible">John 3:16</a>
      `

      const binding = { value: {} }
      directiveHandlers['bible-links'].mounted(container, binding)

      // Click on the paragraph, not the link
      const paragraph = container.querySelector('p')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: paragraph })

      paragraph?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).not.toHaveBeenCalled()
    })

    it('should merge binding value with event data', async () => {
      const directiveHandlers: Record<string, any> = {}
      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})

      const container = document.createElement('div')
      container.innerHTML = `
        <a href="Genesis 1:1" class="resource-link-sspm-bible">Genesis 1:1</a>
      `

      const binding = {
        value: {
          documentId: 'doc-123',
          blockId: 'block-456',
          customData: 'test'
        }
      }
      directiveHandlers['bible-links'].mounted(container, binding)

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('bible-click', {
        verse: 'Genesis 1:1',
        documentId: 'doc-123',
        blockId: 'block-456',
        customData: 'test'
      })
    })
  })

  describe('link class detection', () => {
    let directiveHandlers: Record<string, any>
    let mockEmitter: { emit: ReturnType<typeof vi.fn> }

    beforeEach(() => {
      directiveHandlers = {}
      mockEmitter = { emit: vi.fn() }

      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})
    })

    it('should detect resource-link-sspm-bible class', async () => {
      const container = document.createElement('div')
      container.innerHTML = `<a href="Psalm 23" class="resource-link-sspm-bible">Psalm 23</a>`

      directiveHandlers['bible-links'].mounted(container, { value: {} })

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('bible-click', expect.any(Object))
    })

    it('should detect resource-link-sspm-egw class', async () => {
      const container = document.createElement('div')
      container.innerHTML = `<a href="DA 100" class="resource-link-sspm-egw">Desire of Ages</a>`

      directiveHandlers['bible-links'].mounted(container, { value: {} })

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('egw-click', expect.any(Object))
    })

    it('should detect resource-link-sspm-completion class', async () => {
      const container = document.createElement('div')
      container.innerHTML = `<a href="task-id" class="resource-link-sspm-completion">Mark Complete</a>`

      directiveHandlers['bible-links'].mounted(container, { value: {} })

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('completion-click', expect.any(Object))
    })

    it('should handle link with multiple classes', async () => {
      const container = document.createElement('div')
      container.innerHTML = `<a href="Matt 5:5" class="styled resource-link-sspm-bible highlighted">Matthew 5:5</a>`

      directiveHandlers['bible-links'].mounted(container, { value: {} })

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('bible-click', expect.any(Object))
    })
  })

  describe('edge cases', () => {
    let directiveHandlers: Record<string, any>
    let mockEmitter: { emit: ReturnType<typeof vi.fn> }

    beforeEach(() => {
      directiveHandlers = {}
      mockEmitter = { emit: vi.fn() }

      const mockApp = {
        directive: (name: string, definition: any) => {
          directiveHandlers[name] = definition
        },
        config: {
          globalProperties: {
            emitter: mockEmitter
          }
        }
      }

      BiblePlugin.install(mockApp as any, {})
    })

    it('should handle empty href', async () => {
      const container = document.createElement('div')
      container.innerHTML = `<a href="" class="resource-link-sspm-bible">Empty Verse</a>`

      directiveHandlers['bible-links'].mounted(container, { value: {} })

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('bible-click', {
        verse: ''
      })
    })

    it('should handle special characters in href', async () => {
      const container = document.createElement('div')
      container.innerHTML = `<a href="1 Cor 13:4-7" class="resource-link-sspm-bible">1 Corinthians 13:4-7</a>`

      directiveHandlers['bible-links'].mounted(container, { value: {} })

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('bible-click', {
        verse: '1 Cor 13:4-7'
      })
    })

    it('should handle unicode in text content', async () => {
      const container = document.createElement('div')
      container.innerHTML = `<a href="ref-123" class="resource-link-sspm-egw">Testimonios para la Iglesia</a>`

      directiveHandlers['bible-links'].mounted(container, { value: {} })

      const link = container.querySelector('a')
      const clickEvent = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent, 'target', { value: link })

      link?.dispatchEvent(clickEvent)

      expect(mockEmitter.emit).toHaveBeenCalledWith('egw-click', {
        reference: 'ref-123',
        title: 'Testimonios para la Iglesia'
      })
    })

    it('should handle multiple links in same container', async () => {
      const container = document.createElement('div')
      container.innerHTML = `
        <a href="John 3:16" class="resource-link-sspm-bible">John 3:16</a>
        <a href="Romans 8:28" class="resource-link-sspm-bible">Romans 8:28</a>
      `

      directiveHandlers['bible-links'].mounted(container, { value: {} })

      // Click first link
      const links = container.querySelectorAll('a')
      const clickEvent1 = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent1, 'target', { value: links[0] })
      links[0]?.dispatchEvent(clickEvent1)

      expect(mockEmitter.emit).toHaveBeenCalledWith('bible-click', {
        verse: 'John 3:16'
      })

      // Click second link
      const clickEvent2 = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(clickEvent2, 'target', { value: links[1] })
      links[1]?.dispatchEvent(clickEvent2)

      expect(mockEmitter.emit).toHaveBeenCalledWith('bible-click', {
        verse: 'Romans 8:28'
      })
    })
  })
})
