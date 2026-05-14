import { ImageResponse } from 'next/og';

// Next.js Icon File convention: this generates the favicon at build time
// from a React tree. No binary asset checked into the repo.
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2563EB',
          color: 'white',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '-0.05em',
          borderRadius: 6,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        MD
      </div>
    ),
    size
  );
}
