import './Toolbar.css';
import { useLocalStorageSave } from '../features/use-local-storage-save.ts';
import { useCleanData } from '../features/use-clean-data.ts';
import { useKeyboardSaveEffect } from '../features/use-keyboard-save-effect.ts';
import { useReadDataEffect } from '../features/use-read-data-effect.ts';
import SaveIcon from '../icons/SaveIcon.tsx';
import TrashIcon from '../icons/TrashIcon.tsx';
import { useImportDataFromUrlEffect } from '../features/use-import-data-from-url-effect.ts';

export function Toolbar() {
  const onSave = useLocalStorageSave();
  const cleanData = useCleanData();

  useKeyboardSaveEffect();
  useReadDataEffect();
  useImportDataFromUrlEffect();

  return <nav className='no-print'>
    <button
      className="primary"
      tabIndex={0}
      onClick={onSave}>
      <SaveIcon/> Zapisz
    </button>
    <button
      tabIndex={0}
      onClick={cleanData}>
      <TrashIcon/> Wyczyść
    </button>
  </nav>;
}