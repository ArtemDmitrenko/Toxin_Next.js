import { GuestsDropdownConfig } from 'Components/GuestsDropdown/GuestsDropdown';
import GuestsDropdown from 'Components//GuestsDropdown/GuestsDropdown';
import Reference from 'Components/Reference/Reference';

import styles from './roomSearchCard.module.scss';
import DateRange from '../DateRange/DateRange';

type DateRangeConfig = {
  headers: Array<string>,
  placeholder: string,
  defaultValues: Array<Date> | null,
};

type RoomSearchCardProps = {
  guestsDropdownConfig: GuestsDropdownConfig,
  dateRangeConfig: DateRangeConfig,
  onSubmit: () => void,
  addDatesOfState: (dates: { arrival: string, departure: string }) => void,
  addNumberOfGuest: (guestGroups: Array<{ title: string, group: string, number: number }>) => void,
};

const RoomSearchCard = (props: RoomSearchCardProps) => {
  const {
    guestsDropdownConfig, dateRangeConfig, onSubmit, addDatesOfState, addNumberOfGuest,
  } = props;
  const { headers, placeholder, defaultValues } = dateRangeConfig;

  const handleButtonClick = () => {
    onSubmit();
  };

  const handleButtonKeyDown = (code: string) => {
    if (code === 'Enter') {
      onSubmit();
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
            onChange={addDatesOfState}
          />
        </div>
        <div className={styles.dropdown}>
          <GuestsDropdown list={guestsDropdownConfig} onChange={addNumberOfGuest} />
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
            const { code } = e;
            handleButtonKeyDown(code);
          }}
        >
          <Reference text="Перейти к оплате" type="directed" size="big" />
        </div>
      </form>
    </div>
  );
};

export default RoomSearchCard;
