import { useState } from 'react';
import styles from './checkbox.module.scss';

type CheckboxProps = {
  title: string,
  description?: string | null,
  isBoldTitle?: boolean,
  name: string,
  isChecked?: boolean,
};

const Checkbox = (props: CheckboxProps) => {
  const {
    title,
    description,
    isBoldTitle,
    name,
    isChecked,
  } = props;

  const [checked, setChecked] = useState({ checkbox: name, value: isChecked });

  const handleChange = (event: any) => {
    const element = event.target;
    const value = element.checked;
    const { id } = element;

    setChecked({
      checkbox: id,
      value,
    });
  };

  const stylesTitle = () => (
    `${isBoldTitle ? styles.titleBold : styles.title}`
  );

  return (
    <div className={styles.checkbox}>
      <label className={styles.filter} htmlFor={name}>
        <input className={styles.content} type="checkbox" id={name} checked={checked.value} onChange={handleChange} />
        <span className={styles.indicator} />
        <span className={stylesTitle()}>{title}</span>
      </label>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

Checkbox.defaultProps = {
  description: null,
  isBoldTitle: false,
  isChecked: false,
};

export default Checkbox;
