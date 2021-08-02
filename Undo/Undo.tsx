import * as React from 'react';
import { undoLastChange } from '../redux/actions';
import { useAppDispatch } from '../redux/hooks';
import { useSelectCache } from '../redux/selectors';
import { AppDispatch } from '../redux/store';

const Undo = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const cache = useSelectCache();

  const undoAction = () => {
    dispatch(undoLastChange());
  };

  return (
    <div style={styles.buttonContainer}>
      <button
        disabled={cache.length === 0}
        onClick={undoAction}
        style={cache.length === 0 ? styles.buttonDisabled : styles.button}
      >
        Undo
      </button>
    </div>
  );
};

const commonButtonStyles = {
  marginTop: '20px',
  padding: '8px 20px',
  borderRadius: '10px',
  border: 'none',
  outline: 'none',
  color: 'white'
};

const styles = {
  buttonContainer: {
    height: '20vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    ...commonButtonStyles,
    backgroundColor: '#3683ff',
    cursor: 'pointer'
  },
  buttonDisabled: {
    ...commonButtonStyles,
    backgroundColor: 'grey'
  }
};

export default Undo;
