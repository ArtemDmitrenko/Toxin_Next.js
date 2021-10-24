import DateRange from 'Components/DateRange/DateRange';
import Dropdown, { DropdownConfig } from 'Components/Dropdown/Dropdown';
import Reference from 'Components/Reference/Reference';

import styles from './reservationCard.module.scss';

const guestsDropdownConfig: DropdownConfig = [
  {
    title: 'Взрослые',
    group: 'guests',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 2,
  },
  {
    title: 'Дети',
    group: 'guests',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 1,
  },
  {
    title: 'Младенцы',
    group: 'babies',
    wordforms: ['младенец', 'младенца', 'младенцев'],
  },
];

type RoomCardProps = {
  roomNumber: number,
  level?: string,
  cost: number,
};

const ReservationCard = (props: RoomCardProps) => {
  const { roomNumber, level, cost } = props;

  return (
    <div className={styles.roomCard}>
      <div className={styles.dataRoom}>
        <div>
          <span className={styles.signNumber}>№</span>
          <span className={styles.roomNumber}>{roomNumber}</span>
          <span className={styles.level}>{level}</span>
        </div>
        <div className={styles.costRoom}>
          <span className={styles.cost}>{`${cost}`}</span>
          <span className={styles.costText}>в сутки</span>
        </div>
      </div>
      <DateRange headers={['прибытие', 'выезд']} defaultValues={[new Date('2019-08-19'), new Date('2019-08-23')]} isDouble onChange={() => console.log('cd')} />
      <Dropdown list={guestsDropdownConfig} placeholder="Сколько гостей" />
      <div className={styles.calculator}>
        <div className={styles.costItem}>
          <div className={styles.calc}>9 990₽ х 4 суток</div>
          <div className={styles.sum}>39 960₽</div>
        </div>
        <div className={styles.costItem}>
          <div className={styles.calc}>Сбор за услуги: скидка 2 179₽</div>
          <div className={styles.sum}>0₽</div>
        </div>
        <div className={styles.costItem}>
          <div className={styles.calc}>Сбор за дополнительные услуги</div>
          <div className={styles.sum}>300₽</div>
        </div>
        <div className={styles.costItem}>
          <div className={styles.final}>Итого</div>
          <div className={styles.points}>...</div>
          <div className={styles.final}>38 081₽</div>
        </div>
        <Reference type="directed" size="big" text="забронировать" />
      </div>

    </div>
  );
};

export default ReservationCard;
