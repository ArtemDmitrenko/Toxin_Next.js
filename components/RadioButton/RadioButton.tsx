import { useState } from 'react';

import styles from './radioButton.module.scss';

type RadioButtonProps = {
  name: string,
  value: string,
  content: string,
  onChange?: (value: string) => void,
};

const RadioButton = (props: RadioButtonProps) => {
  const {
    name,
    value,
    content,
    onChange,
  } = props;
  const [checked, setChecked] = useState(false);

  const handleRadioChange = () => {
    setChecked(!checked);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <label className={styles.radioButton}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        value={value}
        onChange={handleRadioChange}
      />
      <div className={styles.content}>{content}</div>
    </label>
  );
};

export default RadioButton;
