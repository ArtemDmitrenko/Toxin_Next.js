import { useState } from 'react';

import DateRange, { DateRangeConfig, DatesOfStay } from 'Components/DateRange/DateRange';
import Dropdown, { DropdownConfig } from 'Components/Dropdown/Dropdown';
import Reference from 'Components/Reference/Reference';
import Tooltip from 'Components/Tooltip/Tooltip';

import styles from './reservationCard.module.scss';

type Service = {
  discount: number,
  serviceCost: number,
  extraServiceCost: number
};

type ReservationCardData = {
  datesOfStay: DatesOfStay,
  numberOfGuests: { [key:string]: number },
  roomNumber: number,
  level?: string,
  cost: number,
  services: Service,
  totalCost: number
};

type ReservationCardProps = {
  roomNumber: number,
  level?: string,
  cost: number,
  guests: DropdownConfig,
  datesOfStay: DatesOfStay,
  services: Service,
  onSubmit?: (data: ReservationCardData) => void,
};






// Helpers
const setSign = (daysToStay: number): string => {
  const sign = (daysToStay % 10 === 1 && daysToStay !== 11) ? 'сутки' : 'суток';
  return sign;
};

const displayCost = (cost: number): string => (
  cost.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
);










const ReservationCard = (props: ReservationCardProps) => {
  const { roomNumber, level, cost, guests, datesOfStay, services, onSubmit } = props;


  const [dateRange, setDateRange] = useState({
    arrival: datesOfStay.arrival,
    departure: datesOfStay.departure,
  });

  const calcDays = (): number => {
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    const firstDay = new Date(dateRange.arrival.replace(pattern, '$3-$2-$1')).getTime();
    const lastDay = new Date(dateRange.departure.replace(pattern, '$3-$2-$1')).getTime();
    return (lastDay - firstDay) / (24 * 3600 * 1000);
  };

  const calcCostForDays = (): number => {
    const daysInHotel = calcDays();
    return daysInHotel * cost;
  };

  const displayCostForDays = (): string => {
    const costForStaying = calcCostForDays();
    return displayCost(costForStaying);
  };

  const displaySign = (): string => {
    const daysInHotel = calcDays();
    const sign = setSign(daysInHotel);
    return `${daysInHotel} ${sign}`;
  };

  const handleDatesOfStayChange = (dates: DatesOfStay) => {
    setDateRange({
      arrival: dates.arrival,
      departure: dates.departure,
    });
  };

  const displayTotalCost = () => {
    const costSum: number = calcCostForDays() + services.serviceCost + services.extraServiceCost;
    const totalCost: number = costSum - services.discount;
    return displayCost(totalCost);
  };

  return (
    <form className={styles.roomCard} onSubmit={() => console.log('sfsdfsdfsgfdgreb')}>
      <div className={styles.dataRoom}>
        <div>
          <span className={styles.signNumber}>№</span>
          <span className={styles.roomNumber}>{roomNumber}</span>
          <span className={styles.level}>{level}</span>
        </div>
        <div className={styles.costRoom}>
          <span className={styles.cost}>{displayCost(cost)}</span>
          <span className={styles.costText}>в сутки</span>
        </div>
      </div>
      <div className={styles.dates}>
        <DateRange headers={['прибытие', 'выезд']} defaultValues={[new Date(dateRange.arrival), new Date(dateRange.departure)]} isDouble onChange={handleDatesOfStayChange} />
      </div>
      <div className={styles.dropdown}>
        <Dropdown list={guests} placeholder="Сколько гостей" />
      </div>
      <div className={styles.calculator}>
        <div className={styles.costItem}>
          <div className={styles.calc}>{displaySign()}</div>
          <div className={styles.sum}>{displayCostForDays()}</div>
        </div>
        <div className={styles.costItem}>
          <div className={styles.discount}>
            {`Сбор за услуги: скидка ${displayCost(services.discount)}`}
          </div>
          <div className={styles.block}>
            <Tooltip text="С учетом Вашей бонусной карты" />
            <div className={styles.sum}>{`${displayCost(services.serviceCost)}`}</div>
          </div>
        </div>
        <div className={styles.costItem}>
          <div className={styles.calc}>
            Сбор за дополнительные услуги
          </div>
          <div className={styles.block}>
            <Tooltip text="С учетом Вашей бонусной карты" />
            <div className={styles.sum}>{`${displayCost(services.extraServiceCost)}`}</div>
          </div>
        </div>
      </div>
      <div className={styles.total}>
        <div className={styles.finalTitle}>Итого</div>
        <div className={styles.points} />
        <div className={styles.final}>{displayTotalCost()}</div>
      </div>
      <button type="submit" className={styles.button}>
        <Reference type="directed" size="big" text="забронировать" />
      </button>
    </form>
  );
};

export default ReservationCard;
export type { Service };
