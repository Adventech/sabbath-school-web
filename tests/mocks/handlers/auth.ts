import { http, HttpResponse } from 'msw'

const API_HOST = 'https://api.example.com'

export const authHandlers = [
  // Login endpoint
  http.post(`${API_HOST}/v2/auth`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>

    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        token: 'mock-jwt-token-12345',
        user: {
          id: 'user-1',
          email: 'test@example.com',
          displayName: 'Test User',
          photo: 'https://example.com/photo.jpg'
        }
      })
    }

    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  // Token refresh endpoint
  http.post(`${API_HOST}/v2/auth/refresh`, async ({ request }) => {
    const authHeader = request.headers.get('x-ss-auth-access-token')

    if (authHeader && authHeader.includes('mock-jwt-token')) {
      return HttpResponse.json({
        token: 'mock-jwt-token-refreshed-12345'
      })
    }

    return HttpResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }),

  // Logout endpoint
  http.post(`${API_HOST}/v2/auth/logout`, () => {
    return HttpResponse.json({ success: true })
  }),

  // Google Sign-In
  http.post(`${API_HOST}/v2/auth/google`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>

    if (body.credential) {
      return HttpResponse.json({
        token: 'mock-google-jwt-token-12345',
        user: {
          id: 'google-user-1',
          email: 'googleuser@gmail.com',
          displayName: 'Google User',
          photo: 'https://lh3.googleusercontent.com/photo.jpg'
        }
      })
    }

    return HttpResponse.json(
      { error: 'Invalid Google credential' },
      { status: 401 }
    )
  }),

  // Apple Sign-In
  http.post(`${API_HOST}/v2/auth/apple`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>

    if (body.identityToken) {
      return HttpResponse.json({
        token: 'mock-apple-jwt-token-12345',
        user: {
          id: 'apple-user-1',
          email: 'appleuser@icloud.com',
          displayName: 'Apple User',
          photo: null
        }
      })
    }

    return HttpResponse.json(
      { error: 'Invalid Apple credential' },
      { status: 401 }
    )
  }),
]
