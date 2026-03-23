/**
 * CodeMirror 6 extensions configuration.
 * Source: 05-技术方案 §2.1 (CodeMirror 6, Markdown mode)
 */

import { keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightActiveLine,
  placeholder as cmPlaceholder,
  EditorView,
} from '@codemirror/view';
import { searchKeymap } from '@codemirror/search';
import { lightTheme } from './cm6-theme';

export function createExtensions(options: { placeholder?: string } = {}) {
  return [
    lightTheme,
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightActiveLine(),
    history(),
    EditorView.lineWrapping,
    markdown({ base: markdownLanguage }),
    keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
    ...(options.placeholder ? [cmPlaceholder(options.placeholder)] : []),
  ];
}
