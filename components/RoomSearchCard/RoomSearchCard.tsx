import { useState } from 'react';

import Reference from 'Components/Reference/Reference';
import Dropdown, { DropdownConfig, Groups } from 'Components/Dropdown/Dropdown';
import DateRange, { DateRangeConfig, DatesOfStay } from 'Components/DateRange/DateRange';

import styles from './roomSearchCard.module.scss';

type RoomSearchCardData = { datesOfStay: DatesOfStay, numberOfGuests: Groups };

type RoomSearchCardProps = {
  guestsDropdownConfig: DropdownConfig,
  dateRangeConfig: DateRangeConfig,
  onSubmit: (data: RoomSearchCardData) => void,
};

const RoomSearchCard = (props: RoomSearchCardProps) => {
  const { guestsDropdownConfig, dateRangeConfig, onSubmit } = props;
  const {
    headers,
    placeholder,
    defaultValues,
    isDouble,
  } = dateRangeConfig;

  const [datesOfStay, setDatesOfStay] = useState({ arrival: '', departure: '' });
  const [numberOfGuests, setNumberOfGuests] = useState({});

  const handleDatesOfStayChange = (dates: DatesOfStay) => {
    setDatesOfStay({
      ...datesOfStay,
      arrival: dates.arrival,
      departure: dates.departure,
    });
  };

  const handleNumberOfGuestChange = (
    guestGroups: Groups,
  ) => {
    /* здесь нужно каким-то образом вытащить
    /* данные из объекта, который приходит от Dropdown
    /* и поместить их в numberOfGuests
    */

    // setNumberOfGuests();
  };

  const handleButtonClick = () => {
    onSubmit({ datesOfStay, numberOfGuests });
  };

  const handleButtonKeyDown = ({ code }: React.KeyboardEvent) => {
    if (code === 'Enter') {
      onSubmit({ datesOfStay, numberOfGuests });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Найдём номера под ваши пожелания</h1>
      <form>
        <div className={styles.dateRange}>
          <DateRange
            headers={headers}
            placeholder={placeholder}
            defaultValues={defaultValues}
            isDouble={isDouble}
            onChange={handleDatesOfStayChange}
          />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            list={guestsDropdownConfig}
            placeholder="Сколько гостей"
            onChange={handleNumberOfGuestChange}
          />
        </div>
        <div
          className={styles.button}
          role="button"
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            handleButtonClick();
          }}
          onKeyDown={(e) => {
            e.preventDefault();
            handleButtonKeyDown(e);
          }}
        >
          <Reference href="/rooms" text="подобрать номер" type="directed" size="big" />
        </div>
      </form>
    </div>
  );
};

export type { RoomSearchCardData };
export default RoomSearchCard;
