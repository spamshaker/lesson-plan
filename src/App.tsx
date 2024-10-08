import './App.css';
import { AppContextProvider, appReducer, getInitialState } from './store';
import { LessonPlan } from './components';
import { Toolbar } from './toolbar/Toolbar.tsx';

function App() {
  return <AppContextProvider
    reducer={appReducer}
    getInitialState={getInitialState}
  >
    <h1>Plan lekcji</h1>
    <LessonPlan/>
    <Toolbar/>
  </AppContextProvider>;
}

export default App;
