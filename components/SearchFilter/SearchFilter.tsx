import { useState } from 'react';

import DateRange, { DatesOfStay } from 'Components/DateRange/DateRange';
import Dropdown, { DropdownConfig, DropdownData } from 'Components/Dropdown/Dropdown';
import RangeSlider, { RangeSliderData } from 'Components/RangeSlider/RangeSlider';
import Checkbox, { CheckboxData } from 'Components/Checkbox/Checkbox';
import CheckboxDropdown, { CheckboxDropdownData } from 'Components/CheckboxDropdown/CheckboxDropdown';

import styles from './searchFilter.module.scss';

const guestDropdownConfig: DropdownConfig = [
  {
    title: 'взрослые',
    group: 'adults',
    wordforms: ['гость', 'гостя', 'гостей'],
  },
  {
    title: 'дети',
    group: 'adults',
    wordforms: ['гость', 'гостя', 'гостей'],
  },
  {
    title: 'младенцы',
    group: 'babies',
    wordforms: ['младенец', 'младенца', 'младенцев'],
  },
];

const facilitiesDropdownConfig: DropdownConfig = [
  {
    title: 'Спальни',
    group: 'bedrooms',
    defaultValue: 2,
    wordforms: ['спальня', 'спальни', 'спален'],
  },
  {
    title: 'Кровати',
    group: 'beds',
    defaultValue: 2,
    wordforms: ['кровать', 'кровати', 'кроватей'],
  },
  {
    title: 'Ванные комнаты',
    group: 'bathrooms',
    wordforms: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
  },
];

const checkboxRules = [
  {
    title: 'Можно курить',
    name: 'isSmoke',
  },
  {
    title: 'Можно с питомцами',
    name: 'isPets',
    isChecked: true,
  },
  {
    title: 'Можно пригласить гостей (до 10 человек)',
    name: 'isGuests',
    isChecked: true,
  },
];

const checkboxAvailabilities = [
  {
    title: 'Широкий коридор',
    description: 'Ширина коридоров в номере не\xa0менее 91 см.',
    isBoldTitle: true,
    name: 'isWideHall',
  },
  {
    title: 'Помощник для инвалидов',
    description: 'На 1 этаже вас встретит специалист и\xa0проводит до номера',
    isBoldTitle: true,
    name: 'isHelper',
  },
];

const checkboxList = {
  breakfast: {
    title: 'Завтрак',
    isChecked: false,
  },
  desk: {
    title: 'Письменный стол',
    isChecked: true,
  },
  feedingChair: {
    title: 'Стул для кормления',
    isChecked: true,
  },
  crib: {
    title: 'Кроватка',
    isChecked: true,
  },
  television: {
    title: 'Телевизор',
    isChecked: false,
  },
  shampoo: {
    title: 'Шампунь',
    isChecked: false,
  },
  additionTelevision: {
    title: 'Телевизор',
    isChecked: false,
  },
  additionShampoo: {
    title: 'Шампунь',
    isChecked: false,
  },
};

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
  onChange?: (data: SearchFilterState) => void,
};

const SearchFilter = (props: SearchFilterProps) => {
  const {
    onChange,
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
      />
      <div className={styles.wrapper}>
        <label className={styles.title}>Гости</label>
        <Dropdown
          list={guestDropdownConfig}
          placeholder="Сколько гостей"
          onChange={(data: DropdownData) => {
            handleElementChange<DropdownData>('guestsDropdown', data);
          }}
        />
      </div>
      <div className={styles.wrapperLarge}>
        <RangeSlider
          min={0}
          max={15000}
          valueFrom={5000}
          valueTo={10000}
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
            checkboxRules.map((checkbox) => (
              <div
                className={stylesCheckboxRule()}
                key={checkbox.name}
              >
                <Checkbox
                  title={checkbox.title}
                  name={checkbox.name}
                  isChecked={checkbox.isChecked}
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
            checkboxAvailabilities.map((checkbox) => (
              <div
                className={stylesCheckboxAvailability()}
                key={checkbox.name}
              >
                <Checkbox
                  title={checkbox.title}
                  name={checkbox.name}
                  isBoldTitle={checkbox.isBoldTitle}
                  description={checkbox.description}
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
          checkboxes={checkboxList}
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
