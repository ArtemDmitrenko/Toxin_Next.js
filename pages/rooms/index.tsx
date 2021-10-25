import Dropdown, { DropdownConfig } from 'Components/Dropdown/Dropdown';
import CheckboxDropdown from 'Components/CheckboxDropdown/CheckboxDropdown';
import RulesList from 'Root/components/RulesList/RulesList';

import styles from './index.module.scss';

const guestsDropdownConfig: DropdownConfig = [
  {
    title: 'Взрослые',
    group: 'guests',
    wordforms: ['гость', 'гостя', 'гостей'],
  },
  {
    title: 'Дети',
    group: 'guests',
    wordforms: ['гость', 'гостя', 'гостей'],
  },
  {
    title: 'Младенцы',
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
    defaultValue: 1,
    wordforms: ['кровать', 'кровати', 'кроватей'],
  },
  {
    title: 'Ванные комнаты',
    group: 'bathrooms',
    defaultValue: 1,
    wordforms: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
  },
];

const rulesList = [
  { id: '0', title: 'Нельзя с питомцами' },
  { id: '1', title: 'Без вечеринок и мероприятий' },
  { id: '2', title: 'Время прибытия — после 13:00, а\u00A0выезд до 12:00' },
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

const Rooms = () => (
  <div>
    <div>
      <Dropdown list={guestsDropdownConfig} placeholder="Сколько гостей" />
      <Dropdown list={facilitiesDropdownConfig} placeholder="Выберите удобства" isButtons={false} />
    </div>
    <div className={styles.row}>
      <Dropdown list={guestsDropdownConfig} placeholder="Сколько гостей" />
      <Dropdown list={facilitiesDropdownConfig} placeholder="Выберите удобства" isButtons={false} />
    </div>
    <div>
      <RulesList
        rulesHeader="правила"
        rulesList={rulesList}
      />
    </div>
    <div>
      <CheckboxDropdown checkboxes={checkboxList} title="Дополнительные удобства" />
    </div>
  </div>
);

export default Rooms;
