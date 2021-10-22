import Image from 'next/image';

import convertNumToWordform from 'Root/utils/convertNumToWordform';
import Like from 'Components/Like/Like';

import styles from './comment.module.scss';

type CommentProps = {
  srcIcon: string,
  userName: string,
  date: string,
  text: string,
  name: string,
  like: { amountLike: number; isLiked: boolean, name: string }
  onChange?: (amountLike: number, isLiked: boolean, name: string) => void,
};

const Comment = (props: CommentProps) => {
  const {
    srcIcon,
    userName,
    date,
    text,
    like,
    name,
    onChange,
  } = props;

  const dateComment = new Date(date).getTime();
  const currentDate = Date.now();
  const amountDays = Math.floor((currentDate - dateComment) / 86400000);

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
        <Image src={srcIcon} alt={userName} width={45} height={45} />
        <div className={styles.user}>
          <span className={styles.userName}>{userName}</span>
          <span>{makeDateString()}</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.like}>
          <Like
            amountLike={like.amountLike}
            isLiked={like.isLiked}
            name={name}
            onChange={onChange}
          />
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
export type { CommentProps };
