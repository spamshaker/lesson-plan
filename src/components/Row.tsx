import type { ILessonTimeFrame } from '../interfaces.ts';
import { PropsWithChildren } from 'react';
import { days } from '../store';
import { LessonTimeFrameWithId } from './LessonTimeFrameWithId.tsx';
import { LessonCellRenderer } from './LessonCellRenderer.tsx';

export function Row({ id }: PropsWithChildren<Pick<ILessonTimeFrame, 'id'>>) {
  return <>
    <LessonTimeFrameWithId id={id}/>
    {days.map((key, day) => (<LessonCellRenderer key={key} timeFrameId={id} day={day}/>))}
  </>;
}