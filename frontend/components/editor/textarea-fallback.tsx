'use client';

/**
 * Textarea fallback for environments where CodeMirror doesn't load.
 * Source: 03-1-交互补充 §3 P0-问题1
 */

const PLACEHOLDER = 'Paste your Markdown or AI text here — supports text from ChatGPT, Claude, Notion, or any .md file';

interface TextareaFallbackProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextareaFallback({ value, onChange }: TextareaFallbackProps) {
  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <span className="text-sm font-medium text-gray-700">Markdown Input</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={PLACEHOLDER}
        className="w-full min-h-[400px] p-4 bg-gray-50 text-gray-900 text-sm font-mono resize-none outline-none"
      />
    </div>
  );
}
