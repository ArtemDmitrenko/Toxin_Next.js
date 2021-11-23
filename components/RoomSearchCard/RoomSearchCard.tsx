import { useState } from 'react';

import Reference from 'Components/Reference/Reference';
import Dropdown, { DropdownConfig, DropdownData } from 'Components/Dropdown/Dropdown';
import DateRange, { DateRangeConfig, DatesOfStay } from 'Components/DateRange/DateRange';

import styles from './roomSearchCard.module.scss';

type RoomSearchCardData = {
  datesOfStay: DatesOfStay,
  numberOfGuests: DropdownData,
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
        arrival: defaultValues[0].toLocaleDateString(),
        departure: defaultValues[1].toLocaleDateString(),
      };
    }
    return {
      arrival: '',
      departure: '',
    };
  };

  const [datesOfStay, setDatesOfStay] = useState(setDefDateOfStay);

  const [numberOfGuests, setNumberOfGuests] = useState<DropdownData>({});

  const handleDatesOfStayChange = (dates: DatesOfStay) => {
    setDatesOfStay({
      arrival: dates.arrival,
      departure: dates.departure,
    });
  };

  const handleNumberOfGuestChange = (data: DropdownData) => {
    setNumberOfGuests(data);
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
