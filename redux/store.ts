import { createStore } from 'redux';
import fieldsReducer from './reducers/fieldsReducer';

const store = createStore(fieldsReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
