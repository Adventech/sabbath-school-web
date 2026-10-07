import { setupServer } from 'msw/node'
import { authHandlers } from './handlers/auth'
import { resourcesHandlers } from './handlers/resources'

// Combine all handlers
export const handlers = [
  ...authHandlers,
  ...resourcesHandlers
]

// Setup MSW server for Node.js (Vitest runs in Node)
export const server = setupServer(...handlers)
