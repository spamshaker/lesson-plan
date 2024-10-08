import { days, useLessonsEvents, useTimeFrames } from '../store';

export function Headers() {
  const lessons = useLessonsEvents();
  const timeFrames = useTimeFrames();
  return <>
    <div/>
    {days.map((item, index) => {
      const dayLessons = Object.keys(lessons?.[index] || {}).sort();
      const first = timeFrames[Number(dayLessons?.at!(0))];
      const last = timeFrames[Number(dayLessons?.at!(-1))];

      return <div key={item} className="table-header">
        <div>{item}</div>
        <div>{first?.start} - {last?.end}</div>
      </div>;
    })}
  </>;
}