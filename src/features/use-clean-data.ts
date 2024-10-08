import { useSetLessonEvents } from '../store';
import { useCallback } from 'react';

export const useCleanData = () => {
  const setLessonEvents = useSetLessonEvents();
  return useCallback(() => {
    setLessonEvents([]);
  }, [setLessonEvents]);
};