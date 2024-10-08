import { useEffect } from 'react';
import { days, useSelectedItem, useSetEditingItem, useSetSelectedItem } from '../store';

export function useKeyboardNavigationEffect() {
  const selectedItem = useSelectedItem();
  const setSelectedItem = useSetSelectedItem();
  const setEditingItem = useSetEditingItem();
  useEffect(() => {
    function move(dayDelta: number = 0, timeFrameIdDelta: number = 1) {
      let day = selectedItem?.day || 0;
      let timeFrameId = selectedItem?.timeFrameId || 1;

      if (selectedItem) {
        day += dayDelta;
        timeFrameId += timeFrameIdDelta;
      }

      if (day >= days.length || day < 0) {
        return;
      }
      if (timeFrameId > 10 || timeFrameId <= 0) {
        return;
      }
      setSelectedItem({ day, timeFrameId });
      setEditingItem();
    }

    const moves = {
      ArrowRight() {
        return move(1, 0);
      },
      ArrowLeft() {
        return move(-1, 0);
      },
      ArrowUp() {
        return move(0, -1);
      },
      ArrowDown() {
        return move(0, 1);
      }
    } as const;
    type Moves = keyof typeof moves;

    const keys = Object.keys(moves) as unknown as Moves[];

    const navHandler = (e: KeyboardEvent) => {
      if (!(e.target instanceof HTMLInputElement) && keys.includes(e.key as any)) {
        e.preventDefault();
        const method = moves[e.key as Moves];
        method();
      }
    };
    window.addEventListener('keydown', navHandler);
    return () => window.removeEventListener('keydown', navHandler);
  }, [selectedItem, setEditingItem, setSelectedItem]);
}