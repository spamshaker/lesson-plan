import { useTimeFramesIds } from '../store';
import { Row } from './Row.tsx';

export function Rows() {
  const timeFramesIds = useTimeFramesIds();
  return timeFramesIds.map((id) => <Row key={id} id={Number(id)}/>);
}