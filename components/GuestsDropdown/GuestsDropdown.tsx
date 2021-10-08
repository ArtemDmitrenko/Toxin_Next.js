import { useState } from 'react';

import num2str from 'Root/utils';

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
    wordforms: [string, string, string],
    items: {
      [key: string]: {
        title: string,
        value: number,
      },
    },
  },
};

type GuestsDropdownState = {
  isActive: boolean,
  output: string,
  groups: Groups,
};

const MAX_GROUP_VALUE = 10;

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
        defaultState.groups[item.group].items[`item${count}`] = {
          title: item.title,
          value: 0,
        };
      } else {
        count = 0;

        defaultState.groups[item.group] = {
          wordforms: item.wordforms,
          items: {
            [`item${count}`]: {
              title: item.title,
              value: 0,
            },
          },
        };
      }

      prevGroup = item.group;
      count += 1;
    });
  };

  groupsGenerate();

  const [dropdown, setDropdown] = useState(defaultState);

  const groupSum = (groupName: string) => {
    const { items } = dropdown.groups[groupName];
    let sum = 0;

    Object.values(items).forEach((item) => {
      sum += item.value;
    });

    return sum;
  };

  const outputGenerate = () => {
    const outputStr: Array<string> = [];

    Object.keys(dropdown.groups).forEach((groupName) => {
      const groupValue = groupSum(groupName);

      if (groupValue > 0) {
        outputStr.push(`${groupValue} ${num2str(groupValue, dropdown.groups[groupName].wordforms)}`);
      }
    });

    return outputStr.join(', ');
  };

  const stylesClearButton = () => (
    `${styles.button} ${styles.buttonClear}`
  );

  const stylesApplyButton = () => (
    `${styles.button} ${styles.buttonApply}`
  );

  const stylesOutput = () => (
    `${styles.output} ${dropdown.isActive ? styles.outputActive : ''}`
  );

  const stylesInput = () => (
    `${styles.input} ${dropdown.isActive ? styles.inputActive : ''}`
  );

  const stylesMenuWrapper = () => (
    `${styles.menuWrapper} ${dropdown.isActive ? styles.menuWrapperActive : ''}`
  );

  const stylesMinus = (item: { value: number, title: string }) => (
    `${styles.minus} ${Number(item.value) <= 0 ? styles.minusDisabled : ''}`
  );

  const stylesPlus = (groupName: string) => (
    `${styles.plus} ${groupSum(groupName) >= MAX_GROUP_VALUE ? styles.plusDisabled : ''}`
  );

  const handleOutputFocus = () => {
    setDropdown((prevState) => ({ ...prevState, isActive: true }));
  };

  const handleOutputBlur = () => {
    setDropdown((prevState) => ({ ...prevState, isActive: false }));
  };

  const handleMinusClick = (groupName: string, itemName: string) => {
    if (dropdown.groups[groupName].items[itemName].value <= 0) return;

    setDropdown((prevState) => ({
      ...prevState,
      groups: {
        ...prevState.groups,
        [groupName]: {
          ...prevState.groups[groupName],
          items: {
            ...prevState.groups[groupName].items,
            [itemName]: {
              ...prevState.groups[groupName].items[itemName],
              value: prevState.groups[groupName].items[itemName].value - 1,
            },
          },
        },
      },
    }));
  };

  const handlePlusClick = (groupName: string, itemName: string) => {
    if (groupSum(groupName) >= MAX_GROUP_VALUE) return;

    setDropdown((prevState) => ({
      ...prevState,
      groups: {
        ...prevState.groups,
        [groupName]: {
          ...prevState.groups[groupName],
          items: {
            ...prevState.groups[groupName].items,
            [itemName]: {
              ...prevState.groups[groupName].items[itemName],
              value: prevState.groups[groupName].items[itemName].value + 1,
            },
          },
        },
      },
    }));
  };

  const handleClearClick = () => {
    setDropdown((prevState) => {
      const newState = { ...prevState };

      Object.values(newState.groups).forEach((group) => {
        Object.values(group.items).forEach((item) => {
          Object.defineProperty(item, 'value', { value: 0 });
        });
      });

      return newState;
    });
  };

  return (
    <div className={styles.guestsDropdown} onFocus={handleOutputFocus} onBlur={handleOutputBlur}>
      <div className={stylesOutput()}>
        <input
          type="text"
          className={stylesInput()}
          placeholder="Сколько гостей"
          readOnly
          value={outputGenerate()}
        />
      </div>
      <div className={stylesMenuWrapper()}>
        <div tabIndex={0} role="menu" className={styles.menu}>
          <ul className={styles.list}>
            {Object.entries(dropdown.groups).map(([groupName, group]) => (
              Object.entries(group.items).map(([itemName, item]) => (
                <li key={item.title} className={styles.item}>
                  <div>{item.title}</div>
                  <div className={styles.control}>
                    <button
                      type="button"
                      className={stylesMinus(item)}
                      onClick={handleMinusClick.bind(null, groupName, itemName)}
                    >
                      -
                    </button>
                    <div className={styles.counter}>
                      {item.value}
                    </div>
                    <button
                      type="button"
                      className={stylesPlus(groupName)}
                      onClick={handlePlusClick.bind(null, groupName, itemName)}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))
            ))}
          </ul>
          <div className={`${styles.buttons} ${styles.buttonsNonEmpty}`}>
            <button type="button" className={stylesClearButton()} onClick={handleClearClick}>Очистить</button>
            <button type="button" className={stylesApplyButton()} onClick={handleOutputBlur}>Применить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export type { GuestsDropdownConfig };
export default GuestsDropdown;
