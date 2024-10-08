import { useLocalStorageRead } from './use-local-storage-read.ts';
import { useEffect } from 'react';

export function useReadDataEffect(){
  const readData = useLocalStorageRead();
  useEffect(() => {
    readData();
  }, [readData]);
}