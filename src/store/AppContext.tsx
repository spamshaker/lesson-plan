import { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import type { Action, IAppContextType, ILessonEvent } from '../interfaces.ts';
import { getInitialState } from './index.ts';

const AppDispatchContext = createContext<(action: Action) => void>(() => void 0);
const AppContext = createContext<IAppContextType>(getInitialState());

export const useAppContext = () => useContext(AppContext);
export const useDispatch = () => useContext(AppDispatchContext);

export function AppContextProvider({ children, reducer, getInitialState, initializerArg }: PropsWithChildren<{
  reducer: (state: IAppContextType, action: Action) => IAppContextType,
  getInitialState: (events?: ILessonEvent[]) => IAppContextType,
  initializerArg?: ILessonEvent[]
}>) {
  const [state, dispatch] = useReducer(reducer, initializerArg, getInitialState);
  return <AppContext.Provider value={state}>
    <AppDispatchContext.Provider value={dispatch}>
      {children}
    </AppDispatchContext.Provider>
  </AppContext.Provider>;
}