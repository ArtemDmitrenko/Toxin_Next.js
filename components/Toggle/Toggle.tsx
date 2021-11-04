import { useState } from 'react';

import styles from './toggle.module.scss';

type ToggleProps = {
  title: string,
  isChecked?: boolean,
  name: string,
  onChange?: (isChecked: boolean) => void,
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
      onChange(!checked);
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

export default Toggle;
