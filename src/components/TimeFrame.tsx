import type { ILessonTimeFrame } from '../interfaces.ts';
import { useTimeFrames } from '../store/hooks.tsx';

export function TimeFrame({ id }: Pick<ILessonTimeFrame, 'id'>) {
  const timeFrames = useTimeFrames();
  const { start, end } = timeFrames[id];
  return <div className="time-frame">
    <span>{start}</span>
    <span> - </span>
    <span>{end}</span>
  </div>;
}