import { useState } from 'react';

import Reference from 'Components/Reference/Reference';
import Dropdown, { DropdownConfig, DropdownData } from 'Components/Dropdown/Dropdown';
import DateRange, { DateRangeConfig, DatesOfStay } from 'Components/DateRange/DateRange';
import formattingDate from 'Components/DateRange/helpers/formattingDate';

import styles from './roomSearchCard.module.scss';

type RoomSearchCardData = {
  datesOfStay: DatesOfStay,
  numberOfGuests: { [key:string]: number },
  numberOfGuestsByTitle: { [key:string]: number },
};

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

  const setDefDateOfStay = () => {
    if (defaultValues) {
      return {
        arrival: formattingDate(defaultValues[0]),
        departure: formattingDate(defaultValues[1]),
      };
    }
    return {
      arrival: '',
      departure: '',
    };
  };

  const [datesOfStay, setDatesOfStay] = useState(setDefDateOfStay);
  const [numberOfGuests, setNumberOfGuests] = useState({});
  const [numberOfGuestsByTitle, setNumberOfGuestsByTitle] = useState({});

  const handleDatesOfStayChange = (dates: DatesOfStay) => {
    setDatesOfStay({
      ...datesOfStay,
      arrival: dates.arrival,
      departure: dates.departure,
    });
  };

  const handleNumberOfGuestChange = (data: DropdownData) => {
    setNumberOfGuests(data.group);
    setNumberOfGuestsByTitle(data.title);
  };

  const handleButtonClick = () => {
    onSubmit({ datesOfStay, numberOfGuests, numberOfGuestsByTitle });
  };

  const handleButtonKeyDown = ({ code }: React.KeyboardEvent) => {
    if (code === 'Enter') {
      onSubmit({ datesOfStay, numberOfGuests, numberOfGuestsByTitle });
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
          <h3 className={styles.dropdownTitle}>гости</h3>
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
