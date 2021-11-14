import { ChangeEventHandler } from 'react';

import styles from './toggle.module.scss';

type ToggleProps = {
  title: string,
  name: string,
  isChecked?: boolean,
  onChange?: ChangeEventHandler,
};

const Toggle = (props: ToggleProps) => {
  const {
    title,
    name,
    onChange,
    isChecked = false,
  } = props;

  return (
    <label className={styles.toggle}>
      <input className={styles.content} name={name} type="checkbox" defaultChecked={isChecked} onChange={onChange} />
      <span className={styles.indicator} />
      <span className={styles.title}>{title}</span>
    </label>
  );
};

export default Toggle;
