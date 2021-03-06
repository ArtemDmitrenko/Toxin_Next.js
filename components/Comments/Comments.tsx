import { useState } from 'react';

import convertNumToWordform from 'Root/utils/convertNumToWordform';
import Comment, { CommentProps } from 'Components/Comment/Comment';
import { LikeData } from 'Components/Like/Like';
import ReviewCard, { ReviewCardData } from 'Components/ReviewCard/ReviewCard';
import { useAppSelector } from 'Root/redux/hooks';

import styles from './comments.module.scss';

type CommentsProps = {
  comments: Array<CommentProps>,
  onChange?: (comments: Array<CommentProps>) => void
  onSubmit: (data: ReviewCardData) => void
};

const Comments = (props: CommentsProps) => {
  const { comments, onChange, onSubmit } = props;

  const [commentsList, setCommentList] = useState(comments);
  const { isAuth } = useAppSelector((state) => state.auth);

  const handleCommentChange = (index: number, data: LikeData) => {
    const newCommentList = [...commentsList];

    newCommentList[index].likes = data.likeArray;

    if (onChange) {
      onChange(newCommentList);
    }

    setCommentList(newCommentList);
  };

  return (
    <div className={styles.comments}>
      <div className={styles.header}>
        <h2 className={styles.title}>Отзывы посетителей номера</h2>
        <span className={styles.amountComments}>
          {`${commentsList.length} 
            ${convertNumToWordform(commentsList.length,
            ['отзыв', 'отзыва', 'отзывов'])}`}
        </span>
      </div>
      <div className={styles.content}>
        {commentsList.map((comment, index) => (
          <div className={styles.comment} key={Number(comment.date)}>
            <Comment
              userId={comment.userId}
              date={comment.date}
              text={comment.text}
              likes={comment.likes}
              onChange={(data: LikeData) => handleCommentChange(index, data)}
            />
          </div>
        ))}
      </div>
      {isAuth && <ReviewCard maxLength={500} onSubmit={onSubmit} />}
    </div>
  );
};

export default Comments;
