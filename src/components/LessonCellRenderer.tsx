import type { ICalendarEvent } from '../interfaces.ts';
import { useCellData, useSelectedItem, useSetEditingItem, useSetSelectedItem } from '../store';
import { type KeyboardEvent, type MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { LessonEditorForm } from './LessonEditorForm.tsx';

export function LessonCellRenderer({ timeFrameId, day }: ICalendarEvent) {
  const subject = useCellData(timeFrameId, day, 'subject');
  const classRoom = useCellData(timeFrameId, day, 'classRoom');

  const cellRef = useRef<HTMLDivElement>(null);

  const selectedItem = useSelectedItem();
  const setSelectedItem = useSetSelectedItem();

  const setEditingItem = useSetEditingItem();

  const selectCurrentItem = useCallback(() => {
    setSelectedItem({ day, timeFrameId });
  }, [setSelectedItem, day, timeFrameId]);

  const isSelected = useMemo(
    () => selectedItem?.day === day && selectedItem?.timeFrameId === timeFrameId,
    [selectedItem?.day, day, selectedItem?.timeFrameId, timeFrameId]
  );

  useEffect(() => {
    if (isSelected && cellRef.current) {
      cellRef.current.focus();
    }
  }, [isSelected]);

  const onCellDoubleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.currentTarget === e.target) {
        setEditingItem({ timeFrameId, day });
      }
    },
    [setEditingItem, timeFrameId, day]
  );

  const className = isSelected ? 'cell selected' : 'cell';

  const onCellKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.target === event.currentTarget && event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      setEditingItem({ timeFrameId, day });
    }
  }, [setEditingItem, timeFrameId, day]);

  return <div
    onFocus={selectCurrentItem}
    ref={cellRef}
    tabIndex={0}
    onKeyDown={onCellKeyDown}
    className={className}
    onDoubleClick={onCellDoubleClick}>
    <span>{subject}</span>
    <span>{classRoom}</span>
    {<LessonEditorForm
      subject={subject}
      classRoom={classRoom}
      timeFrameId={timeFrameId} day={day}
    />}
  </div>;
}