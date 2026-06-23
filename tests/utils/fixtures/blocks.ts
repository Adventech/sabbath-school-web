/**
 * Test fixtures for block components
 */

export interface BlockFixture {
  id: string
  type: string
  text?: string
  items?: BlockFixture[]
  [key: string]: unknown
}

// Paragraph blocks
export const paragraphBlock: BlockFixture = {
  id: 'para-1',
  type: 'paragraph',
  text: 'This is a test paragraph with some <strong>bold</strong> and <em>italic</em> text.',
  items: []
}

export const paragraphWithBibleLink: BlockFixture = {
  id: 'para-bible-1',
  type: 'paragraph',
  text: 'Read <a class="resource-link-sspm-bible" data-verse="John 3:16">John 3:16</a> for more.',
  items: []
}

// Heading blocks
export const headingBlock: BlockFixture = {
  id: 'heading-1',
  type: 'heading',
  text: 'Test Heading',
  level: 2,
  items: []
}

export const headingH1Block: BlockFixture = {
  id: 'heading-h1-1',
  type: 'heading',
  text: 'Main Title',
  level: 1,
  items: []
}

// List blocks
export const listBlock: BlockFixture = {
  id: 'list-1',
  type: 'list',
  ordered: false,
  items: [
    { id: 'list-item-1', type: 'list-item', text: 'First list item' },
    { id: 'list-item-2', type: 'list-item', text: 'Second list item' },
    { id: 'list-item-3', type: 'list-item', text: 'Third list item' }
  ]
}

export const orderedListBlock: BlockFixture = {
  id: 'ordered-list-1',
  type: 'list',
  ordered: true,
  items: [
    { id: 'ol-item-1', type: 'list-item', text: 'Step one' },
    { id: 'ol-item-2', type: 'list-item', text: 'Step two' },
    { id: 'ol-item-3', type: 'list-item', text: 'Step three' }
  ]
}

// Question block
export const questionBlock: BlockFixture = {
  id: 'question-1',
  type: 'question',
  text: 'What do you think about this topic?',
  items: []
}

// Blockquote
export const blockquoteBlock: BlockFixture = {
  id: 'blockquote-1',
  type: 'blockquote',
  text: '"This is a quote from someone important."',
  attribution: 'Famous Author',
  items: []
}

// Image block
export const imageBlock: BlockFixture = {
  id: 'image-1',
  type: 'image',
  src: 'https://example.com/image.jpg',
  alt: 'Test image description',
  caption: 'Image caption text',
  items: []
}

// Video block
export const videoBlock: BlockFixture = {
  id: 'video-1',
  type: 'video',
  src: 'https://example.com/video.mp4',
  poster: 'https://example.com/poster.jpg',
  caption: 'Video caption',
  items: []
}

// Audio block
export const audioBlock: BlockFixture = {
  id: 'audio-1',
  type: 'audio',
  src: 'https://example.com/audio.mp3',
  title: 'Audio Track Title',
  items: []
}

// Collapse block
export const collapseBlock: BlockFixture = {
  id: 'collapse-1',
  type: 'collapse',
  title: 'Click to expand',
  items: [
    { id: 'collapse-para-1', type: 'paragraph', text: 'Hidden content inside collapse', items: [] }
  ]
}

// Multiple choice block
export const multipleChoiceBlock: BlockFixture = {
  id: 'mc-1',
  type: 'multiple-choice',
  text: 'Select the correct answer:',
  options: [
    { id: 'mc-opt-1', text: 'Option A', correct: false },
    { id: 'mc-opt-2', text: 'Option B', correct: true },
    { id: 'mc-opt-3', text: 'Option C', correct: false }
  ],
  items: []
}

// Checklist block
export const checklistBlock: BlockFixture = {
  id: 'checklist-1',
  type: 'checklist',
  text: 'Complete these tasks:',
  items: [
    { id: 'check-1', type: 'checklist-item', text: 'Task one', checked: false },
    { id: 'check-2', type: 'checklist-item', text: 'Task two', checked: true },
    { id: 'check-3', type: 'checklist-item', text: 'Task three', checked: false }
  ]
}

// Appeal block
export const appealBlock: BlockFixture = {
  id: 'appeal-1',
  type: 'appeal',
  text: 'Will you commit to this decision?',
  items: []
}

// Poll block
export const pollBlock: BlockFixture = {
  id: 'poll-1',
  type: 'poll',
  question: 'What is your favorite day for study?',
  options: [
    { id: 'poll-opt-1', text: 'Saturday', votes: 150 },
    { id: 'poll-opt-2', text: 'Sunday', votes: 45 },
    { id: 'poll-opt-3', text: 'Weekday evening', votes: 80 }
  ],
  items: []
}

// Excerpt block
export const excerptBlock: BlockFixture = {
  id: 'excerpt-1',
  type: 'excerpt',
  source: 'Ellen G. White, Steps to Christ',
  text: 'This is an excerpt from a referenced work.',
  items: []
}

// Story block
export const storyBlock: BlockFixture = {
  id: 'story-1',
  type: 'story',
  title: 'Mission Story',
  text: 'This is a mission story about faith.',
  items: []
}

// Table blocks
export const tableBlock: BlockFixture = {
  id: 'table-1',
  type: 'table',
  items: [
    {
      id: 'table-row-1',
      type: 'table-row',
      items: [
        { id: 'cell-1-1', type: 'table-cell', text: 'Header 1', header: true },
        { id: 'cell-1-2', type: 'table-cell', text: 'Header 2', header: true }
      ]
    },
    {
      id: 'table-row-2',
      type: 'table-row',
      items: [
        { id: 'cell-2-1', type: 'table-cell', text: 'Row 1, Cell 1' },
        { id: 'cell-2-2', type: 'table-cell', text: 'Row 1, Cell 2' }
      ]
    }
  ]
}

// HR block
export const hrBlock: BlockFixture = {
  id: 'hr-1',
  type: 'hr',
  items: []
}

// Reference block
export const referenceBlock: BlockFixture = {
  id: 'ref-1',
  type: 'reference',
  text: 'John 3:16',
  target: 'john-3-16',
  items: []
}

// Carousel block
export const carouselBlock: BlockFixture = {
  id: 'carousel-1',
  type: 'carousel',
  items: [
    { id: 'carousel-img-1', type: 'image', src: 'https://example.com/slide1.jpg', alt: 'Slide 1' },
    { id: 'carousel-img-2', type: 'image', src: 'https://example.com/slide2.jpg', alt: 'Slide 2' },
    { id: 'carousel-img-3', type: 'image', src: 'https://example.com/slide3.jpg', alt: 'Slide 3' }
  ]
}

// Complex nested structure
export const nestedBlockStructure: BlockFixture[] = [
  headingH1Block,
  paragraphBlock,
  {
    id: 'section-1',
    type: 'collapse',
    title: 'Section 1',
    items: [
      { id: 'nested-para-1', type: 'paragraph', text: 'Nested paragraph', items: [] },
      listBlock
    ]
  },
  questionBlock,
  blockquoteBlock
]

// All block types for comprehensive testing
export const allBlockTypes: BlockFixture[] = [
  paragraphBlock,
  headingBlock,
  listBlock,
  questionBlock,
  blockquoteBlock,
  imageBlock,
  videoBlock,
  audioBlock,
  collapseBlock,
  multipleChoiceBlock,
  checklistBlock,
  appealBlock,
  pollBlock,
  excerptBlock,
  storyBlock,
  tableBlock,
  hrBlock,
  referenceBlock,
  carouselBlock
]
