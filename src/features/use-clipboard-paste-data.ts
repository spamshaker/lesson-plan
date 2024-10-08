import { useImportData } from './use-import-data.ts';
import { useCallback, useEffect } from 'react';

export function useClipboardPasteData() {
  const importData = useImportData();
  const handler = useCallback((e: ClipboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
      return;
    }
    const text = e.clipboardData?.getData('text');
    if (text) {
      importData(text);
      e.preventDefault();
    }
  }, [importData]);
  useEffect(() => {
    window.addEventListener('paste', handler);
    return () => window.removeEventListener('paste', handler);
  }, [handler]);
}