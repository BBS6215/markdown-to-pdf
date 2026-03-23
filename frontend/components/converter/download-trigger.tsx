'use client';

/**
 * Download trigger — create Blob URL and trigger <a download>.
 * Source: 05-技术方案 §5.1 步骤 12
 */

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
