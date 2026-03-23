/**
 * Request validation middleware for convert endpoints.
 * Source: 05-技术方案 §5.6 (API 响应规范)
 */

import type { Request, Response, NextFunction } from 'express';
import { CONTENT_LIMITS } from './constants.js';

/**
 * Validate that request body contains a non-empty markdown string
 * within the size limit (500KB).
 */
export function validateConvertRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { markdown } = req.body;

  // Check markdown field exists and is a string
  if (!markdown || typeof markdown !== 'string') {
    res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Markdown content is required.',
    });
    return;
  }

  // Check content is not empty after trimming
  if (markdown.trim().length === 0) {
    res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Markdown content cannot be empty.',
    });
    return;
  }

  // Check content size (500KB limit)
  const sizeBytes = Buffer.byteLength(markdown, 'utf-8');
  if (sizeBytes > CONTENT_LIMITS.MAX_REQUEST_BODY) {
    res.status(413).json({
      error: 'PAYLOAD_TOO_LARGE',
      message: 'Content exceeds 500KB limit.',
    });
    return;
  }

  next();
}
