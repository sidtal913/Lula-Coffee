import { NextResponse } from 'next/server';

export function jsonError(
  status: number,
  error: string,
  message: string,
  details?: Record<string, unknown>,
) {
  return NextResponse.json({ error, message, ...(details ? { details } : {}) }, { status });
}

export function unauthorized(message = 'Bearer token required or invalid') {
  return jsonError(401, 'unauthorized', message);
}

export function forbidden(message = 'Insufficient role for this resource') {
  return jsonError(403, 'forbidden', message);
}

export function notFound(message = 'Resource not found') {
  return jsonError(404, 'not_found', message);
}

export function badRequest(message: string, details?: Record<string, unknown>) {
  return jsonError(400, 'bad_request', message, details);
}
