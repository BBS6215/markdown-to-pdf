/** Browser-native decoding; legacy detection is loaded only after UTF-8 fails. */
export class FileReadError extends Error {
  constructor(public readonly code: 'unsupported' | 'encoding' | 'read') {
    super(code);
    this.name = 'FileReadError';
  }
}

export async function decodeFileBuffer(buffer: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(buffer);
  try {
    if (bytes[0] === 0xff && bytes[1] === 0xfe) return new TextDecoder('utf-16le', { fatal: true }).decode(bytes);
    if (bytes[0] === 0xfe && bytes[1] === 0xff) return new TextDecoder('utf-16be', { fatal: true }).decode(bytes);
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    if ((bytes[0] === 0xff && bytes[1] === 0xfe) || (bytes[0] === 0xfe && bytes[1] === 0xff)) throw new FileReadError('encoding');
  }
  const { default: detector } = await import('jschardet');
  // The detector accepts a binary string; chunks avoid argument/stack limits.
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 4096) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 4096));
  }
  const detected = detector.detect(binary);
  if (!detected.encoding || detected.confidence <= 0.5) throw new FileReadError('encoding');
  try {
    return new TextDecoder(detected.encoding, { fatal: true }).decode(bytes);
  } catch {
    throw new FileReadError('encoding');
  }
}

export async function readMarkdownFile(file: Pick<File, 'name' | 'arrayBuffer'>): Promise<string> {
  if (!/\.(md|markdown|txt)$/i.test(file.name)) throw new FileReadError('unsupported');
  try {
    return await decodeFileBuffer(await file.arrayBuffer());
  } catch (error) {
    if (error instanceof FileReadError) throw error;
    throw new FileReadError('read');
  }
}
