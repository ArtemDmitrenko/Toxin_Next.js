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

function DateRange({ headers, placeholder }: DateRangeProps) {
  const [arrivalHeader, departureHeader] = headers;
  const [isOpen, setState] = useState(false);
  const [calendarView, setView] = useState('month');
  // const [date, setDate] = useState([new Date(), new Date()]);
  const [date, setDates] = useState({
    arrival: '',
    departure: '',
  });

  const calendarClasses = isOpen ? `${styles.calendar} ${styles.active}` : `${styles.calendar}`;
  const arrowClasses = isOpen ? `${styles.arrow} ${styles.arrowUp}` : `${styles.arrow} ${styles.arrowDown}`;
  const buttonsClasses = calendarView === 'month' ? `${styles.buttonsShow}` : `${styles.buttonsHide}`;

  const handleInputSelect = () => (!isOpen ? setState(true) : setState(false));
  const handleCalendarViewChange = ({ view }: any) => setView(view);
  const handleCalendarDatesChange = (values: Date[]) => {
    const [arrivalDate, departureDate] = values;
    setDates({
      arrival: formattedDate(arrivalDate),
      departure: formattedDate(departureDate),
    });
  };
  const handleClearButtonClick = () => setDates({ arrival: '', departure: '' });

  return (
    <div className={styles.mainWrapper}>
      <section className={styles.container}>
        <div>
          <h3 className={styles.header}>{arrivalHeader}</h3>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div onClick={handleInputSelect} tabIndex={0} role="textbox" className={styles.wrapper}>
            <input
              className={styles.field}
              type="text"
              placeholder={placeholder}
              readOnly
              value={date.arrival}
            />
            <div className={arrowClasses} />
          </div>
        </div>
        <div>
          <h3 className={styles.header}>{departureHeader}</h3>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div onClick={handleInputSelect} tabIndex={0} role="textbox" className={styles.wrapper}>
            <input className={styles.field} type="text" placeholder={placeholder} readOnly value={date.departure} />
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
          onChange={handleCalendarDatesChange}
          onViewChange={handleCalendarViewChange}
        />
        <div className={buttonsClasses}>
          <button
            onClick={handleClearButtonClick}
            className={styles.button}
            type="button"
          >
            очистить
          </button>
          <button
            onClick={handleInputSelect}
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
