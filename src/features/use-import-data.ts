import { useCallback } from 'react';
import { ILessonEvent } from '../interfaces.ts';
import { useSetLessonEvents } from '../store';

export function useImportData() {
  const setLessonEvents = useSetLessonEvents();
  return useCallback((text: string) => {
    try {
      const data = JSON.parse(text) as ILessonEvent[];
      if (Array.isArray(data) &&
        data.every(({ day, timeFrameId }, index) => {
          const ok = day !== undefined && timeFrameId !== undefined;
          if (!ok) {
            throw new Error('There is a problem with processing item ' + index);
          }
          return ok;
        })) {
        setLessonEvents(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setLessonEvents]);
}