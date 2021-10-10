import { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './dateRange.module.scss';

const formattedDate = (date: Date): string => {
  const today = date;
  const day = (`0${today.getDate()}`).slice(-2);
  const month = (`0${today.getMonth() + 1}`).slice(-2);

  return `${day}.${month}.${today.getFullYear()}`;
};

type DateRangeProps = {
  headers: Array<string>,
  placeholder: string,
};

type UserData = Array<Date>;

function DateRange({ headers, placeholder }: DateRangeProps) {
  const [arrivalHeader, departureHeader] = headers;

  const [calendarState, setCalendarState] = useState({
    isOpen: false,
    calView: 'month',
  });

  const [calendarValues, setCalendarValues] = useState<UserData | null>(null);
  const [date, setDates] = useState({
    arrival: '',
    departure: '',
  });

  const { isOpen, calView } = calendarState;

  const calendarClasses = isOpen ? `${styles.calendar} ${styles.active}` : `${styles.calendar}`;
  const arrowClasses = isOpen ? `${styles.arrow} ${styles.arrowUp}` : `${styles.arrow} ${styles.arrowDown}`;
  const clearButtonClasses = date.arrival ? `${styles.button}` : `${styles.button} ${styles.clearButtonHidden}`;
  const buttonsClasses = calView === 'month' ? `${styles.buttonsShow}` : `${styles.buttonsHide}`;

  const handleCalendarDatesChange = (values: UserData) => {
    const [arrivalDate, departureDate] = values;
    setCalendarValues(values);
    setDates({
      arrival: formattedDate(arrivalDate),
      departure: formattedDate(departureDate),
    });
  };

  const handleClearButtonClick = () => {
    setDates({ arrival: '', departure: '' });
    setCalendarValues(null);
  };

  const handleApplyButtonClick = () => {
    setCalendarState((prevState) => ({ ...prevState, isOpen: !calendarState.isOpen }));
  };

  const handleOutputFocus = () => {
    setCalendarState((prevState) => ({ ...prevState, isOpen: true }));
  };

  const handleCalendarViewChange = ({ view }: any) => {
    setCalendarState((prevState) => ({ ...prevState, calView: view }));
  };

  return (
    <div className={styles.mainWrapper}>
      <section className={styles.container}>
        <div>
          <h3 className={styles.header}>{arrivalHeader}</h3>
          <div onFocus={handleOutputFocus} tabIndex={0} role="textbox" className={styles.wrapper}>
            <input
              className={styles.field}
              type="text"
              placeholder={placeholder}
              readOnly
              value={date.arrival}
              tabIndex={-1}
            />
            <div className={arrowClasses} />
          </div>
        </div>
        <div>
          <h3 className={styles.header}>{departureHeader}</h3>
          <div onFocus={handleOutputFocus} tabIndex={0} role="textbox" className={styles.wrapper}>
            <input
              className={styles.field}
              type="text"
              placeholder={placeholder}
              readOnly
              value={date.departure}
              tabIndex={-1}
            />
            <div className={arrowClasses} />
          </div>
        </div>
      </section>
      <div className={calendarClasses}>
        <Calendar
          locale="ru-RU"
          nextLabel=""
          prevLabel=""
          selectRange
          onViewChange={handleCalendarViewChange}
          onChange={handleCalendarDatesChange}
          value={calendarValues}
        />
        <div className={buttonsClasses}>
          <button
            onClick={handleClearButtonClick}
            className={clearButtonClasses}
            type="button"
          >
            очистить
          </button>
          <button
            onClick={handleApplyButtonClick}
            className={styles.button}
            type="button"
          >
            применить
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateRange;
