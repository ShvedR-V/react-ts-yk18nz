import {
  Action,
  UndoLastChange,
  ChangeFieldValue,
  ChangeNumberFieldValue,
  CHANGE_FIELD_VALUE,
  CHANGE_NUMBER_FIELD_VALUE,
  UNDO_LAST_CHANGE
} from '../actions';
import { selectLastCachedItem, selectOldField } from '../selectors';
import cache, { CachedItem } from './cacheReducer';

export type Field =
  | {
      readonly type: 'text';
      readonly id: string;
      readonly name: string;
      readonly value: string;
    }
  | {
      readonly type: 'number';
      readonly id: string;
      readonly name: string;
      readonly value: number;
    };

export type State = {
  fields: Field[];
  cache: CachedItem[];
};

export const initialState: State = {
  fields: [
    {
      type: 'text',
      id: `title`,
      name: `Title`,
      value: 'some title'
    },
    {
      type: 'text',
      id: `description`,
      name: `Description`,
      value: 'some description'
    },
    {
      type: 'text',
      id: `notes`,
      name: `Notes`,
      value: 'some notes'
    },
    {
      type: 'number',
      id: `budget`,
      name: `Budget`,
      value: 40
    }
  ],
  cache: []
};

const getNewField = (field: Field, changeAction: Action): Field => {
  if (field.type === 'number' && typeof changeAction.value === 'number') {
    return {
      ...field,
      value: changeAction.value
    };
  }
  if (field.type === 'text' && typeof changeAction.value === 'string') {
    return {
      ...field,
      value: changeAction.value
    };
  }
};

const undoLastChange = (state: State, action: UndoLastChange): State => {
  const { fieldId, oldValue } = selectLastCachedItem(state.cache);
  return {
    ...state,
    fields: [
      ...state.fields.map(
        (field): Field => {
          if (field.id === fieldId) {
            return getNewField(field, { ...action, fieldId, value: oldValue });
          }
          return field;
        }
      )
    ],
    cache: cache(state.cache, action)
  };
};

const changeField = (state: State, action: ChangeFieldValue): State => {
  const { value } = selectOldField(state.fields, action.fieldId);
  return {
    ...state,
    cache: cache(state.cache, { ...action, oldValue: value }),
    fields: [
      ...state.fields.map(
        (field): Field => {
          if (field.id === action.fieldId) {
            return getNewField(field, action);
          } else {
            return field;
          }
        }
      )
    ]
  };
};

const changeNumberField = (
  state: State,
  action: ChangeNumberFieldValue
): State => {
  const { value, id } = selectOldField(state.fields, action.fieldId);
  return {
    ...state,
    fields: [
      ...state.fields.map(
        (field): Field => {
          if (field.id === action.fieldId) {
            return getNewField(field, action);
          } else {
            return field;
          }
        }
      )
    ],
    cache: cache(state.cache, { ...action, oldValue: value, fieldId: id })
  };
};

/* istanbul ignore next */
const fieldsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CHANGE_FIELD_VALUE:
      return changeField(state, action);
    case CHANGE_NUMBER_FIELD_VALUE:
      return changeNumberField(state, action);
    case UNDO_LAST_CHANGE:
      return undoLastChange(state, action);
    default:
      return state;
  }
};

export default fieldsReducer;
