import { SyntheticEvent } from 'hoist-non-react-statics/node_modules/@types/react';
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

  const [element, setChecked] = useState({ checkbox: name, value: isChecked });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const { checked, id } = target;

    setChecked({
      checkbox: id,
      value: checked,
    });
  };

  const stylesTitle = () => (
    `${isBoldTitle ? styles.titleBold : styles.title}`
  );

  return (
    <div className={styles.checkbox}>
      <label className={styles.filter} htmlFor={name}>
        <input className={styles.content} type="checkbox" id={name} checked={element.value} onChange={handleChange} />
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
