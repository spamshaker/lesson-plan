import { useDeleteLesson } from './use-delete-lesson.ts';
import { useCallback, useEffect } from 'react';

export const useKeyboardDeleteLesson = () => {
  const deleteLesson = useDeleteLesson();
  const handler = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Delete') {
      deleteLesson();
    }
  }, [deleteLesson]);
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
};