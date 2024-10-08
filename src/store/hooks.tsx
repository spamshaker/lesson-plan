import { useCallback, useMemo } from 'react';
import type { ICalendarEvent, ILessonEvent } from '../interfaces.ts';
import { useAppContext, useDispatch } from './AppContext.tsx';

export function useTimeFrames() {
  return useAppContext().timeFrames;
}

export function useTimeFramesIds() {
  const timeFrames = useTimeFrames();
  return useMemo(() => Object.keys(timeFrames), [timeFrames]);
}

export function useSelectedItem() {
  return useAppContext().selectedItem;
}

export function useEditingItem() {
  return useAppContext().editingItem;
}

export function useIsEditing(item: ICalendarEvent) {
  const editingItem = useEditingItem();
  return editingItem && editingItem?.day === item.day && editingItem.timeFrameId === item.timeFrameId;
}

export function useLessonsEvents() {
  return useAppContext().lessons;
}

export function useSetSelectedItem() {
  const dispatch = useDispatch();
  return useCallback(
    (selectedItem?: ICalendarEvent) => dispatch({ type: 'change', payload: { selectedItem } }),
    [dispatch]
  );
}

export function useSetEditingItem() {
  const dispatch = useDispatch();
  return useCallback(
    (editingItem?: ICalendarEvent) => dispatch({ type: 'change', payload: { editingItem } }),
    [dispatch]
  );
}

export function useSetLessonEvents() {
  const dispatch = useDispatch();
  return useCallback(
    (payload: ILessonEvent[]) => dispatch({ type: 'init', payload }),
    [dispatch]
  );
}

export function useCellData(id: number, day: number, field: keyof ILessonEvent) {
  const lessons = useLessonsEvents();
  if (lessons) {
    return lessons[day]?.[id]?.[field] as string;
  }
}