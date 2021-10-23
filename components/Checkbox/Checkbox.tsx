import { useState } from 'react';

import styles from './checkbox.module.scss';

type CheckboxData = {
  name: string,
  isChecked: boolean,
};

type CheckboxProps = {
  title: string,
  description?: string,
  isBoldTitle?: boolean,
  isChecked?: boolean,
  name: string,
  onChange?: (data: CheckboxData) => void,
};

const Checkbox = (props: CheckboxProps) => {
  const {
    title,
    description,
    isBoldTitle = false,
    isChecked = false,
    name,
    onChange,
  } = props;

  const [checked, setChecked] = useState(isChecked);

  const handleCheckboxChange = () => {
    setChecked(!checked);

    if (onChange) {
      onChange({ name, isChecked: !checked });
    }
  };

  const stylesTitle = () => (
    `${isBoldTitle ? styles.titleBold : styles.title}`
  );

  return (
    <div className={styles.checkbox}>
      <label className={styles.filter}>
        <input className={styles.content} name={name} type="checkbox" checked={checked} onChange={handleCheckboxChange} />
        <span className={styles.indicator} />
        <span className={stylesTitle()}>{title}</span>
      </label>
      <div className={styles.description}>{description}</div>
    </div>

  );
};

export type { CheckboxProps, CheckboxData };
export default Checkbox;
