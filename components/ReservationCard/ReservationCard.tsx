import { useState } from 'react';

import DateRange, { DatesOfStay } from 'Components/DateRange/DateRange';
import Dropdown, { DropdownConfig } from 'Components/Dropdown/Dropdown';
import Reference from 'Components/Reference/Reference';
import Tooltip from 'Components/Tooltip/Tooltip';

import formatSign from './helpers/formatSign';
import formatCost from './helpers/formatCost';

import styles from './reservationCard.module.scss';

type Service = {
  discount: number,
  serviceCost: number,
  extraServiceCost: number
};

type ReservationCardData = {
  roomNumber: number,
  level?: string,
  cost: number,
  numberOfGuests: { guests: number, babies: number },
  datesOfStay: DatesOfStay,
  service: Service,
};

type ReservationCardProps = {
  roomNumber: number,
  level?: string,
  cost: number,
  guests: DropdownConfig,
  datesOfStay: DatesOfStay,
  service: Service,
  onSubmit: (data: ReservationCardData) => void,
};

const ReservationCard = (props: ReservationCardProps) => {
  const {
    roomNumber,
    level,
    cost,
    guests,
    datesOfStay,
    service,
    onSubmit,
  } = props;

  const [dateRange, setDateRange] = useState({
    arrival: datesOfStay.arrival,
    departure: datesOfStay.departure,
  });

  const numberOfGuestsState = (): { guests: number, babies: number } => {
    const adults: number = guests[0].defaultValue || 0;
    const children: number = guests[1].defaultValue || 0;
    const babies: number = guests[2].defaultValue || 0;
    return {
      guests: adults + children,
      babies,
    };
  };

  const [numberOfGuests, setNumberOfGuests] = useState(numberOfGuestsState());

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

  const formatCostForDays = (): string => {
    const costForStaying = calcCostForDays();
    return formatCost(costForStaying);
  };

  const displaySign = (): string => {
    const daysInHotel = calcDays();
    const sign = formatSign(daysInHotel);
    return `${daysInHotel} ${sign}`;
  };

  const handleDatesOfStayChange = (dates: DatesOfStay) => {
    setDateRange({
      arrival: dates.arrival,
      departure: dates.departure,
    });
  };

  const displayTotalCost = () => {
    const costSum: number = calcCostForDays() + service.serviceCost + service.extraServiceCost;
    const totalCost: number = costSum - service.discount;
    return formatCost(totalCost);
  };

  const handleNumberOfGuestChange = (data: { guests: number, babies: number }) => {
    setNumberOfGuests(data);
  };

  const handleSubmit = () => {
    const reservationCardData: ReservationCardData = {
      datesOfStay: dateRange,
      numberOfGuests,
      roomNumber,
      level,
      cost,
      service,
    };
    onSubmit(reservationCardData);
  };

  return (
    <form className={styles.roomCard}>
      <div className={styles.dataRoom}>
        <div>
          <span className={styles.signNumber}>№</span>
          <span className={styles.roomNumber}>{roomNumber}</span>
          <span className={styles.level}>{level}</span>
        </div>
        <div className={styles.costRoom}>
          <span className={styles.cost}>{formatCost(cost)}</span>
          <span className={styles.costText}>в сутки</span>
        </div>
      </div>
      <div className={styles.dates}>
        <DateRange
          headers={['прибытие', 'выезд']}
          defaultValues={[new Date(dateRange.arrival), new Date(dateRange.departure)]}
          isDouble
          onChange={handleDatesOfStayChange}
        />
      </div>
      <div className={styles.dropdown}>
        <Dropdown
          list={guests}
          placeholder="Сколько гостей"
          onChange={handleNumberOfGuestChange}
        />
      </div>
      <div className={styles.calculator}>
        <div className={styles.costItem}>
          <div className={styles.calc}>{displaySign()}</div>
          <div className={styles.sum}>{formatCostForDays()}</div>
        </div>
        <div className={styles.costItem}>
          <div className={styles.discount}>
            {`Сбор за услуги: скидка ${formatCost(service.discount)}`}
          </div>
          <div className={styles.block}>
            <Tooltip text="С учетом Вашей бонусной карты" />
            <div className={styles.sum}>{`${formatCost(service.serviceCost)}`}</div>
          </div>
        </div>
        <div className={styles.costItem}>
          <div className={styles.calc}>
            Сбор за дополнительные услуги
          </div>
          <div className={styles.block}>
            <Tooltip text="С учетом Вашей бонусной карты" />
            <div className={styles.sum}>{`${formatCost(service.extraServiceCost)}`}</div>
          </div>
        </div>
      </div>
      <div className={styles.total}>
        <div className={styles.finalTitle}>Итого</div>
        <div className={styles.points} />
        <div className={styles.final}>{displayTotalCost()}</div>
      </div>
      <Reference
        type="directed"
        size="big"
        text="забронировать"
        href="https://www.mock-link.com/"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default ReservationCard;
export type { Service };
