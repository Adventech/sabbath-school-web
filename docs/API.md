# API Reference

This document describes the API endpoints used by the Sabbath School Web application.

## Table of Contents

- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Sabbath School API (v2)](#sabbath-school-api-v2)
- [Resources API (v3)](#resources-api-v3)
- [User Data API](#user-data-api)
- [Error Handling](#error-handling)

## API Overview

### Base URLs

| Environment | Main API (v2) | Resources API (v3) |
|-------------|---------------|-------------------|
| Production | `https://sabbath-school.adventech.io/api/v2` | Proxied via main API |
| Staging | `https://sabbath-school-stage.adventech.io/api/v2` | Proxied via main API |

### Axios Instances

The application uses four Axios instances configured in `src/main.js`:

| Instance | Authentication | Purpose |
|----------|----------------|---------|
| `$api` | None | Public content requests |
| `$apiResources` | None | Public resource requests |
| `$apiAuth` | `x-ss-auth-access-token` | Authenticated user requests |
| `$apiAuthResources` | `x-ss-auth-access-token` | Authenticated resource requests |

### Request Headers

**All Requests:**
```http
Content-Type: application/json
```

**Authenticated Requests:**
```http
x-ss-auth-access-token: <user-token>
```

## Authentication

### Token-Based Authentication

The API uses token-based authentication. Tokens are obtained through the login flow and stored in the Pinia auth store (persisted to localStorage).

### Token Refresh

When a request returns a 401 status, the application automatically attempts to refresh the token.

**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "uid": "user-unique-id",
  "displayName": "User Name",
  "email": "user@example.com",
  "stsTokenManager": {
    "accessToken": "current-access-token",
    "refreshToken": "current-refresh-token",
    "expirationTime": 1234567890
  },
  "isAnonymous": false
}
```

**Response:**
```json
{
  "uid": "user-unique-id",
  "displayName": "User Name",
  "email": "user@example.com",
  "stsTokenManager": {
    "accessToken": "new-access-token",
    "refreshToken": "new-refresh-token",
    "expirationTime": 1234567890
  }
}
```

### Authentication Flow

```
1. User logs in via external auth provider
2. Token stored in authStore (persisted)
3. Request interceptor adds token to headers
4. On 401 response:
   a. Call /auth/refresh
   b. Update stored token
   c. Retry original request
5. On refresh failure, user is logged out
```

## Sabbath School API (v2)

### Quarterlies

#### List All Quarterlies

Returns all available quarterlies for a language.

```http
GET /{lang}/quarterlies/index.json
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `lang` | string | Language code (e.g., `en`, `es`, `pt`) |

**Response:**
```json
[
  {
    "id": "en-2024-01",
    "title": "The Book of Psalms",
    "description": "A study of the Psalms",
    "human_date": "January - March 2024",
    "start_date": "2024-01-06",
    "end_date": "2024-03-30",
    "cover": "https://example.com/cover.png",
    "color_primary": "#2E3B4E",
    "color_primary_dark": "#1A2330"
  }
]
```

#### Get Quarterly Details

Returns a specific quarterly with its lessons.

```http
GET /{lang}/quarterlies/{quarter}/index.json
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `lang` | string | Language code |
| `quarter` | string | Quarterly ID (e.g., `2024-01`) |

**Response:**
```json
{
  "quarterly": {
    "id": "en-2024-01",
    "title": "The Book of Psalms",
    "description": "A study of the Psalms",
    "human_date": "January - March 2024",
    "start_date": "2024-01-06",
    "end_date": "2024-03-30",
    "cover": "https://example.com/cover.png",
    "credits": [
      { "name": "Author Name", "value": "Author Value" }
    ]
  },
  "lessons": [
    {
      "id": "en-2024-01-01",
      "title": "How to Read the Psalms",
      "start_date": "2024-01-06",
      "end_date": "2024-01-12",
      "cover": "https://example.com/lesson-cover.png"
    }
  ]
}
```

### Lessons

#### Get Lesson Details

Returns a specific lesson with its daily readings.

```http
GET /{lang}/quarterlies/{quarter}/lessons/{lesson}/index.json
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `lang` | string | Language code |
| `quarter` | string | Quarterly ID |
| `lesson` | string | Lesson number (e.g., `01`, `02`) |

**Response:**
```json
{
  "lesson": {
    "id": "en-2024-01-01",
    "title": "How to Read the Psalms",
    "start_date": "2024-01-06",
    "end_date": "2024-01-12",
    "cover": "https://example.com/lesson-cover.png",
    "memory_verse": "Psalm 1:1-2"
  },
  "days": [
    {
      "id": "en-2024-01-01-01",
      "title": "Saturday - Introduction",
      "date": "2024-01-06"
    },
    {
      "id": "en-2024-01-01-02",
      "title": "Sunday - The Structure of the Psalms",
      "date": "2024-01-07"
    }
  ],
  "pdfs": [
    {
      "id": "en-2024-01-01-pdf",
      "title": "Lesson PDF",
      "src": "https://example.com/lesson.pdf"
    }
  ]
}
```

### Daily Readings

#### Get Daily Reading Content

Returns the content for a specific day's reading.

```http
GET /{lang}/quarterlies/{quarter}/lessons/{lesson}/days/{day}/read/index.json
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `lang` | string | Language code |
| `quarter` | string | Quarterly ID |
| `lesson` | string | Lesson number |
| `day` | string | Day number (e.g., `01` for Saturday, `02` for Sunday) |

**Response:**
```json
{
  "id": "en-2024-01-01-01",
  "title": "Saturday - Introduction",
  "date": "2024-01-06",
  "content": "<p>HTML content of the reading...</p>",
  "bible": [
    { "verse": "Psalm 1:1-2", "text": "Blessed is the one..." }
  ]
}
```

### Media

#### Get Audio Resources

Returns audio resources for a quarterly.

```http
GET /{lang}/quarterlies/{quarter}/audio.json
```

**Response:**
```json
[
  {
    "id": "en-2024-01-01-audio",
    "target": "en-2024-01-01",
    "src": "https://example.com/audio.mp3",
    "title": "Lesson 1 Audio",
    "artist": "Speaker Name",
    "image": "https://example.com/image.png"
  }
]
```

#### Get Video Resources

Returns video resources for a quarterly.

```http
GET /{lang}/quarterlies/{quarter}/video.json
```

**Response:**
```json
[
  {
    "id": "en-2024-01-01-video",
    "target": "en-2024-01-01",
    "src": "https://www.youtube.com/watch?v=...",
    "title": "Lesson 1 Video",
    "artist": "Presenter Name",
    "image": "https://example.com/thumbnail.png"
  }
]
```

## Resources API (v3)

The Resources API serves content for ABSG, InVerse, and other resource types.

### Resource List

Returns available resources of a specific type.

```http
GET /{lang}/{resourceType}/{resourceName}/sections/index.json
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `lang` | string | Language code |
| `resourceType` | string | Type of resource (e.g., `absg`, `inverse`) |
| `resourceName` | string | Resource identifier |

**Response:**
```json
{
  "index": "resource-index",
  "title": "Resource Title",
  "subtitle": "Resource Subtitle",
  "covers": {
    "portrait": "https://example.com/portrait.png",
    "landscape": "https://example.com/landscape.png"
  },
  "sections": [
    {
      "id": "section-1",
      "title": "Section Title",
      "documents": [
        {
          "id": "doc-1",
          "title": "Document Title",
          "subtitle": "Document Subtitle"
        }
      ]
    }
  ],
  "fonts": [
    {
      "name": "CustomFont",
      "src": "https://example.com/font.woff2",
      "weight": "400"
    }
  ]
}
```

### Document Content

Returns content for a specific document.

```http
GET /{lang}/{resourceType}/{resourceName}/{documentName}/index.json
```

**Response:**
```json
{
  "id": "document-id",
  "index": "doc-index",
  "title": "Document Title",
  "segments": [
    {
      "id": "segment-1",
      "title": "Segment Title",
      "type": "blocks",
      "blocks": [
        {
          "id": "block-1",
          "type": "paragraph",
          "data": {
            "text": "Paragraph content..."
          }
        },
        {
          "id": "block-2",
          "type": "heading",
          "data": {
            "text": "Heading Text",
            "depth": 2
          }
        }
      ]
    }
  ],
  "style": {
    "blocks": {
      "paragraph": {
        "fontSize": "16px",
        "lineHeight": "1.6"
      }
    }
  },
  "defaultStyles": {
    "fontSize": "16px",
    "fontFamily": "serif"
  },
  "background": "https://example.com/background.png"
}
```

### Block Types

Documents contain various block types:

| Block Type | Description | Interactive |
|------------|-------------|-------------|
| `paragraph` | Text paragraph | Yes (highlighting) |
| `heading` | Section heading | No |
| `list` | Ordered or unordered list | No |
| `list-item` | List item | Yes (highlighting) |
| `blockquote` | Quote block | No |
| `image` | Image content | No |
| `video` | Video embed | No |
| `audio` | Audio player | No |
| `collapse` | Expandable content | No |
| `question` | User question input | Yes |
| `poll` | Poll question | No |
| `appeal` | Call to action with response | Yes |
| `multiple-choice` | Multiple choice question | Yes |
| `checklist` | Checklist items | Yes |
| `excerpt` | Content excerpt | No |
| `story` | Story content | No |
| `table` | Table content | No |
| `carousel` | Image carousel | No |
| `reference` | Reference link | No |
| `hr` | Horizontal rule | No |

## User Data API

Authenticated endpoints for storing user data.

### Highlights

#### Get Highlights

Returns highlights for a specific reading.

```http
GET /highlights/{readIndex}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `readIndex` | string | Reading identifier |

**Response:**
```json
{
  "readIndex": "en-2024-01-01-01",
  "highlights": [
    {
      "startIndex": 0,
      "endIndex": 50,
      "color": "#FFFF00"
    }
  ]
}
```

#### Save Highlights

Saves highlights for a reading.

```http
POST /highlights
```

**Request Body:**
```json
{
  "readIndex": "en-2024-01-01-01",
  "highlights": [
    {
      "startIndex": 0,
      "endIndex": 50,
      "color": "#FFFF00"
    }
  ]
}
```

### Comments

#### Get Comments

Returns comments for a specific reading.

```http
GET /comments/{readIndex}
```

**Response:**
```json
{
  "readIndex": "en-2024-01-01-01",
  "comments": [
    {
      "elementId": "paragraph-1",
      "comment": "User's comment text"
    }
  ]
}
```

#### Save Comments

Saves comments for a reading.

```http
POST /comments
```

**Request Body:**
```json
{
  "readIndex": "en-2024-01-01-01",
  "comments": [
    {
      "elementId": "paragraph-1",
      "comment": "User's comment text"
    }
  ]
}
```

### Resource User Input

Endpoints for saving user input on resource documents.

#### Save Question Answer

```http
POST /resources/user/input/question/{documentId}/{blockId}
```

**Request Body:**
```json
{
  "blockId": "question-block-1",
  "answer": "User's answer text"
}
```

#### Save Block Highlights

```http
POST /resources/user/input/highlights/{documentId}/{blockId}
```

**Request Body:**
```json
{
  "blockId": "paragraph-block-1",
  "highlights": [
    {
      "startIndex": 0,
      "endIndex": 25,
      "color": "#FFFF00"
    }
  ]
}
```

#### Save Completion Status

```http
POST /resources/user/input/completion/{documentId}/{blockId}
```

**Request Body:**
```json
{
  "blockId": "paragraph-block-1",
  "completion": true
}
```

#### Save Appeal Response

```http
POST /resources/user/input/appeal/{documentId}/{blockId}
```

**Request Body:**
```json
{
  "blockId": "appeal-block-1",
  "appeal": true
}
```

#### Save Multiple Choice Selection

```http
POST /resources/user/input/multiple-choice/{documentId}/{blockId}
```

**Request Body:**
```json
{
  "blockId": "mc-block-1",
  "choice": 2
}
```

#### Save Checklist State

```http
POST /resources/user/input/checklist/{documentId}/{blockId}
```

**Request Body:**
```json
{
  "blockId": "checklist-block-1",
  "checked": [true, false, true, true]
}
```

#### Get All Document User Input

Returns all user input for a document.

```http
GET /resources/user/input/document/{documentId}
```

**Response:**
```json
[
  {
    "blockId": "question-block-1",
    "type": "question",
    "value": "User's answer"
  },
  {
    "blockId": "paragraph-block-1",
    "type": "highlights",
    "value": [
      { "startIndex": 0, "endIndex": 25, "color": "#FFFF00" }
    ]
  },
  {
    "blockId": "appeal-block-1",
    "type": "appeal",
    "value": true
  }
]
```

## Error Handling

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or expired token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource does not exist |
| 500 | Internal Server Error |

### Error Response Format

```json
{
  "error": "Error code",
  "message": "Human-readable error description"
}
```

### Handling 401 Responses

When a 401 response is received:

1. The response interceptor attempts token refresh
2. If refresh succeeds, the original request is retried
3. If refresh fails, the user is logged out

### Silent Failures

User input operations (highlights, comments, answers) fail silently to avoid disrupting the user experience:

```javascript
async saveHighlight(highlights) {
  if (!authStore().isLoggedIn) return  // Guard clause
  try {
    await this.$apiAuthResources.post(`/resources/user/input/...`, { ... })
  } catch (e) {
    // Silent failure - user input is best-effort
  }
}
```

### Network Error Handling

Network errors should be handled gracefully:

```javascript
try {
  const response = await this.$api.get('/endpoint')
  return response.data
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error('Server error:', error.response.status)
  } else if (error.request) {
    // Request made but no response received
    console.error('Network error')
  } else {
    // Error in request setup
    console.error('Request error:', error.message)
  }
  throw error
}
```
