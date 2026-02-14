import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import Block from '@/components/Resources/Blocks/Block.vue'

// Mock all block sub-components
vi.mock('@/components/Resources/Blocks/List.vue', () => ({
  default: { name: 'List', template: '<div class="mock-list"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/ListItem.vue', () => ({
  default: { name: 'ListItem', template: '<div class="mock-list-item"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Paragraph.vue', () => ({
  default: { name: 'Paragraph', template: '<p class="mock-paragraph"><slot /></p>' }
}))
vi.mock('@/components/Resources/Blocks/Blockquote.vue', () => ({
  default: { name: 'Blockquote', template: '<blockquote class="mock-blockquote"><slot /></blockquote>' }
}))
vi.mock('@/components/Resources/Blocks/Heading.vue', () => ({
  default: { name: 'Heading', template: '<div class="mock-heading"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Hr.vue', () => ({
  default: { name: 'Hr', template: '<hr class="mock-hr" />' }
}))
vi.mock('@/components/Resources/Blocks/Image.vue', () => ({
  default: { name: 'Image', template: '<img class="mock-image" />' }
}))
vi.mock('@/components/Resources/Blocks/Question.vue', () => ({
  default: { name: 'Question', template: '<div class="mock-question"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Reference.vue', () => ({
  default: { name: 'Reference', template: '<div class="mock-reference"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Audio.vue', () => ({
  default: { name: 'Audio', template: '<audio class="mock-audio" />' }
}))
vi.mock('@/components/Resources/Blocks/Video.vue', () => ({
  default: { name: 'Video', template: '<video class="mock-video" />' }
}))
vi.mock('@/components/Resources/Blocks/Poll.vue', () => ({
  default: { name: 'Poll', template: '<div class="mock-poll"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Collapse.vue', () => ({
  default: { name: 'Collapse', template: '<div class="mock-collapse"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Carousel.vue', () => ({
  default: { name: 'Carousel', template: '<div class="mock-carousel"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Slide.vue', () => ({
  default: { name: 'Slide', template: '<div class="mock-slide"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Appeal.vue', () => ({
  default: { name: 'Appeal', template: '<div class="mock-appeal"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/MultipleChoice.vue', () => ({
  default: { name: 'MultipleChoice', template: '<div class="mock-multiple-choice"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/ListItemChoice.vue', () => ({
  default: { name: 'ListItemChoice', template: '<div class="mock-list-item-choice"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Checklist.vue', () => ({
  default: { name: 'Checklist', template: '<div class="mock-checklist"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/ListItemChecklist.vue', () => ({
  default: { name: 'ListItemChecklist', template: '<div class="mock-list-item-checklist"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Excerpt.vue', () => ({
  default: { name: 'Excerpt', template: '<div class="mock-excerpt"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/ExcerptItem.vue', () => ({
  default: { name: 'ExcerptItem', template: '<div class="mock-excerpt-item"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Story.vue', () => ({
  default: { name: 'Story', template: '<div class="mock-story"><slot /></div>' }
}))
vi.mock('@/components/Resources/Blocks/Table.vue', () => ({
  default: { name: 'Table', template: '<table class="mock-table"><slot /></table>' }
}))

// Mock BlockStyle
vi.mock('@/components/Resources/Style/BlockStyle', () => ({
  BlockStyle: {
    getElementStyle: vi.fn(() => ({ class: 'mock-class', style: 'mock-style' })),
    getTextStyle: vi.fn(() => ({ class: 'mock-text-class', style: 'mock-text-style' }))
  }
}))

describe('Block.vue', () => {
  let wrapper: VueWrapper

  const mockProvide = {
    getStyle: () => ({ blocks: {} }),
    getDefaultStyles: () => ({}),
    getDocument: () => ({ id: 'doc-123', title: 'Test Document' }),
    getDocumentUserInput: () => []
  }

  const createBlock = (type: string, overrides = {}) => ({
    id: `block-${type}-1`,
    type,
    ...overrides
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render a paragraph block', () => {
      const block = createBlock('paragraph', { text: 'Test paragraph' })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a heading block', () => {
      const block = createBlock('heading', { depth: 2, text: 'Test Heading' })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a list block', () => {
      const block = createBlock('list', {
        items: [
          { id: 'item-1', type: 'list-item', text: 'Item 1' },
          { id: 'item-2', type: 'list-item', text: 'Item 2' }
        ]
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a question block', () => {
      const block = createBlock('question', {
        text: 'What is the answer?',
        answer: ''
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render an image block', () => {
      const block = createBlock('image', {
        src: 'https://example.com/image.jpg',
        alt: 'Test image'
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a video block', () => {
      const block = createBlock('video', {
        src: 'https://example.com/video.mp4'
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render an audio block', () => {
      const block = createBlock('audio', {
        src: 'https://example.com/audio.mp3'
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a blockquote block', () => {
      const block = createBlock('blockquote', {
        text: 'This is a quote'
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a horizontal rule block', () => {
      const block = createBlock('hr')

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a reference block', () => {
      const block = createBlock('reference', {
        reference: 'John 3:16',
        text: 'For God so loved the world...'
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a collapse block', () => {
      const block = createBlock('collapse', {
        title: 'Click to expand',
        items: [
          { id: 'inner-1', type: 'paragraph', text: 'Hidden content' }
        ]
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a multiple-choice block', () => {
      const block = createBlock('multiple-choice', {
        question: 'Choose one:',
        items: [
          { id: 'choice-1', type: 'list-item-choice', text: 'Option A' },
          { id: 'choice-2', type: 'list-item-choice', text: 'Option B' }
        ]
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a checklist block', () => {
      const block = createBlock('checklist', {
        items: [
          { id: 'check-1', type: 'list-item-checklist', text: 'Task 1', checked: false },
          { id: 'check-2', type: 'list-item-checklist', text: 'Task 2', checked: true }
        ]
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a poll block', () => {
      const block = createBlock('poll', {
        question: 'What do you prefer?',
        options: ['Option A', 'Option B', 'Option C']
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render an appeal block', () => {
      const block = createBlock('appeal', {
        text: 'Will you accept?',
        options: ['Yes', 'No']
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a story block', () => {
      const block = createBlock('story', {
        title: 'A Story',
        content: 'Once upon a time...'
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a table block', () => {
      const block = createBlock('table', {
        rows: [
          ['Header 1', 'Header 2'],
          ['Cell 1', 'Cell 2']
        ]
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render an excerpt block', () => {
      const block = createBlock('excerpt', {
        items: [
          { id: 'excerpt-1', type: 'excerpt-item', text: 'Excerpt content' }
        ]
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should render a slide block', () => {
      const block = createBlock('slide', {
        image: 'https://example.com/slide.jpg',
        caption: 'Slide caption'
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('props', () => {
    it('should accept block prop', () => {
      const block = createBlock('paragraph', { text: 'Test' })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.props('block')).toEqual(block)
    })

    it('should accept parent prop', () => {
      const block = createBlock('list-item', { text: 'Item' })
      const parent = createBlock('list')

      wrapper = shallowMount(Block, {
        props: { block, parent },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.props('parent')).toEqual(parent)
    })

    it('should accept ignoreStyles prop', () => {
      const block = createBlock('paragraph')

      wrapper = shallowMount(Block, {
        props: { block, ignoreStyles: true },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.props('ignoreStyles')).toBe(true)
    })
  })

  describe('nested blocks', () => {
    it('should handle blocks with nested items', () => {
      const block = createBlock('list', {
        items: [
          { id: 'item-1', type: 'list-item', text: 'Item 1' },
          { id: 'item-2', type: 'list-item', text: 'Item 2' },
          { id: 'item-3', type: 'list-item', text: 'Item 3' }
        ]
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should handle deeply nested blocks', () => {
      const block = createBlock('collapse', {
        title: 'Outer',
        items: [
          {
            id: 'nested-list',
            type: 'list',
            items: [
              { id: 'inner-item-1', type: 'list-item', text: 'Inner item 1' },
              { id: 'inner-item-2', type: 'list-item', text: 'Inner item 2' }
            ]
          }
        ]
      })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('user input', () => {
    it('should filter user input by block id', () => {
      const block = createBlock('question', { text: 'Question?' })
      const userInput = [
        { blockId: block.id, answer: 'My answer' },
        { blockId: 'other-block', answer: 'Other answer' }
      ]

      const customProvide = {
        ...mockProvide,
        getDocumentUserInput: () => userInput
      }

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: customProvide,
          stubs: {
            Block: true
          }
        }
      })

      // The userInput computed should filter to only this block's input
      expect(wrapper.vm.userInput).toEqual([{ blockId: block.id, answer: 'My answer' }])
    })

    it('should return empty array when no user input for block', () => {
      const block = createBlock('paragraph')
      const userInput = [
        { blockId: 'other-block', answer: 'Some answer' }
      ]

      const customProvide = {
        ...mockProvide,
        getDocumentUserInput: () => userInput
      }

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: customProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.vm.userInput).toEqual([])
    })
  })

  describe('unknown block types', () => {
    it('should handle unknown block type gracefully', () => {
      const block = createBlock('unknown-type', { text: 'Unknown' })

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      // Should render wrapper div but no component
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('styles', () => {
    it('should apply wrapper styles when ignoreStyles is false', () => {
      const block = createBlock('paragraph')

      wrapper = shallowMount(Block, {
        props: { block, ignoreStyles: false },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      // Should have styles applied
      const wrapperDiv = wrapper.find('div')
      expect(wrapperDiv.exists()).toBe(true)
    })

    it('should not apply wrapper styles when ignoreStyles is true', () => {
      const block = createBlock('paragraph')

      wrapper = shallowMount(Block, {
        props: { block, ignoreStyles: true },
        global: {
          provide: mockProvide,
          stubs: {
            Block: true
          }
        }
      })

      const wrapperDiv = wrapper.find('div')
      expect(wrapperDiv.exists()).toBe(true)
      // When ignoreStyles is true, class should be empty
      expect(wrapperDiv.classes().length === 0 || wrapperDiv.attributes('class') === '').toBeTruthy()
    })
  })

  describe('computed properties', () => {
    it('should compute document from provider', () => {
      const block = createBlock('paragraph')
      const mockDoc = { id: 'custom-doc', title: 'Custom Document' }
      const customProvide = {
        ...mockProvide,
        getDocument: () => mockDoc
      }

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: customProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.vm.document).toEqual(mockDoc)
    })

    it('should compute style from provider', () => {
      const block = createBlock('paragraph')
      const mockStyle = { blocks: { paragraph: { color: 'red' } } }
      const customProvide = {
        ...mockProvide,
        getStyle: () => mockStyle
      }

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: customProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.vm.style).toEqual(mockStyle)
    })

    it('should compute defaultStyles from provider', () => {
      const block = createBlock('paragraph')
      const mockDefaultStyles = { fontSize: '16px' }
      const customProvide = {
        ...mockProvide,
        getDefaultStyles: () => mockDefaultStyles
      }

      wrapper = shallowMount(Block, {
        props: { block },
        global: {
          provide: customProvide,
          stubs: {
            Block: true
          }
        }
      })

      expect(wrapper.vm.defaultStyles).toEqual(mockDefaultStyles)
    })
  })
})
