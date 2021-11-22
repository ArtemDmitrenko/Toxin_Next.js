import { useAppDispatch } from 'Root/redux/hooks';
import addDaysToDate from 'Root/utils/addDaysToDate';
import { setRoomSearchData } from 'Root/redux/roomSearch/roomSearchActions';
import { DropdownConfig } from 'Components/Dropdown/Dropdown';
import { DateRangeConfig } from 'Components/DateRange/DateRange';
import RoomSearchCard, { RoomSearchCardData } from 'Components/RoomSearchCard/RoomSearchCard';

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

const BackgroundWithSlogan = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: RoomSearchCardData) => {
    const roomSearchState = {
      datesOfStay: data.datesOfStay,
      numberOfGuests: data.numberOfGuests,
    };
    dispatch(setRoomSearchData(roomSearchState));
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div>
          <RoomSearchCard
            guestsDropdownConfig={guestDropdownConfig}
            dateRangeConfig={dateRangeConfig}
            onSubmit={handleSubmit}
          />
        </div>
        <div className={styles.slogan}>
          <p className={styles.text}>Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
        </div>
      </div>
    </div>
  );
};

export default BackgroundWithSlogan;
