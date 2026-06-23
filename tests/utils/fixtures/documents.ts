/**
 * Test fixtures for document data
 */

import { allBlockTypes, paragraphBlock, headingBlock, listBlock } from './blocks'

export interface DocumentFixture {
  id: string
  title: string
  type: string
  blocks: unknown[]
  style?: Record<string, unknown>
  defaultStyles?: Record<string, unknown>
  [key: string]: unknown
}

// Simple document with basic blocks
export const simpleDocument: DocumentFixture = {
  id: 'doc-simple-1',
  title: 'Simple Test Document',
  type: 'lesson',
  blocks: [
    headingBlock,
    paragraphBlock,
    listBlock
  ],
  style: {
    blocks: {}
  },
  defaultStyles: {
    fontFamily: 'sans-serif',
    fontSize: '16px'
  }
}

// Full document with all block types
export const fullDocument: DocumentFixture = {
  id: 'doc-full-1',
  title: 'Full Test Document',
  type: 'lesson',
  blocks: allBlockTypes,
  style: {
    blocks: {
      paragraph: {
        textColor: '#333333',
        backgroundColor: '#ffffff'
      },
      heading: {
        textColor: '#111111'
      }
    }
  },
  defaultStyles: {
    fontFamily: 'serif',
    fontSize: '18px',
    lineHeight: '1.6'
  }
}

// Document with RTL content (Arabic)
export const rtlDocument: DocumentFixture = {
  id: 'doc-rtl-1',
  title: 'وثيقة اختبار',
  type: 'lesson',
  lang: 'ar',
  direction: 'rtl',
  blocks: [
    {
      id: 'rtl-heading-1',
      type: 'heading',
      text: 'عنوان الاختبار',
      level: 1,
      items: []
    },
    {
      id: 'rtl-para-1',
      type: 'paragraph',
      text: 'هذه فقرة اختبار باللغة العربية.',
      items: []
    }
  ],
  style: {},
  defaultStyles: {}
}

// Document for user input testing
export const userInputDocument: DocumentFixture = {
  id: 'doc-userinput-1',
  title: 'User Input Test Document',
  type: 'lesson',
  blocks: [
    {
      id: 'highlight-para-1',
      type: 'paragraph',
      text: 'This paragraph can be highlighted by the user.',
      items: []
    },
    {
      id: 'question-1',
      type: 'question',
      text: 'Write your thoughts here:',
      items: []
    },
    {
      id: 'checklist-1',
      type: 'checklist',
      text: 'Complete these items:',
      items: [
        { id: 'check-1', type: 'checklist-item', text: 'Task A', checked: false },
        { id: 'check-2', type: 'checklist-item', text: 'Task B', checked: false }
      ]
    },
    {
      id: 'mc-1',
      type: 'multiple-choice',
      text: 'Select the best answer:',
      options: [
        { id: 'opt-1', text: 'Answer A', correct: false },
        { id: 'opt-2', text: 'Answer B', correct: true },
        { id: 'opt-3', text: 'Answer C', correct: false }
      ],
      items: []
    },
    {
      id: 'appeal-1',
      type: 'appeal',
      text: 'Will you make this commitment?',
      items: []
    }
  ],
  style: {},
  defaultStyles: {}
}

// Mock user input data
export const mockUserInput = {
  highlights: [
    {
      id: 'hl-1',
      blockId: 'highlight-para-1',
      color: 'yellow',
      startOffset: 5,
      endOffset: 14
    }
  ],
  answers: {
    'question-1': 'This is my answer to the question.'
  },
  checklist: {
    'check-1': true,
    'check-2': false
  },
  multipleChoice: {
    'mc-1': 'opt-2'
  },
  appeals: {
    'appeal-1': true
  }
}

// Quarterly fixture
export const quarterlyFixture = {
  id: '2024-01',
  title: 'Test Quarterly Q1 2024',
  description: 'A quarterly for testing purposes',
  human_date: 'January - March 2024',
  start_date: '2024-01-01',
  end_date: '2024-03-31',
  cover: 'https://example.com/cover.png',
  color_primary: '#4A7B4A',
  color_primary_dark: '#3A5B3A',
  lang: 'en',
  lessons: [
    {
      id: '01',
      title: 'Lesson 1: Introduction',
      start_date: '2024-01-06',
      end_date: '2024-01-12'
    },
    {
      id: '02',
      title: 'Lesson 2: Going Deeper',
      start_date: '2024-01-13',
      end_date: '2024-01-19'
    }
  ]
}

// Lesson fixture
export const lessonFixture = {
  id: '01',
  title: 'Lesson 1: Introduction',
  quarterly_id: '2024-01',
  start_date: '2024-01-06',
  end_date: '2024-01-12',
  cover: 'https://example.com/lesson-cover.png',
  days: [
    { id: '01', title: 'Saturday', date: '2024-01-06' },
    { id: '02', title: 'Sunday', date: '2024-01-07' },
    { id: '03', title: 'Monday', date: '2024-01-08' },
    { id: '04', title: 'Tuesday', date: '2024-01-09' },
    { id: '05', title: 'Wednesday', date: '2024-01-10' },
    { id: '06', title: 'Thursday', date: '2024-01-11' },
    { id: '07', title: 'Friday', date: '2024-01-12' }
  ]
}

// Resource fixture
export const resourceFixture = {
  id: 'test-resource',
  type: 'ss',
  name: 'Test Resource',
  title: 'Test Resource Title',
  description: 'A resource for testing',
  segments: ['segment-1', 'segment-2', 'segment-3'],
  features: {
    pdf: true,
    video: true,
    audio: true
  },
  cover: 'https://example.com/resource-cover.png'
}

// Languages fixture for RTL testing
export const languagesFixture = [
  { code: 'en', name: 'English', native: 'English', rtl: false },
  { code: 'es', name: 'Spanish', native: 'Español', rtl: false },
  { code: 'fr', name: 'French', native: 'Français', rtl: false },
  { code: 'de', name: 'German', native: 'Deutsch', rtl: false },
  { code: 'ar', name: 'Arabic', native: 'العربية', rtl: true },
  { code: 'he', name: 'Hebrew', native: 'עברית', rtl: true },
  { code: 'fa', name: 'Persian', native: 'فارسی', rtl: true },
  { code: 'zh', name: 'Chinese', native: '中文', rtl: false },
  { code: 'ja', name: 'Japanese', native: '日本語', rtl: false },
  { code: 'ko', name: 'Korean', native: '한국어', rtl: false }
]
