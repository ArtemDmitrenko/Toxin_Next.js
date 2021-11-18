import { useState, useEffect } from 'react';

import convertDateToString from 'Root/utils/convertDateToString';
import DateRange, { DatesOfStay } from 'Components/DateRange/DateRange';
import Dropdown, { DropdownConfig, DropdownData } from 'Components/Dropdown/Dropdown';
import RangeSlider, { RangeSliderData } from 'Components/RangeSlider/RangeSlider';
import Checkbox, { CheckboxData, CheckboxProps } from 'Components/Checkbox/Checkbox';
import CheckboxDropdown, { CheckboxDropdownData } from 'Components/CheckboxDropdown/CheckboxDropdown';

import styles from './searchFilter.module.scss';

type SearchFilterState = {
  dateRange: DatesOfStay,
  guestsDropdown: DropdownData,
  rangeSlider: RangeSliderData,
  checkboxRules: {
    [key: string]: boolean,
  },
  checkboxAvailability: {
    [key: string]: boolean,
  },
  facilitiesData: {
    bedrooms: number,
    beds: number,
    bathrooms: number,
  },
  checkboxDropdown: CheckboxDropdownData,
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
    min: number,
    max: number,
    valueFrom?: number,
    valueTo?: number,
  },
};

const initState: SearchFilterState = {
  dateRange: {
    arrival: convertDateToString(new Date()),
    departure: convertDateToString(new Date()),
  },
  guestsDropdown: {},
  rangeSlider: [],
  checkboxRules: {},
  checkboxAvailability: {},
  facilitiesData: {
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
  },
  checkboxDropdown: {},
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
    rangeSliderConfig = {
      min: 0,
      max: 15000,
    },
  } = props;

  const [filter, setFilter] = useState(initState);

  useEffect(() => {
    const isFilterMount = filter === initState;

    if (onChange && !isFilterMount) onChange(filter);
  }, [filter]);

  const stylesCheckboxRule = () => (
    `${styles.checkbox} ${styles.checkboxRule}`
  );

  const stylesCheckboxAvailability = () => (
    `${styles.checkbox} ${styles.checkboxAvailability}`
  );

  const handleElementChange = <T extends {}>(propName: string, data: T) => {
    setFilter((prevState) => ({
      ...prevState,
      [propName]: data,
    }));
  };

  const handleCheckboxRulesChange = (data: CheckboxData) => {
    setFilter((prevState) => ({
      ...prevState,
      checkboxRules: {
        ...prevState.checkboxRules,
        [data.name]: data.isChecked,
      },
    }));
  };

  const handleCheckboxAvailabilityChange = (data: CheckboxData) => {
    setFilter((prevState) => ({
      ...prevState,
      checkboxAvailability: {
        ...prevState.checkboxAvailability,
        [data.name]: data.isChecked,
      },
    }));
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
          min={rangeSliderConfig.min}
          max={rangeSliderConfig.max}
          valueFrom={rangeSliderConfig.valueFrom ?? rangeSliderConfig.min}
          valueTo={rangeSliderConfig.valueTo ?? rangeSliderConfig.max}
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
            handleElementChange<DropdownData>('facilitiesData', data);
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
