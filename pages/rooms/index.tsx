import Dropdown, { DropdownConfig } from 'Components/Dropdown/Dropdown';
import Comment from 'Components/Comment/Comment';
import userComment from 'Components/Comment/comment.json';
import Pagination from 'Components/Pagination/Pagination';
import roomsJSON from 'Root/public/rooms-mock/rooms.json';
import ReservationCard from 'Components/ReservationCard/ReservationCard';

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
    <Comment
      srcIcon={userComment.srcIcon}
      userName={userComment.userName}
      date={new Date(userComment.date)}
      text={userComment.text}
      like={userComment.like}
    />
    <Pagination itemsPerPage={12} allItems={roomsJSON} onChange={(pageNumber) => console.log(`Page ${pageNumber + 1} is clicked`)} />
    <ReservationCard roomNumber={100} level="люкс" cost={1000} />
  </div>
);

export default Rooms;
