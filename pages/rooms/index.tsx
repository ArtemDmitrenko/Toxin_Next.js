import Dropdown, { DropdownConfig } from 'Components/Dropdown/Dropdown';
import RulesList from 'Root/components/RulesList/RulesList';
import Comments from 'Components/Comments/Comments';
import userComments from 'Components/Comments/comments.json';
import Pagination from 'Components/Pagination/Pagination';
import roomsJSON from 'Root/public/rooms-mock/rooms.json';

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
    <Comments comments={userComments} />
    <Pagination itemsPerPage={12} allItems={roomsJSON} onChange={(pageNumber) => console.log(`Page ${pageNumber + 1} is clicked`)} />
  </div>
);

export default Rooms;
