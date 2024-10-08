import type { ILessonTimeFrame } from '../interfaces.ts';
import { TimeFrame } from './TimeFrame.tsx';

export function LessonTimeFrameWithId({ id }: Pick<ILessonTimeFrame, 'id'>) {
  return <>
    <div className="first-column">{id}</div>
    <TimeFrame id={id}/>
  </>;
}