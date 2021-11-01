/* eslint-disable react/jsx-props-no-spreading */
import { FieldRenderProps } from 'react-final-form';

import styles from './radioButton.module.scss';

function RadioButton<T extends string>({
  input, meta, ...rest
}: FieldRenderProps<T, any>) {
  const {
    content,
  } = rest;

  return (
    <label className={styles.radioButton}>
      <input
        className={styles.input}
        type="radio"
        {...input}
        {...rest}
      />
      <div className={styles.content}>{content}</div>
    </label>
  );
}

export default RadioButton;
