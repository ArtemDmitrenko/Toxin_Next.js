import Dropdown, { DropdownConfig } from 'Components/Dropdown/Dropdown';

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
  </div>
);

export default Rooms;
