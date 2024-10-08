import { useCallback } from 'react';
import { useImportData } from './use-import-data.ts';

export function useLocalStorageRead() {
  const importData = useImportData();
  return useCallback(
    () => importData(localStorage.getItem('lessons') || ''),
    [importData]
  );
}