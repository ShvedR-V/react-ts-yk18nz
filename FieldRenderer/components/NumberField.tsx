import * as React from 'react';
import FieldHeader from '../FieldHeader';
import { changeNumberFieldValue } from '../../redux/actions';
import { useAppDispatch } from '../../redux/hooks';
import NumericInput = require('react-numeric-input');

type Props = {
  fieldId: string;
  fieldName: string;
  value: number;
};

const NumberField = (props: Props) => {
  const dispatch = useAppDispatch();

  const changeField = React.useCallback(
    valueAsNumber => {
      dispatch(changeNumberFieldValue(props.fieldId, valueAsNumber));
    },
    [props.fieldId]
  );
  return (
    <div style={styles.container}>
      <FieldHeader name={props.fieldName} />
      <div>
        <NumericInput
          style={styles.input}
          value={props.value}
          onChange={changeField}
        />
      </div>
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

export default NumberField;
