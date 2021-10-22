import convertNumToWordform from 'Root/utils/convertNumToWordform';

import Comment from 'Components/Comment/Comment';

import styles from './comments.module.scss';

type CommentsProps = {
  comments: Array<{
    srcIcon: string,
    userName: string,
    date: string,
    text: string,
    like: { amountLike: number; isLiked: boolean }
    onChange?: (amountLike: number, isLiked: boolean) => void,
  }>
};

const Comments = (props: CommentsProps) => {
  const { comments } = props;
  return (
    <div className={styles.comments}>
      <div className={styles.header}>
        <h2 className={styles.title}>Отзывы посетителей номера</h2>
        <span className={styles.amountComments}>{`${comments.length} ${convertNumToWordform(comments.length, ['отзыв', 'отзыва', 'отзывов'])}`}</span>
      </div>
      <div className={styles.content}>
        {comments.map((comment) => (
          <div className={styles.comment}>
            <Comment
              srcIcon={comment.srcIcon}
              userName={comment.userName}
              date={comment.date}
              text={comment.text}
              like={comment.like}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
