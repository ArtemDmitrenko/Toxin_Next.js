import { useState } from 'react';

import Checkbox, { CheckboxData } from 'Components/Checkbox/Checkbox';

import styles from './checkboxDropdown.module.scss';

type CheckboxDropdownData = {
  [key: string]: {
    title: string,
    isChecked: boolean,
  },
};

type CheckboxDropdownProps = {
  checkboxes: CheckboxDropdownData,
  title: string,
  isActive?: boolean,
  onChange?: (checkboxes: CheckboxDropdownData, isActive: boolean) => void
};

const CheckboxDropdown = (props: CheckboxDropdownProps) => {
  const {
    checkboxes,
    title,
    onChange,
    isActive = false,
  } = props;

  const [active, setActive] = useState(isActive);
  const [checkboxList, setCheckboxList] = useState(checkboxes);

  const stylesTitle = () => (
    `${styles.title} ${active ? styles.titleActive : ''}`
  );

  const stylesList = () => (
    `${styles.list} ${active ? styles.listActive : ''}`
  );

  const handleListToggle = () => {
    setActive((prevState) => {
      if (onChange) {
        onChange(checkboxList, !prevState);
      }

      return !prevState;
    });
  };

  const handleCheckboxChange = (data: CheckboxData) => {
    setCheckboxList((prevState) => {
      const newState = { ...prevState };

      newState[data.name].isChecked = data.isChecked;

      if (onChange) {
        onChange(newState, active);
      }

      return newState;
    });
  };

  return (
    <div className={styles.checkboxDropdown}>
      <div
        className={stylesTitle()}
        tabIndex={0}
        role="button"
        onClick={(e) => {
          e.preventDefault();
          handleListToggle();
        }}
        onKeyDown={handleListToggle}
      >
        {title}
      </div>
      <ul className={stylesList()}>
        {
          Object.entries(checkboxList).map(([name, checkbox]) => (
            <li className={styles.item} key={name}>
              <Checkbox
                title={checkbox.title}
                isChecked={checkbox.isChecked}
                name={name}
                onChange={handleCheckboxChange}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export type { CheckboxDropdownData };
export default CheckboxDropdown;
