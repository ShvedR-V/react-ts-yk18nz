import * as React from 'react';
import FieldHeader from '../FieldHeader';
import { changeFieldValue } from '../../redux/actions';
import { useAppDispatch } from '../../redux/hooks';

type Props = {
  fieldId: string;
  fieldName: string;
  value: string;
};

const TextField = (props: Props) => {
  const dispatch = useAppDispatch();

  const changeField = React.useCallback(
    event => {
      dispatch(changeFieldValue(props.fieldId, event.target.value));
    },
    [props.fieldId]
  );

  return (
    <div style={styles.container}>
      <FieldHeader name={props.fieldName} />
      <input style={styles.input} onChange={changeField} value={props.value} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: '100%',
    border: '1px solid lightgray',
    minHeight: 24,
    borderRadius: 4,
    marginRight: 16,
    paddingLeft: 6
  }
};

export default TextField;
