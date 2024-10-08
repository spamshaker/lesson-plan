export type DayType = 'PN' | 'WT' | 'ŚR' | 'CZW' | 'PT';

export interface ILessonTimeFrame {
  id: number;
  start: string;
  end: string;
}

export interface ICalendarEvent {
  timeFrameId: number;
  day: number;
}

export interface ILessonEvent extends ICalendarEvent {
  subject: string;
  classRoom: string;
}

export interface IAppContextType {
  selectedItem?: ICalendarEvent;
  editingItem?: ICalendarEvent;
  timeFrames: Record<number, ILessonTimeFrame>
  lessons: LessonsState;
}


interface IDeleteAction {
  type: 'deleteLesson',
  payload: ICalendarEvent;
}

interface IChangeAction {
  type: 'change',
  payload: Partial<IAppContextType>
}

interface IChangeLesson {
  type: 'changeLesson',
  payload: ILessonEvent
}

interface IInitAction {
  type: 'init',
  payload: ILessonEvent[]
}

export type Action = IChangeAction | IInitAction | IChangeLesson | IDeleteAction;
export type LessonsState = Record<number, Record<number, ILessonEvent>>