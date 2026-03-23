/**
 * CodeMirror 6 light theme — matches 04-UI规范 §4.5 editor area colors.
 */

import { EditorView } from '@codemirror/view';

export const lightTheme = EditorView.theme({
  '&': {
    backgroundColor: '#F9FAFB',  // gray-50
    fontSize: '14px',
    fontFamily: 'var(--font-jetbrains-mono, "JetBrains Mono", monospace)',
  },
  '.cm-content': {
    caretColor: '#111827',       // gray-900
    color: '#111827',
    padding: '16px',
    minHeight: '400px',
  },
  '.cm-gutters': {
    backgroundColor: '#F9FAFB',  // gray-50
    color: '#9CA3AF',            // gray-400 — toned down per 04 §4.5
    border: 'none',
    paddingLeft: '8px',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#F3F4F6',  // gray-100
  },
  '.cm-activeLine': {
    backgroundColor: '#F3F4F610',
  },
  '.cm-selectionBackground': {
    backgroundColor: '#BFDBFE !important', // blue-200
  },
  '&.cm-focused .cm-selectionBackground': {
    backgroundColor: '#93C5FD !important', // blue-300
  },
  '.cm-cursor': {
    borderLeftColor: '#111827',
  },
  '.cm-placeholder': {
    color: '#9CA3AF',            // gray-400
    fontStyle: 'italic',
  },
});
