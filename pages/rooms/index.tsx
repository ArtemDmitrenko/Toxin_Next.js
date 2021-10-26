import Dropdown, { DropdownConfig } from 'Components/Dropdown/Dropdown';
import Comment from 'Components/Comment/Comment';
import userComment from 'Components/Comment/comment.json';
import Pagination from 'Components/Pagination/Pagination';
import roomsJSON from 'Root/public/rooms-mock/rooms.json';
import ReservationCard, { Service } from 'Components/ReservationCard/ReservationCard';
import CheckboxDropdown from 'Components/CheckboxDropdown/CheckboxDropdown';
import RulesList from 'Root/components/RulesList/RulesList';

import styles from './index.module.scss';

const guestsDropdownConfig: DropdownConfig = [
  {
    title: 'Взрослые',
    group: 'guests',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 2,
  },
  {
    title: 'Дети',
    group: 'guests',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 1,
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

const service: Service = {
  discount: 2179,
  serviceCost: 0,
  extraServiceCost: 300,
};

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
    <Comment
      srcIcon={userComment.srcIcon}
      userName={userComment.userName}
      date={new Date(userComment.date)}
      text={userComment.text}
      like={userComment.like}
    />
    <Pagination itemsPerPage={12} allItems={roomsJSON} onChange={(pageNumber) => console.log(`Page ${pageNumber + 1} is clicked`)} />
    <ReservationCard
      roomNumber={888}
      level="люкс"
      cost={9990}
      datesOfStay={{ arrival: '2019-08-19', departure: '2019-08-23' }}
      guests={guestsDropdownConfig}
      service={service}
      onSubmit={(data) => data}
    />
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
