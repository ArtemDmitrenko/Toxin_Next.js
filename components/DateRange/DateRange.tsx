import { useState } from 'react';
import Calendar from 'react-calendar';

import formattingLabel from './helpers/formattingLabel';
import formattingDate from './helpers/formattingDate';
import styles from './dateRange.module.scss';

type DateRangeProps = {
  headers: Array<string>,
  placeholder: string,
};

type CalendarState = {
  isOpen: boolean,
  calView: string,
};

type CalendarDates = {
  arrival: string,
  departure: string,
};

type UserData = Array<Date>;

const DateRange = ({ headers, placeholder }: DateRangeProps) => {
  const [arrivalHeader, departureHeader] = headers;
  const defaultCalendarState: CalendarState = {
    isOpen: false,
    calView: 'month',
  };
  const defaultCalendarDates: CalendarDates = {
    arrival: '',
    departure: '',
  };

  const [calendarState, setCalendarState] = useState(defaultCalendarState);
  const [formattedDates, setDates] = useState(defaultCalendarDates);
  const [calendarValues, setCalendarValues] = useState<UserData | null>(null);

  const { isOpen, calView } = calendarState;

  const stylesCalendar = isOpen
    ? `${styles.calendar} ${styles.active}`
    : `${styles.calendar}`;
  const stylesArrow = isOpen
    ? `${styles.arrow} ${styles.arrowUp}`
    : `${styles.arrow} ${styles.arrowDown}`;
  const stylesClearButton = formattedDates.arrival
    ? `${styles.button}`
    : `${styles.button} ${styles.clearButtonHidden}`;
  const stylesButtons = calView === 'month'
    ? `${styles.buttonsShow}`
    : `${styles.buttonsHide}`;

  const handleCalendarDatesChange = (values: UserData) => {
    const [arrivalDate, departureDate] = values;

    setCalendarValues(values);
    setDates({
      arrival: formattingDate(arrivalDate),
      departure: formattingDate(departureDate),
    });
  };

  const handleClearButtonClick = () => {
    setCalendarValues(null);
    setDates({ arrival: '', departure: '' });
  };

  const handleCalendarFocus = () => {
    setCalendarState((prevState) => ({ ...prevState, isOpen: true }));
  };

  const handleCalendarBlur = () => {
    setCalendarState((prevState) => ({ ...prevState, isOpen: false }));
  };

  const handleCalendarViewChange = ({ view }: { view: string }) => {
    setCalendarState((prevState) => ({ ...prevState, calView: view }));
  };

  return (
    <div
      className={styles.mainWrapper}
      onBlur={handleCalendarBlur}
      onFocus={handleCalendarFocus}
    >
      <section className={styles.container}>
        <div>
          <h3 className={styles.header}>{arrivalHeader}</h3>
          <div tabIndex={0} role="textbox" className={styles.wrapper}>
            <input
              className={styles.field}
              type="text"
              placeholder={placeholder}
              readOnly
              value={formattedDates.arrival}
              tabIndex={-1}
            />
            <div className={stylesArrow} />
          </div>
        </div>
        <div>
          <h3 className={styles.header}>{departureHeader}</h3>
          <div tabIndex={0} role="textbox" className={styles.wrapper}>
            <input
              className={styles.field}
              type="text"
              placeholder={placeholder}
              readOnly
              value={formattedDates.departure}
              tabIndex={-1}
            />
            <div className={stylesArrow} />
          </div>
        </div>
      </section>
      <div className={stylesCalendar} role="menu" tabIndex={0}>
        <Calendar
          locale="ru-RU"
          nextLabel=""
          prevLabel=""
          selectRange
          onViewChange={handleCalendarViewChange}
          onChange={handleCalendarDatesChange}
          navigationLabel={formattingLabel}
          value={calendarValues}
        />
        <div className={stylesButtons}>
          <button
            onClick={handleClearButtonClick}
            className={stylesClearButton}
            type="button"
          >
            очистить
          </button>
          <button
            onClick={handleCalendarBlur}
            className={styles.button}
            type="button"
          >
            применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRange;
