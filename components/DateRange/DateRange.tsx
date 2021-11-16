import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import formattingLabel from './helpers/formattingLabel';
import formattingDate from './helpers/formattingDate';
import createShortDateDisplay from './helpers/createShortDateDisplay';

import styles from './dateRange.module.scss';

type DateRangeConfig = {
  headers: Array<string>,
  placeholder?: string,
  defaultValues?: Array<Date>,
  isDouble?: boolean,
};

type DatesOfStay = {
  arrival: string,
  departure: string,
};

type DateRangeProps = {
  headers: Array<string>,
  placeholder?: string,
  defaultValues?: Array<Date>,
  isDouble?: boolean,
  onChange?: (dates: DatesOfStay) => void,
};

const DateRange = (props: DateRangeProps) => {
  const {
    headers,
    placeholder = 'ДД.ММ.ГГГГ',
    isDouble = false,
    defaultValues = null,
    onChange,
  } = props;
  const [firstHeader, secondHeader] = headers;

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

  useEffect(() => {
    if (onChange) onChange(formattedDates);
  }, [formattedDates]);

  const { isOpen, calView } = calendarState;

  const wrapperClass = `${isDouble ? styles.doubleInputWrapper : styles.oneInputWrapper}`;
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
  };

  const handleClearButtonClick = () => {
    const resetDatesOfStay = { arrival: '', departure: '' };

    setCalendarValues(null);
    setDates(resetDatesOfStay);
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
      className={wrapperClass}
      onBlur={(e) => {
        e.preventDefault();
        handleCalendarBlur();
      }}
      onFocus={(e) => {
        e.preventDefault();
        handleCalendarFocus();
      }}
    >
      {isDouble
        ? (
          <section className={styles.container}>
            <div className={styles.firstInput}>
              <h3 className={styles.header}>{firstHeader}</h3>
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
              <h3 className={styles.header}>{secondHeader}</h3>
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
        ) : (
          <section>
            <h3 className={styles.header}>{firstHeader}</h3>
            <div tabIndex={0} role="textbox" className={styles.wrapper}>
              <input
                className={styles.field}
                type="text"
                placeholder={placeholder}
                readOnly
                value={
                  calendarValues ? createShortDateDisplay(calendarValues) : ''
                }
                tabIndex={-1}
              />
              <div className={arrowClasses} />
            </div>
          </section>
        )}
      <div className={calendarClasses} role="menu" tabIndex={0}>
        <Calendar
          className={!isDouble ? 'small' : ''}
          locale="ru-RU"
          nextLabel=""
          prevLabel=""
          selectRange
          onViewChange={handleCalendarViewChange}
          onChange={handleCalendarDatesChange}
          navigationLabel={formattingLabel}
          value={calendarValues}
          minDate={new Date()}
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

export type { DateRangeConfig, DatesOfStay };
export default DateRange;
