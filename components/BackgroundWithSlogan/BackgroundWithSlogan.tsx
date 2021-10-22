import RoomSearchCard, { RoomSearchCardData } from 'Components/RoomSearchCard/RoomSearchCard';

import { DropdownConfig } from 'Components/Dropdown/Dropdown';
import { DateRangeConfig } from 'Components/DateRange/DateRange';

import styles from './backgroundWithSlogan.module.scss';

const guestDropdownConfig: DropdownConfig = [
  { title: 'взрослые', group: 'adults', wordforms: ['гость', 'гостя', 'гостей'] },
  { title: 'дети', group: 'adults', wordforms: ['гость', 'гостя', 'гостей'] },
  { title: 'младенцы', group: 'babies', wordforms: ['младенец', 'младенца', 'младенцев'] },
];

const dateRangeConfig: DateRangeConfig = {
  headers: ['прибытие', 'выезд'],
  defaultValues: [new Date('2021-10-19'), new Date('2021-10-23')],
  isDouble: true,
};

const handleSearchCardSubmit = (data: RoomSearchCardData) => {
  console.log(data);

  /* здесь нужно определиться что мы делаем
  /* с данными из формы
  /* (отправляем на сервер/добавляем в стор редакса???)
  */
};

const BackgroundWithSlogan = () => (
  <div className={styles.main}>
    <div className={styles.wrapper}>
      <div>
        <RoomSearchCard
          guestsDropdownConfig={guestDropdownConfig}
          dateRangeConfig={dateRangeConfig}
          onSubmit={handleSearchCardSubmit}
        />
      </div>
      <div className={styles.slogan}>
        <p className={styles.text}>Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
      </div>
    </div>
  </div>
);

export default BackgroundWithSlogan;
