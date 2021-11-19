import Image from 'next/image';

import convertNumToWordform from 'Root/utils/convertNumToWordform';
import Like, { LikeData } from 'Components/Like/Like';

import styles from './comment.module.scss';

type CommentProps = {
  userId: string,
  date: Date,
  text: string,
  likes: string[]
  onChange?: (data: LikeData) => void,
};

const Comment = (props: CommentProps) => {
  const {
    userId,
    date,
    text,
    likes,
    onChange,
  } = props;

  const dateComment = date.toDate();

  const currentDate = Date.now();
  const amountDays = Math.floor((currentDate - dateComment) / 86400000);

  const handleLikeChange = (data: LikeData) => {
    if (onChange) {
      onChange(data);
    }
  };

  const makeDateString = () => {
    const month = Math.floor(amountDays / 30);
    const year = Math.floor(amountDays / 365);
    if (amountDays === 0) {
      return 'сегодня';
    } if (amountDays < 31) {
      return `${amountDays} ${convertNumToWordform(amountDays, ['день', 'дня', 'дней'])} назад`;
    } if (amountDays > 30 && amountDays < 365) {
      return `${month} ${convertNumToWordform(month, ['месяц', 'месяца', 'месяцев'])} назад`;
    }
    return `${year} ${convertNumToWordform(year, ['год', 'года', 'лет'])} назад`;
  };

  return (
    <div className={styles.comment}>
      <div className={styles.info}>
        <Image src={'/'} alt={userId} width={45} height={45} />
        <div className={styles.user}>
          <span className={styles.userName}>{userId}</span>
          <span>{makeDateString()}</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.like}>
          <Like
            likeArray={likes}
            onChange={handleLikeChange}
          />
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export type { CommentProps };
export default Comment;
