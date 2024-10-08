import { useCallback, useEffect } from 'react';
import { useLocalStorageSave } from './use-local-storage-save.ts';

export function useKeyboardSaveEffect() {
  const saveData = useLocalStorageSave();
  const handler = useCallback((e: KeyboardEvent) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveData();
    }
  }, [saveData]);

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}