/**
 * File encoding detection and conversion.
 * Source: 05-技术方案 §5.5 (场景 5: .md 文件上传), §11 风险 10
 *
 * Strategy: Try UTF-8 first; if replacement chars (U+FFFD) appear,
 * use jschardet to guess encoding, then iconv-lite to decode.
 */

import jschardet from 'jschardet';

/**
 * Decode a file buffer to UTF-8 string, auto-detecting encoding.
 */
export async function decodeFileBuffer(buffer: ArrayBuffer): Promise<string> {
  const uint8 = new Uint8Array(buffer);

  // Try UTF-8 first
  const utf8Text = new TextDecoder('utf-8').decode(uint8);

  // Check for replacement characters (sign of wrong encoding)
  const replacementCount = (utf8Text.match(/\uFFFD/g) || []).length;

  if (replacementCount === 0) {
    // Strip BOM if present
    return utf8Text.replace(/^\uFEFF/, '');
  }

  // UTF-8 failed — detect actual encoding
  const detected = jschardet.detect(Buffer.from(buffer));

  if (detected.encoding && detected.confidence > 0.5) {
    try {
      // Dynamic import iconv-lite (browser version)
      const iconv = await import('iconv-lite');
      const decoded = iconv.decode(Buffer.from(buffer), detected.encoding);
      return decoded;
    } catch {
      // iconv-lite fallback failed, return UTF-8 result
    }
  }

  return utf8Text;
}
