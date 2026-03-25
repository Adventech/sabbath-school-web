import { http, HttpResponse } from 'msw'

const API_RESOURCES_HOST = 'https://resources.example.com'

// Mock data
const mockQuarterlies = [
  {
    id: '2024-01',
    title: 'Test Quarterly Q1 2024',
    description: 'A test quarterly for unit tests',
    human_date: 'January - March 2024',
    start_date: '2024-01-01',
    end_date: '2024-03-31',
    cover: 'https://example.com/cover-2024-01.png',
    color_primary: '#4A7B4A',
    color_primary_dark: '#3A5B3A'
  },
  {
    id: '2024-02',
    title: 'Test Quarterly Q2 2024',
    description: 'Second test quarterly',
    human_date: 'April - June 2024',
    start_date: '2024-04-01',
    end_date: '2024-06-30',
    cover: 'https://example.com/cover-2024-02.png',
    color_primary: '#7B4A4A',
    color_primary_dark: '#5B3A3A'
  }
]

const mockLessons = [
  {
    id: '01',
    title: 'Lesson 1: Test Lesson',
    start_date: '2024-01-06',
    end_date: '2024-01-12',
    cover: 'https://example.com/lesson-01.png'
  },
  {
    id: '02',
    title: 'Lesson 2: Another Lesson',
    start_date: '2024-01-13',
    end_date: '2024-01-19',
    cover: 'https://example.com/lesson-02.png'
  }
]

const mockDocument = {
  id: 'doc-1',
  title: 'Test Document',
  type: 'lesson',
  blocks: [
    {
      id: 'block-1',
      type: 'paragraph',
      text: 'This is a test paragraph with some content.',
      items: []
    },
    {
      id: 'block-2',
      type: 'heading',
      text: 'Test Heading',
      level: 2,
      items: []
    },
    {
      id: 'block-3',
      type: 'list',
      items: [
        { id: 'list-item-1', type: 'list-item', text: 'First item' },
        { id: 'list-item-2', type: 'list-item', text: 'Second item' }
      ]
    }
  ],
  style: {
    blocks: {}
  },
  defaultStyles: {}
}

export const resourcesHandlers = [
  // Get quarterlies list
  http.get(`${API_RESOURCES_HOST}/v3/:lang/quarterlies`, ({ params }) => {
    const { lang } = params
    return HttpResponse.json(
      mockQuarterlies.map(q => ({ ...q, lang }))
    )
  }),

  // Get single quarterly
  http.get(`${API_RESOURCES_HOST}/v3/:lang/quarterlies/:id`, ({ params }) => {
    const { lang, id } = params
    const quarterly = mockQuarterlies.find(q => q.id === id)

    if (!quarterly) {
      return HttpResponse.json(
        { error: 'Quarterly not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({
      ...quarterly,
      lang,
      lessons: mockLessons
    })
  }),

  // Get lessons for a quarterly
  http.get(`${API_RESOURCES_HOST}/v3/:lang/quarterlies/:quarterlyId/lessons`, () => {
    return HttpResponse.json(mockLessons)
  }),

  // Get single lesson
  http.get(`${API_RESOURCES_HOST}/v3/:lang/quarterlies/:quarterlyId/lessons/:lessonId`, ({ params }) => {
    const { lessonId } = params
    const lesson = mockLessons.find(l => l.id === lessonId)

    if (!lesson) {
      return HttpResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json(lesson)
  }),

  // Get document
  http.get(`${API_RESOURCES_HOST}/v3/resources/:resourceType/:name/document`, () => {
    return HttpResponse.json(mockDocument)
  }),

  // Get document with segment
  http.get(`${API_RESOURCES_HOST}/v3/resources/:resourceType/:name/document/:segment`, ({ params }) => {
    const { segment } = params
    return HttpResponse.json({
      ...mockDocument,
      segment
    })
  }),

  // Get resource metadata
  http.get(`${API_RESOURCES_HOST}/v3/resources/:resourceType/:name`, ({ params }) => {
    const { resourceType, name } = params
    return HttpResponse.json({
      id: name,
      type: resourceType,
      title: `Resource: ${name}`,
      segments: ['segment-1', 'segment-2'],
      features: {
        pdf: true,
        video: false,
        audio: true
      }
    })
  }),

  // User highlights
  http.get(`${API_RESOURCES_HOST}/v3/resources/user/input/highlights/:docId`, () => {
    return HttpResponse.json({
      highlights: [
        {
          id: 'highlight-1',
          blockId: 'block-1',
          color: 'yellow',
          startOffset: 0,
          endOffset: 10
        }
      ]
    })
  }),

  // Save user highlight
  http.post(`${API_RESOURCES_HOST}/v3/resources/user/input/highlights/:docId/:blockId`, async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      id: 'new-highlight-1',
      ...body as object
    })
  }),

  // User question answers
  http.get(`${API_RESOURCES_HOST}/v3/resources/user/input/question/:docId`, () => {
    return HttpResponse.json({
      answers: {}
    })
  }),

  // Save user answer
  http.post(`${API_RESOURCES_HOST}/v3/resources/user/input/question/:docId/:blockId`, async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      success: true,
      ...body as object
    })
  }),

  // Languages list
  http.get(`${API_RESOURCES_HOST}/v3/languages`, () => {
    return HttpResponse.json([
      { code: 'en', name: 'English', native: 'English' },
      { code: 'es', name: 'Spanish', native: 'Español' },
      { code: 'fr', name: 'French', native: 'Français' },
      { code: 'de', name: 'German', native: 'Deutsch' },
      { code: 'ar', name: 'Arabic', native: 'العربية', rtl: true },
      { code: 'he', name: 'Hebrew', native: 'עברית', rtl: true },
      { code: 'fa', name: 'Persian', native: 'فارسی', rtl: true }
    ])
  })
]
