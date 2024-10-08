import { Headers } from './Headers.tsx';
import { Rows } from './Rows.tsx';
import { useKeyboardNavigationEffect } from '../features/use-keyboard-navigation-effect.ts';
import { useClipboardData } from '../features/use-clipboard-data.ts';
import { useKeyboardDeleteLesson } from '../features/use-keyboard-delete-lesson.ts';

export function LessonPlan() {
  useKeyboardNavigationEffect();
  useKeyboardDeleteLesson();
  useClipboardData();
  return <div className="lesson-plan">
    <Headers/>
    <Rows/>
  </div>;
}