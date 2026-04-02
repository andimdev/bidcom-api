import { randomUUID } from 'crypto'

export function traceMiddleware(req, res, next) {
  req.headers['x-trace-id'] = req.headers['x-trace-id'] || randomUUID()
  next()
}