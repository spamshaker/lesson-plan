import type { DayType, IAppContextType, ILessonEvent, LessonsState } from '../interfaces.ts';

export const days: DayType[] = ['PN', 'WT', 'ŚR', 'CZW', 'PT'];

export function createLessons(events: ILessonEvent[]) {
  return events.reduce((result, next) => {
    result[next.day] ??= {};
    result[next.day][next.timeFrameId] = next;
    return result;
  }, {} as LessonsState);
}

export const getInitialState = (initialData?: ILessonEvent[]): IAppContextType => ({
  selectedItem: undefined,
  timeFrames: {
    1: { id: 1, start: '7.30', end: '8.15' },
    2: { id: 2, start: '8.20', end: '9.05' },
    3: { id: 3, start: '9.15', end: '10.00' },
    4: { id: 4, start: '10.05', end: '10.50' },
    5: { id: 5, start: '11.00', end: '11.45' },
    6: { id: 6, start: '12.05', end: '12.50' },
    7: { id: 7, start: '13.10', end: '13.55' },
    8: { id: 8, start: '14.00', end: '14.45' },
    9: { id: 9, start: '14.50', end: '15.35' },
    10: { id: 10, start: '15.40', end: '16.25' }
  },
  lessons: createLessons(initialData || [])
});