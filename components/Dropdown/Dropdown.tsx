import { useState, useEffect } from 'react';

import convertNumToWordform from 'Root/utils/convertNumToWordform';

import styles from './dropdown.module.scss';

type DropdownConfig = Array<{
  title: string,
  group: string,
  defaultValue?: number,
  wordforms: [string, string, string],
}>;

type DropdownProps = {
  list: DropdownConfig,
  isButtons?: boolean,
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

type DropdownState = {
  isActive: boolean,
  output: string,
  groups: Groups,
};

const MAX_GROUP_VALUE = 10;

const Dropdown = (props: DropdownProps) => {
  const { list, isButtons } = props;

  const generateState = (): DropdownState => {
    const generatedState: DropdownState = {
      isActive: false,
      output: '',
      groups: {},
    };

    let prevGroup: string;
    let count = 0;

    list.forEach((item) => {
      const { defaultValue = 0 } = item;

      if (prevGroup === item.group) {
        generatedState.groups[item.group].items[`item${count}`] = {
          title: item.title,
          value: defaultValue,
        };
      } else {
        count = 0;

        generatedState.groups[item.group] = {
          wordforms: item.wordforms,
          items: {
            [`item${count}`]: {
              title: item.title,
              value: defaultValue,
            },
          },
        };
      }

      prevGroup = item.group;
      count += 1;
    });

    return generatedState;
  };

  const [dropdown, setDropdown] = useState(generateState);

  const groupSum = (groupName: string) => {
    const { items } = dropdown.groups[groupName];

    return Object.values(items).reduce((prev, current) => (prev + current.value), 0);
  };

  const outputGenerate = () => {
    const outputStr: Array<string> = [];

    Object.keys(dropdown.groups).forEach((groupName) => {
      const groupValue = groupSum(groupName);

      if (groupValue > 0) {
        outputStr.push(`${groupValue} ${convertNumToWordform(
          groupValue,
          dropdown.groups[groupName].wordforms,
        )}`);
      }
    });

    setDropdown((prevState) => ({ ...prevState, output: outputStr.join(', ') }));
  };

  useEffect(outputGenerate, [dropdown.groups]);

  const stylesClearButton = () => (
    `${styles.button} ${styles.buttonClear} ${dropdown.output ? '' : styles.buttonClearHidden}`
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

      newState.output = '';

      return newState;
    });
  };

  return (
    <div
      className={styles.dropdown}
      onFocus={(e) => {
        e.preventDefault();
        handleOutputFocus();
      }}
      onBlur={(e) => {
        e.preventDefault();
        handleOutputBlur();
      }}
    >
      <div className={stylesOutput()} tabIndex={0} role="menu">
        <input
          type="text"
          className={stylesInput()}
          placeholder="Сколько гостей"
          readOnly
          value={dropdown.output}
          tabIndex={-1}
        />
      </div>
      <div className={stylesMenuWrapper()}>
        <div tabIndex={0} role="menuitem" className={styles.menu}>
          <ul className={styles.list}>
            {Object.entries(dropdown.groups).map(([groupName, group]) => (
              Object.entries(group.items).map(([itemName, item]) => (
                <li key={item.title} className={styles.item}>
                  <div>{item.title}</div>
                  <div className={styles.control}>
                    <button
                      type="button"
                      className={stylesMinus(item)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMinusClick(groupName, itemName);
                      }}
                    >
                      -
                    </button>
                    <div className={styles.counter}>
                      {item.value}
                    </div>
                    <button
                      type="button"
                      className={stylesPlus(groupName)}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePlusClick(groupName, itemName);
                      }}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))
            ))}
          </ul>
          {isButtons
            && (
            <div className={`${styles.buttons} ${styles.buttonsNonEmpty}`}>
              <button
                type="button"
                className={stylesClearButton()}
                onClick={(e) => {
                  e.preventDefault();
                  handleClearClick();
                }}
              >
                Очистить
              </button>
              <button
                type="button"
                className={stylesApplyButton()}
                onClick={(e) => {
                  e.preventDefault();
                  handleOutputBlur();
                }}
              >
                Применить
              </button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  isButtons: true,
};

export type { DropdownConfig };
export default Dropdown;
