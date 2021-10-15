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

  const [element, setChecked] = useState({ value: isChecked });

  const handleCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const { checked } = target;

    setChecked({
      value: checked,
    });
  };

  const stylesContent = () => (
    `${styles.content} ${isBoldTitle ? styles.titleBold : styles.title}`
  );

  return (
    <div className={styles.container}>
      <div>
        <input type="checkbox" id={name} checked={element.value} onChange={handleCheckboxChange} />
        <label className={stylesContent()} htmlFor={name}>{title}</label>
      </div>
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
