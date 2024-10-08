import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  PropsWithRef,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import type { ICalendarEvent, ILessonEvent } from '../interfaces.ts';
import { days, useDispatch, useIsEditing, useSelectedItem, useSetEditingItem } from '../store';
import { TimeFrame } from './TimeFrame.tsx';
import SaveIcon from '../icons/SaveIcon.tsx';
import TrashIcon from '../icons/TrashIcon.tsx';
import CalendarCheckIcon from '../icons/CalendarCheckIcon.tsx';
import RoomIcon from '../icons/RoomIcon.tsx';
import LessonIcon from '../icons/LessonIcon.tsx';
import { useDeleteLesson } from '../features/use-delete-lesson.ts';

export function LessonEditorForm({
  subject = '',
  classRoom = '',
  day,
  timeFrameId
}: PropsWithRef<Partial<ILessonEvent> & ICalendarEvent>) {
  const [editSubject, setEditSubject] = useState(subject);
  const [editClassRoom, setEditClassRoom] = useState(classRoom);
  const currentItem = useMemo(() => ({ day, timeFrameId }), [day, timeFrameId]);

  const selectedItem = useSelectedItem();
  const dispatch = useDispatch();

  const isEditing = useIsEditing(currentItem);
  const setEditingItem = useSetEditingItem();
  const deleteLesson = useDeleteLesson();

  useEffect(() => {
    setEditSubject(subject);
  }, [subject]);

  useEffect(() => {
    setEditClassRoom(classRoom);
  }, [classRoom]);

  const onFormSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'changeLesson',
      payload: {
        timeFrameId,
        day,
        subject: editSubject,
        classRoom: editClassRoom
      }
    });
    setEditingItem();
  }, [dispatch, timeFrameId, day, editSubject, editClassRoom, setEditingItem]);

  const onFormReset = useCallback((e: FormEvent) => {
    e.preventDefault();
    setEditClassRoom(classRoom);
    setEditSubject(subject);
    setEditingItem();
  }, [classRoom, subject, setEditingItem]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget || {};
      if (name === 'subject') {
        setEditSubject(value);
      } else if (name === 'classRoom') {
        setEditClassRoom(value);
      }
    },
    []
  );

  const onDeleteClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteLesson();
  }, [deleteLesson]);

  const onFormKeyDown = useCallback((event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') {
      event.currentTarget.reset();
    }
  }, []);

  return isEditing && <form
    className="editor no-print"
    onSubmit={onFormSubmit}
    onReset={onFormReset}
    onKeyDown={onFormKeyDown}>
    <header>
      <div>
        <CalendarCheckIcon/>
        <span>{days[day]}</span>
        <span><TimeFrame id={timeFrameId}/></span>
      </div>
      <button
        tabIndex={104}
        type="reset">x
      </button>
    </header>
    <label htmlFor="subject"><LessonIcon/> Przedmiot:</label>
    <input
      id="subject"
      tabIndex={100}
      autoFocus
      required
      name="subject"
      onChange={onInputChange}
      value={editSubject}
    />
    <label htmlFor="classRoom"><RoomIcon/> Sala:</label>
    <input
      id="classRoom"
      tabIndex={101}
      name="classRoom"
      onChange={onInputChange}
      value={editClassRoom}
    />
    <footer className="buttons">
      <button
        tabIndex={105}
        type="button"
        onClick={onDeleteClick} disabled={!selectedItem}>
        <TrashIcon/> Usuń
      </button>
      <button tabIndex={103} type="submit" className="primary"><SaveIcon/> Ok</button>
    </footer>
  </form>;
}