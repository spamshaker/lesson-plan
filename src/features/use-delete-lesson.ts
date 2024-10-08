import { useCallback } from 'react';
import { useDispatch, useSelectedItem, useSetEditingItem } from '../store';

export function useDeleteLesson() {
  const selectedItem = useSelectedItem();
  const dispatch = useDispatch();

  const setEditingItem = useSetEditingItem();

  return useCallback(() => {
      if (selectedItem) {
        dispatch({ type: 'deleteLesson', payload: selectedItem });
      }
      setEditingItem();
    }, [selectedItem, dispatch, setEditingItem]
  );
}