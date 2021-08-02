export const UNDO_LAST_CHANGE = 'UNDO_LAST_CHANGE';
export const CHANGE_FIELD_VALUE = 'CHANGE_FIELD_VALUE';
export const CHANGE_NUMBER_FIELD_VALUE = 'CHANGE_NUMBER_FIELD_VALUE';

export type UndoLastChange = {
  type: typeof UNDO_LAST_CHANGE;
  fieldId?: string;
  value?: number | string;
};

export type ChangeFieldValue = {
  type: typeof CHANGE_FIELD_VALUE;
  fieldId: string;
  value: string;
  oldValue?: string | number;
};

export type ChangeNumberFieldValue = {
  type: typeof CHANGE_NUMBER_FIELD_VALUE;
  fieldId: string;
  value: number;
  oldValue?: string | number;
};

export const undoLastChange = (
  fieldId?: string,
  value?: string | number
): UndoLastChange => ({
  type: UNDO_LAST_CHANGE,
  fieldId,
  value
});

export const changeFieldValue = (
  fieldId: string,
  value: string,
  oldValue?: string | number
): ChangeFieldValue => ({
  type: CHANGE_FIELD_VALUE,
  fieldId,
  value,
  oldValue
});

export const changeNumberFieldValue = (
  fieldId: string,
  value: number,
  oldValue?: string | number
): ChangeNumberFieldValue => ({
  type: CHANGE_NUMBER_FIELD_VALUE,
  fieldId,
  value,
  oldValue
});

export type Action = ChangeFieldValue | ChangeNumberFieldValue | UndoLastChange;
