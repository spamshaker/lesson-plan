import { useExportData } from './use-export-data.ts';
import { useCallback } from 'react';

export function useLocalStorageSave() {
  const exportData = useExportData();
  return useCallback(
    () => localStorage.setItem('lessons', exportData()),
    [exportData]
  );
}