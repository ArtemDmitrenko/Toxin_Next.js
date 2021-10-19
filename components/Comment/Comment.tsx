import styles from './comment.module.scss';

type CommentProps = {
  srcIcon: string,
  userName: string,
  date: string,
  text: string,
  like: { amountLike: number; isLiked: boolean }
};

const Comment = (props: CommentProps) => {
  const {
    srcIcon, userName, date, text, like,
  } = props;
  return (
    <div className={styles.comment}>
      <div className={styles.info}>
        <img className={styles.icon} src={srcIcon} alt={userName} />
        <div className={styles.user}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.date}>{date}</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.like} />
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
