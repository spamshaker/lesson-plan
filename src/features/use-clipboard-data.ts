import { useClipboardCopyData } from './use-clipboard-copy-data.ts';
import { useClipboardPasteData } from './use-clipboard-paste-data.ts';

export function useClipboardData() {
  useClipboardCopyData();
  useClipboardPasteData();
}