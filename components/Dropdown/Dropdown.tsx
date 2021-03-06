import { useState, useEffect } from 'react';

import convertNumToWordform from 'Root/utils/convertNumToWordform';

import styles from './dropdown.module.scss';

type DropdownConfig = Array<{
  title: string,
  group: string,
  defaultValue?: number,
  wordforms: [string, string, string],
}>;

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

type DropdownData = Groups;

type DropdownProps = {
  list: DropdownConfig,
  isButtons?: boolean,
  placeholder?: string,
  onChange?: (data: DropdownData) => void,
};

type DropdownState = {
  isActive: boolean,
  output: string,
  groups: Groups,
};

const MAX_GROUP_VALUE = 10;

const Dropdown = (props: DropdownProps) => {
  const {
    list,
    isButtons = true,
    placeholder = '',
    onChange,
  } = props;

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

  useEffect(() => {
    outputGenerate();

    if (onChange) onChange(dropdown.groups);
  }, [dropdown.groups]);

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

    const newState = {
      ...dropdown,
      groups: {
        ...dropdown.groups,
        [groupName]: {
          ...dropdown.groups[groupName],
          items: {
            ...dropdown.groups[groupName].items,
            [itemName]: {
              ...dropdown.groups[groupName].items[itemName],
              value: dropdown.groups[groupName].items[itemName].value - 1,
            },
          },
        },
      },
    };

    setDropdown(newState);
  };

  const handlePlusClick = (groupName: string, itemName: string) => {
    if (groupSum(groupName) >= MAX_GROUP_VALUE) return;

    const newState = {
      ...dropdown,
      groups: {
        ...dropdown.groups,
        [groupName]: {
          ...dropdown.groups[groupName],
          items: {
            ...dropdown.groups[groupName].items,
            [itemName]: {
              ...dropdown.groups[groupName].items[itemName],
              value: dropdown.groups[groupName].items[itemName].value + 1,
            },
          },
        },
      },
    };

    setDropdown(newState);
  };

  const handleClearClick = () => {
    const newGroups = { ...dropdown.groups };

    Object.values(newGroups).forEach((group) => {
      Object.values(group.items).forEach((item) => {
        Object.defineProperty(item, 'value', { value: 0 });
      });
    });

    const newState = {
      ...dropdown,
      groups: {
        ...newGroups,
      },
      output: '',
    };

    setDropdown(newState);
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
          placeholder={placeholder}
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
                  ????????????????
                </button>
                <button
                  type="button"
                  className={stylesApplyButton()}
                  onClick={(e) => {
                    e.preventDefault();
                    handleOutputBlur();
                  }}
                >
                  ??????????????????
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export type { DropdownConfig, DropdownData, Groups };
export default Dropdown;
