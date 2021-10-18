import { useState } from 'react';
import Calendar from 'react-calendar';

import formattingLabel from './helpers/formattingLabel';
import formattingDate from './helpers/formattingDate';
import styles from './dateRange.module.scss';

type DateRangeProps = {
  headers: Array<string>,
  placeholder: string,
  onChange: (dates: { arrival: string, departure: string }) => void,
  defaultValues: Array<Date> | null,
};

const DateRange = (props: DateRangeProps) => {
  const {
    headers,
    placeholder,
    defaultValues,
    onChange,
  } = props;
  const [arrivalHeader, departureHeader] = headers;

  const formattedDefaultValues = () => {
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

  const [calendarState, setCalendarState] = useState({
    isOpen: false,
    calView: 'month',
  });
  const [formattedDates, setDates] = useState(formattedDefaultValues);
  const [calendarValues, setCalendarValues] = useState(defaultValues);

  const { isOpen, calView } = calendarState;

  const calendarClasses = `${styles.calendar} ${isOpen ? styles.active : ''}`;
  const arrowClasses = `${styles.arrow} ${isOpen ? styles.arrowUp : styles.arrowDown}`;
  const clearButtonClasses = `${styles.button} ${formattedDates.arrival ? '' : styles.clearButtonHidden}`;
  const buttonsClasses = `${calView === 'month' ? styles.buttonsShow : styles.buttonsHide}`;

  const handleCalendarDatesChange = (values: Array<Date>) => {
    const [arrivalDate, departureDate] = values;
    const userSelectedDates = {
      arrival: formattingDate(arrivalDate),
      departure: formattingDate(departureDate),
    };

    setCalendarValues(values);
    setDates(userSelectedDates);
    onChange(userSelectedDates);
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
      onBlur={(e) => {
        e.preventDefault();
        handleCalendarBlur();
      }}
      onFocus={(e) => {
        e.preventDefault();
        handleCalendarFocus();
      }}
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
            <div className={arrowClasses} />
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
            <div className={arrowClasses} />
          </div>
        </div>
      </section>
      <div className={calendarClasses} role="menu" tabIndex={0}>
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
        <div className={buttonsClasses}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClearButtonClick();
            }}
            className={clearButtonClasses}
            type="button"
          >
            очистить
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleCalendarBlur();
            }}
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
