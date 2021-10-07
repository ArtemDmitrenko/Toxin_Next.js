import { useState } from 'react';

import styles from './guestsDropdown.module.scss';

type GuestsDropdownConfig = Array<{
  title: string,
  group: string,
  wordforms: [string, string, string],
}>;

type GuestsDropdownProps = {
  list: GuestsDropdownConfig,
};

type Groups = {
  [key: string]: {
    [key: string]: {
      title: string,
      value: number,
    }
  }
};

type GuestsDropdownState = {
  isActive: boolean,
  output: string,
  groups: Groups,
};

const GuestsDropdown = (props: GuestsDropdownProps) => {
  const { list } = props;
  const defaultState: GuestsDropdownState = {
    isActive: false,
    output: '',
    groups: {},
  };

  const groupsGenerate = () => {
    let prevGroup: string;
    let count = 0;

    list.forEach((item) => {
      if (prevGroup === item.group) {
        defaultState.groups[item.group][`item${count}`] = {
          title: item.title,
          value: 0,
        };
      } else {
        count = 0;
        defaultState.groups[item.group] = {
          [`item${count}`]: {
            title: item.title,
            value: 0,
          },
        };
      }

      prevGroup = item.group;
      count += 1;
    });
  };

  groupsGenerate();

  const [dropdown, setDropdown] = useState(defaultState);

  const handleOutputFocus = () => {
    setDropdown((prevState) => ({ ...prevState, isActive: true }));
  };

  const handleOutputBlur = () => {
    setDropdown((prevState) => ({ ...prevState, isActive: false }));
  };

  const handleMinusClick = (groupName: string, itemName: string) => {
    setDropdown((prevState) => {
      if (prevState.groups[groupName][itemName].value < 1) return prevState;

      return {
        ...prevState,
        groups: {
          ...prevState.groups,
          [groupName]: {
            ...prevState.groups[groupName],
            [itemName]: {
              ...prevState.groups[groupName][itemName],
              value: prevState.groups[groupName][itemName].value - 1,
            },
          },
        },
      };
    });
  };

  const handlePlusClick = (groupName: string, itemName: string) => {
    setDropdown((prevState) => ({
      ...prevState,
      groups: {
        ...prevState.groups,
        [groupName]: {
          ...prevState.groups[groupName],
          [itemName]: {
            ...prevState.groups[groupName][itemName],
            value: prevState.groups[groupName][itemName].value + 1,
          },
        },
      },
    }));
  };

  const handleClearClick = () => {
    setDropdown((prevState) => {
      const newState = { ...prevState };

      Object.values(newState.groups).forEach((group) => {
        Object.values(group).forEach((item) => {
          Object.defineProperty(item, 'value', { value: 0 });
        });
      });

      return newState;
    });
  };

  return (
    <div className={styles.guestsDropdown} onFocus={handleOutputFocus} onBlur={handleOutputBlur}>
      <div className={`${styles.output} ${dropdown.isActive ? styles.outputActive : ''}`}>
        <input type="text" className={`${styles.input} ${dropdown.isActive ? styles.inputActive : ''}`} placeholder="Сколько гостей" readOnly value={dropdown.output} />
      </div>
      <div className={`${styles.menuWrapper} ${dropdown.isActive ? styles.menuWrapperActive : ''}`}>
        <div tabIndex={0} role="menu" className={styles.menu}>
          <ul className={styles.list}>
            {Object.entries(dropdown.groups).map(([groupName, group]) => (
              Object.entries(group).map(([itemName, item]) => (
                <li key={item.title} className={styles.item}>
                  <div>{item.title}</div>
                  <div className={styles.control}>
                    <button type="button" className={`${styles.minus} ${Number(item.value) < 1 ? styles.minusDisabled : ''}`} onClick={handleMinusClick.bind(null, groupName, itemName)}> - </button>
                    <div className={styles.counter}>
                      {item.value}
                    </div>
                    <button type="button" className={styles.plus} onClick={handlePlusClick.bind(null, groupName, itemName)}> + </button>
                  </div>
                </li>
              ))
            ))}
          </ul>
          <div className={`${styles.buttons} ${styles.buttonsNonEmpty}`}>
            <button type="button" className={`${styles.button} ${styles.buttonClear}`} onClick={handleClearClick}>Очистить</button>
            <button type="button" className={`${styles.button} ${styles.buttonApply}`} onClick={handleOutputBlur}>Применить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export type { GuestsDropdownConfig };
export default GuestsDropdown;
