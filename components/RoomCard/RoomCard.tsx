import Link from 'next/link';

import convertNumToWordform from 'Root/utils/convertNumToWordform';
import CarouselImages from 'Components/CarouselImages/CarouselImages';

import styles from './roomCard.module.scss';

type RoomCardProps = {
  roomNumber: number,
  level?: string,
  cost: number,
  amountReviews: number,
  images: Array<{
    src: string,
    alt: string
  }>,
  href: string,
  amountStar: number,
};

const RoomCard = (props: RoomCardProps) => {
  const {
    roomNumber = 100,
    level = '',
    cost = 1000,
    amountReviews = 0,
    images,
    href,
    amountStar,
  } = props;
  const rating = [1, 2, 3, 4, 5];

  return (
    <div className={styles.roomCard}>
      <div className={styles.aspectRatio}>
        <div className={styles.imageWrapper}>
          <CarouselImages images={images} />
        </div>
      </div>
      <Link href={href} passHref>
        <a className={styles.linkRoom} href="replace">
          <div className={styles.description}>
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
                <span className={styles.amountText}>
                  {convertNumToWordform(amountReviews, ['отзыв', 'отзыва', 'отзывов'])}
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default RoomCard;
