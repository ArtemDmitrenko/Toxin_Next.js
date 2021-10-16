import CarouselImages from 'Components/CarouselImages/CarouselImages';
import Link from 'next/dist/client/link';

import styles from './roomCard.module.scss';

type RoomCardProps = {
  card: {
    number: string,
    level?: string,
    cost: string,
    amountReviews: string,
    images: Array<{ id: number, src: StaticImageData }>,
    href: string,
    amountStar: number,
  }
};

const RoomCard = (props: RoomCardProps) => {
  const { card } = props;
  const {
    number = '100',
    level,
    cost = '1000',
    amountReviews = '0',
    images,
    href,
    amountStar,
  } = card;
  const rating = [1, 2, 3, 4, 5];

  return (
    <div className={styles.roomCard}>
      <CarouselImages data={{ images, number }} />
      <div className={styles.description}>
        <div className={styles.dataRoom}>
          <Link href={href} key={number}>
            <a className={styles.linkRoom} href={href}>
              <span className={styles.signNumber}>№</span>
              <span className={styles.number}>{number}</span>
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
            {rating.map((_item, index) => (
              index < amountStar ? (
                <span className={styles.signStar}>star</span>
              ) : (
                <span className={styles.signStar}>star_border</span>
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
