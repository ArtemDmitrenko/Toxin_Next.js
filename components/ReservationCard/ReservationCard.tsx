import { useState } from 'react';
import Link from 'next/link';

import { useAppSelector } from 'Root/redux/hooks';
import convertNumToWordform from 'Root/utils/convertNumToWordform';
import DateRange, { DatesOfStay } from 'Components/DateRange/DateRange';
import Dropdown, { DropdownConfig, DropdownData } from 'Components/Dropdown/Dropdown';
import Reference from 'Components/Reference/Reference';
import Tooltip from 'Components/Tooltip/Tooltip';
import Message from 'Components/Message/Message';

import formatCost from './helpers/formatCost';
import calcDays from './helpers/calcDays';

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
  numberOfGuests: DropdownData,
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

  const { isAuth } = useAppSelector((store) => store.auth);

  const [dateRange, setDateRange] = useState({
    arrival: datesOfStay.arrival,
    departure: datesOfStay.departure,
  });

  const [numberOfGuests, setNumberOfGuests] = useState<DropdownData>({});

  const calcCostForDays = (): number => {
    const daysInHotel = calcDays(dateRange);
    return daysInHotel * cost;
  };

  const formatCostForDays = (): string => {
    const costForStaying = calcCostForDays();
    return formatCost(costForStaying);
  };

  const displaySign = (): string => {
    const daysInHotel = calcDays(dateRange);
    const sign = convertNumToWordform(daysInHotel, ['сутки', 'суток', 'суток']);
    return ` x ${daysInHotel} ${sign}`;
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

  const handleNumberOfGuestChange = (data: DropdownData) => {
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
    <form className={styles.reservationCard}>
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
          <div className={styles.calc}>
            <span className={styles.sum}>{formatCost(cost)}</span>
            <span>{displaySign()}</span>
          </div>
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
        isButton
        buttonType="submit"
        type="directed"
        size="big"
        text="забронировать"
        onClick={handleSubmit}
        disabled={!isAuth}
      />
      {!isAuth && (
        <div className={styles.warningMessage}>
          <Message type="warning">
            Для бронирования необходимо
            {' '}
            <b>
              <Link href="/auth/sign-in">
                <a className={styles.link} href="replace">
                  войти в&nbsp;аккаунт
                </a>
              </Link>
            </b>
            !
          </Message>
        </div>
      )}
    </form>
  );
};

export type { Service };
export default ReservationCard;
