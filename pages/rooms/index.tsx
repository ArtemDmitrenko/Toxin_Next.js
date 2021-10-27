import Layout from 'Components/Layout/Layout';
import SearchFilter from 'Components/SearchFilter/SearchFilter';
import Toggle from 'Components/Toggle/Toggle';
import { DropdownConfig } from 'Root/components/Dropdown/Dropdown';

import styles from './index.module.scss';

const dateCalculate = (date: Date) => {
  date.setDate(date.getDate() + 3);

  return date;
};

const dateRange = {
  defaultValues: [
    new Date(),
    dateCalculate(new Date()),
  ],
};

const guestDropdown: DropdownConfig = [
  {
    title: 'взрослые',
    group: 'adults',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 2,
  },
  {
    title: 'дети',
    group: 'adults',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 1,
  },
  {
    title: 'младенцы',
    group: 'babies',
    wordforms: ['младенец', 'младенца', 'младенцев'],
    defaultValue: 1,
  },
];

const rangeSlider = {
  valueFrom: 5000,
  valueTo: 10000,
};

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
    isChecked: true,
  },
  {
    title: 'Помощник для инвалидов',
    description: 'На 1 этаже вас встретит специалист и\xa0проводит до номера',
    isBoldTitle: true,
    name: 'isHelper',
  },
];

const facilitiesDropdown: DropdownConfig = [
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

const checkboxDropdown = {
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

const Rooms = () => (
  <Layout title="Rooms">
    <div className={styles.grid}>
      <SearchFilter
        dateRangeConfig={dateRange}
        guestsDropdownConfig={guestDropdown}
        rangeSliderConfig={rangeSlider}
        checkboxRulesConfig={checkboxRules}
        checkboxAvailabilitiesConfig={checkboxAvailabilities}
        facilitiesDropdownConfig={facilitiesDropdown}
        checkboxDropdownConfig={checkboxDropdown}
      />
      <div className={styles.roomsCell}>
        Here will be rooms
      </div>
      <Toggle title="Получать спецпредложения" name="special-offers" />
    </div>
  </Layout>
);

export default Rooms;
