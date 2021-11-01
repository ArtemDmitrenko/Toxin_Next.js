import { useState } from 'react';

import styles from './toggle.module.scss';

type ToggleData = {
  isChecked: boolean,
};

type ToggleProps = {
  title: string,
  isChecked?: boolean,
  name: string,
  onChange?: (data: ToggleData) => void,
};

const Toggle = (props: ToggleProps) => {
  const {
    title,
    isChecked = false,
    name,
    onChange,
  } = props;

  const [checked, setChecked] = useState(isChecked);

  const handleToggleChange = () => {
    setChecked(!checked);

    if (onChange) {
      onChange({ isChecked: !checked });
    }
  };

  return (
    <label className={styles.toggle}>
      <input className={styles.content} name={name} type="checkbox" checked={checked} onChange={handleToggleChange} />
      <span className={styles.indicator} />
      <span className={styles.title}>{title}</span>
    </label>
  );
};

export type { ToggleData };
export default Toggle;
