import { useState } from 'react';

import DateRange, { DatesOfStay } from 'Components/DateRange/DateRange';
import Dropdown, { DropdownConfig, DropdownData } from 'Components/Dropdown/Dropdown';
import RangeSlider, { RangeSliderData } from 'Components/RangeSlider/RangeSlider';
import Checkbox, { CheckboxData, CheckboxProps } from 'Components/Checkbox/Checkbox';
import CheckboxDropdown, { CheckboxDropdownData } from 'Components/CheckboxDropdown/CheckboxDropdown';

import styles from './searchFilter.module.scss';

type SearchFilterState = {
  dateRange?: DatesOfStay,
  guestsDropdown?: DropdownData,
  rangeSlider?: RangeSliderData,
  checkboxRules?: {
    [key: string]: boolean,
  },
  checkboxAvailability?: {
    [key: string]: boolean,
  },
  facilitiesData?: DropdownData,
  checkboxDropdown?: CheckboxDropdownData,
};

type SearchFilterProps = {
  guestsDropdownConfig: DropdownConfig,
  checkboxRulesConfig: Array<CheckboxProps>,
  checkboxAvailabilitiesConfig: Array<CheckboxProps>,
  facilitiesDropdownConfig: DropdownConfig,
  checkboxDropdownConfig: {
    [key: string]: {
      title: string,
      isChecked: boolean,
    }
  }
  onChange?: (data: SearchFilterState) => void,
  dateRangeConfig?: {
    defaultValues?: Array<Date>
  },
  rangeSliderConfig?: {
    min?: number,
    max?: number,
    valueFrom?: number,
    valueTo?: number,
  },
};

const SearchFilter = (props: SearchFilterProps) => {
  const {
    onChange,
    guestsDropdownConfig,
    checkboxRulesConfig,
    checkboxAvailabilitiesConfig,
    facilitiesDropdownConfig,
    checkboxDropdownConfig,
    dateRangeConfig = {},
    rangeSliderConfig = {},
  } = props;

  const [filter, setFilter] = useState<SearchFilterState>({});

  const stylesCheckboxRule = () => (
    `${styles.checkbox} ${styles.checkboxRule}`
  );

  const stylesCheckboxAvailability = () => (
    `${styles.checkbox} ${styles.checkboxAvailability}`
  );

  const handleElementChange = <T extends {}>(propName: string, data: T) => {
    const newState = { ...filter, [propName]: data };

    setFilter(newState);

    if (onChange) onChange(newState);
  };

  const handleCheckboxRulesChange = (data: CheckboxData) => {
    const newState = {
      ...filter,
      checkboxRules: {
        ...filter.checkboxRules,
        [data.name]: data.isChecked,
      },
    };

    setFilter(newState);

    if (onChange) onChange(newState);
  };

  const handleCheckboxAvailabilityChange = (data: CheckboxData) => {
    const newState = {
      ...filter,
      checkboxAvailability: {
        ...filter.checkboxAvailability,
        [data.name]: data.isChecked,
      },
    };

    setFilter(newState);

    if (onChange) onChange(newState);
  };

  return (
    <div>
      <DateRange
        headers={['даты пребывания в отеле']}
        onChange={(data: DatesOfStay) => {
          handleElementChange<DatesOfStay>('dateRange', data);
        }}
        defaultValues={dateRangeConfig.defaultValues}
      />
      <div className={styles.wrapper}>
        <label className={styles.title}>Гости</label>
        <Dropdown
          list={guestsDropdownConfig}
          placeholder="Сколько гостей"
          onChange={(data: DropdownData) => {
            handleElementChange<DropdownData>('guestsDropdown', data);
          }}
        />
      </div>
      <div className={styles.wrapperLarge}>
        <RangeSlider
          min={rangeSliderConfig.min ?? 0}
          max={rangeSliderConfig.max ?? 15000}
          valueFrom={rangeSliderConfig.valueFrom ?? 0}
          valueTo={rangeSliderConfig.valueTo ?? 15000}
          title="Диапазон цены"
          postfix="₽"
          onChange={(data: RangeSliderData) => {
            handleElementChange<RangeSliderData>('rangeSlider', data);
          }}
        />
        <p className={styles.description}>Стоимость за сутки пребывания в номере</p>
      </div>
      <div className={styles.wrapperLarge}>
        <label className={styles.title}>Правила дома</label>
        <div className={styles.wrapper}>
          {
            checkboxRulesConfig.map((checkbox) => (
              <div
                className={stylesCheckboxRule()}
                key={checkbox.name}
              >
                <Checkbox
                  title={checkbox.title}
                  name={checkbox.name}
                  isChecked={checkbox.isChecked}
                  description={checkbox.description}
                  isBoldTitle={checkbox.isBoldTitle}
                  onChange={handleCheckboxRulesChange}
                />
              </div>
            ))
          }
        </div>
      </div>
      <div className={styles.wrapperLarge}>
        <label className={styles.title}>Доступность</label>
        <div className={styles.wrapper}>
          {
            checkboxAvailabilitiesConfig.map((checkbox) => (
              <div
                className={stylesCheckboxAvailability()}
                key={checkbox.name}
              >
                <Checkbox
                  title={checkbox.title}
                  name={checkbox.name}
                  isBoldTitle={checkbox.isBoldTitle}
                  description={checkbox.description}
                  isChecked={checkbox.isChecked}
                  onChange={handleCheckboxAvailabilityChange}
                />
              </div>
            ))
          }
        </div>
      </div>
      <div className={styles.wrapperLarge}>
        <label className={styles.title}>Удобства номера</label>
        <Dropdown
          list={facilitiesDropdownConfig}
          placeholder="Выберите удобства"
          isButtons={false}
          onChange={(data: DropdownData) => {
            handleElementChange<DropdownData>('facilitiesDropdown', data);
          }}
        />
      </div>
      <div className={styles.wrapperLarge}>
        <CheckboxDropdown
          title="Дополнительные удобства"
          checkboxes={checkboxDropdownConfig}
          onChange={(data: CheckboxDropdownData) => {
            handleElementChange<CheckboxDropdownData>('checkboxDropdown', data);
          }}
        />
      </div>
    </div>
  );
};

export type { SearchFilterState };
export default SearchFilter;
