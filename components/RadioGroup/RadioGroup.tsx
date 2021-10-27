import { useState } from 'react';

import styles from './radioGroup.module.scss';

type RadioButton = {
  value: string,
  content: string,
};

type RadioGroupData = {
  [key: string]: string,
};

type RadioGroupProps = {
  name: string,
  list: Array<RadioButton>,
  className?: string,
  radioClassName?: string,
  defaultCheckedValue?: string,
  onChange?: (data: RadioGroupData) => void,
};

const RadioGroup = (props: RadioGroupProps) => {
  const {
    name,
    list,
    className,
    radioClassName,
    onChange,
    defaultCheckedValue = list[0].value,
  } = props;

  const [value, setValue] = useState(defaultCheckedValue);

  const stylesRadioButton = () => (
    `${styles.radioButton} ${radioClassName ?? ''}`
  );

  const handleGroupToggle = (newValue: string) => {
    if (newValue === value) return;

    setValue(newValue);

    if (onChange) onChange({ [name]: newValue });
  };

  return (
    <div className={className}>
      {
        list.map((item) => (
          <label
            className={stylesRadioButton()}
            role="radio"
            tabIndex={0}
            aria-checked={value === item.value}
            key={item.value}
            onClick={(e) => {
              e.preventDefault();
              handleGroupToggle(item.value);
            }}
            onKeyDown={(e) => {
              const isCorrectButton = (e.code === 'Space' || e.code === 'Enter');

              if (isCorrectButton) handleGroupToggle(item.value);
            }}
          >
            <input
              className={styles.input}
              type="radio"
              name={name}
              tabIndex={-1}
              checked={value === item.value}
              readOnly
            />
            <div className={styles.content}>{item.content}</div>
          </label>
        ))
      }
    </div>
  );
};

export default RadioGroup;
