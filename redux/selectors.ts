import { RootState } from './store';
import { useAppSelector } from './hooks';
import { Field } from './reducers/fieldsReducer';
import { CachedItem } from './reducers/cacheReducer';

/* istanbul ignore next */
export const useSelectFields = (): Field[] => {
  return useAppSelector((state: RootState) => state.fields);
};

export const useSelectCache = (): CachedItem[] => {
  return useAppSelector((state: RootState) => state.cache);
};

export const selectLastCachedItem = (
  cache: CachedItem[]
): CachedItem | undefined => cache[cache.length - 1];

export const selectOldField = (
  fields: Field[],
  fieldId: string
): Field | undefined => {
  return fields.filter(field => field.id === fieldId)[0];
};
