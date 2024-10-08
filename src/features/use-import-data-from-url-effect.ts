import { useEffect } from 'react';
import { useImportData } from './use-import-data.ts';

export function useImportDataFromUrlEffect() {
  const importData = useImportData();
  useEffect(() => {
    const file = new URLSearchParams(location.hash.replace('#', '')).get('file');
    if (file) {
      console.log('loading data from', file);
      fetch(file)
        .then(res => res.text())
        .then(importData)
        .catch(console.error);
    }
  }, [importData]);
}