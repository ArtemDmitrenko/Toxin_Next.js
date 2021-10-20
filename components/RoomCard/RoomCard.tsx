import Link from 'next/link';

import CarouselImages from 'Components/CarouselImages/CarouselImages';

import styles from './roomCard.module.scss';

type RoomCardProps = {
  roomNumber: number,
  alt?: string,
  level?: string,
  cost: number,
  amountReviews: number,
  images: Array<{ id: number, src: string }>,
  href: string,
  amountStar: number,
};

const RoomCard = (props: RoomCardProps) => {
  const {
    roomNumber = 100,
    alt = String(roomNumber),
    level,
    cost = 1000,
    amountReviews = 0,
    images,
    href,
    amountStar,
  } = props;
  const rating = [1, 2, 3, 4, 5];

  return (
    <div className={styles.roomCard}>
      <CarouselImages data={{ images, alt }} />
      <div className={styles.description}>
        <div className={styles.dataRoom}>
          <Link href={href} passHref key={roomNumber}>
            <a className={styles.linkRoom} href="replace">
              <span className={styles.signNumber}>№</span>
              <span className={styles.number}>{roomNumber}</span>
              <span className={styles.level}>{level}</span>
            </a>
          </Link>
          <div className={styles.costRoom}>
            <span className={styles.cost}>{`${cost}`}</span>
            <span className={styles.costText}>в сутки</span>
          </div>
        </div>
        <div className={styles.reviews}>
          <div className={styles.rating}>
            {rating.map((item, index) => (
              index < amountStar ? (
                <span className={`${styles.signStar} ${styles.filledStar}`} key={item} />
              ) : (
                <span className={`${styles.signStar} ${styles.borderedStar}`} key={item} />
              )
            ))}
          </div>
          <div className={styles.amountReviews}>
            <span className={styles.amount}>{amountReviews}</span>
            <span className={styles.amountText}>Отзывов</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
