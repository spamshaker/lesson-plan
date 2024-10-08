import type { Action, IAppContextType } from '../interfaces.ts';
import { produce } from 'immer';
import { createLessons } from './initial-state.ts';

export function appReducer(state: IAppContextType, action: Action): IAppContextType {
  return produce(state, (draft) => {
    if (action.type === 'deleteLesson') {
      delete draft.lessons[action.payload.day][action.payload.timeFrameId];
    } else if (action.type === 'changeLesson') {
      draft.lessons[action.payload.day] ??= {};
      draft.lessons[action.payload.day][action.payload.timeFrameId] = action.payload;
    } else if (action.type === 'change') {
      Object.assign(draft, action.payload);
    } else if (action.type === 'init') {
      draft.lessons = createLessons(action.payload);
    }
  });
}