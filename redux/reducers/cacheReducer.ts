import {
  Action,
  ChangeFieldValue,
  ChangeNumberFieldValue,
  CHANGE_FIELD_VALUE,
  CHANGE_NUMBER_FIELD_VALUE,
  UNDO_LAST_CHANGE
} from '../actions';

export type CachedItem = {
  readonly id: number;
  readonly fieldId: string;
  readonly oldValue: string | number;
};

export type State = CachedItem[];

const initialState: State = [];

const changeValue = (
  state: State,
  action: ChangeFieldValue | ChangeNumberFieldValue
): State => {
  return [
    ...state,
    {
      id: state.length,
      fieldId: action.fieldId,
      oldValue: action.oldValue
    }
  ];
};

const cacheReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CHANGE_NUMBER_FIELD_VALUE:
    case CHANGE_FIELD_VALUE:
      return changeValue(state, action);
    case UNDO_LAST_CHANGE:
      return [...state.slice(0, -1)];
    default:
      return state;
  }
};

export default cacheReducer;
