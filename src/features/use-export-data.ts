import { useCallback } from 'react';
import { useLessonsEvents } from '../store';

export function useExportData() {
  const lessonsEvents = useLessonsEvents();
  return useCallback(
    (spaces = 2) =>
      JSON.stringify(Object.values(lessonsEvents)
        .map((dayLessons) => Object.values(dayLessons))
        .flat(), null, spaces)
    , [lessonsEvents]);
}