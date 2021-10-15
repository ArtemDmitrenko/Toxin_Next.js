import { useState } from 'react';

import styles from './checkbox.module.scss';

type CheckboxProps = {
  title: string,
  description?: string | null,
  isBoldTitle?: boolean,
  isChecked?: boolean,
};

const Checkbox = (props: CheckboxProps) => {
  const {
    title,
    description,
    isBoldTitle,
    isChecked,
  } = props;

  const [element, setChecked] = useState(isChecked);

  const handleCheckboxChange = () => {
    setChecked(!element);
  };

  const stylesTitle = () => (
    `${isBoldTitle ? styles.titleBold : styles.title}`
  );

  return (
    <div className={styles.checkbox}>
      <label className={styles.filter}>
        <input className={styles.content} type="checkbox" checked={element} onChange={handleCheckboxChange} />
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
