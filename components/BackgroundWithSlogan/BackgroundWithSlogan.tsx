import RoomSearchCard from 'Components/RoomSearchCard/RoomSearchCard';

import addDaysToDate from 'Root/utils/addDaysToDate';
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
  defaultValues: [new Date(), addDaysToDate(new Date(), 3)],
  isDouble: true,
};

const BackgroundWithSlogan = () => (
  <div className={styles.main}>
    <div className={styles.wrapper}>
      <div>
        <RoomSearchCard
          guestsDropdownConfig={guestDropdownConfig}
          dateRangeConfig={dateRangeConfig}
          onSubmit={() => {}}
        />
      </div>
      <div className={styles.slogan}>
        <p className={styles.text}>Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
      </div>
    </div>
  </div>
);

export default BackgroundWithSlogan;
