import { useLessonsEvents } from '../store';
import { useExportData } from './use-export-data.ts';
import { useCallback, useEffect } from 'react';

export function useClipboardCopyData() {
  const lessonsEvents = useLessonsEvents();
  const exportData = useExportData();
  const handler = useCallback((e: ClipboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
      return;
    }
    e.preventDefault();
    if (lessonsEvents) {
      e.clipboardData?.setData('text', exportData());
    }
  }, [exportData, lessonsEvents]);
  useEffect(() => {
    window.addEventListener('copy', handler);
    return () => window.removeEventListener('copy', handler);
  }, [lessonsEvents, exportData, handler]);
}