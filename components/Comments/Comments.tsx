import { useState } from 'react';

import convertNumToWordform from 'Root/utils/convertNumToWordform';
import Comment, { CommentProps } from 'Components/Comment/Comment';
import { LikeData } from 'Components/Like/Like';

import styles from './comments.module.scss';

type CommentsProps = {
  comments: Array<CommentProps>
  onChange?: (commentList: Array<CommentProps>) => void
};

const Comments = (props: CommentsProps) => {
  const { comments, onChange } = props;

  const [commentsList, setCommentList] = useState(comments);

  const handleCommentChange = (data: LikeData) => {
    const newCommentList = [...commentsList];

    Object.keys(newCommentList).forEach((item) => {
      const itemNumber: number = Number(item);
      if (newCommentList[itemNumber].name === data.name) {
        newCommentList[itemNumber].like.amountLike = data.amountLike;
        newCommentList[itemNumber].like.isLiked = data.isLiked;
      }
    });

    if (onChange) {
      onChange(newCommentList);
    }

    setCommentList(newCommentList);
  };

  return (
    <div className={styles.comments}>
      <div className={styles.header}>
        <h2 className={styles.title}>Отзывы посетителей номера</h2>
        <span className={styles.amountComments}>{`${commentsList.length} ${convertNumToWordform(commentsList.length, ['отзыв', 'отзыва', 'отзывов'])}`}</span>
      </div>
      <div className={styles.content}>
        {commentsList.map((comment, index) => {
          const like = {
            ...comment.like,
            name: `comment-${index + 1}`,
          };
          return (
            <div className={styles.comment} key={comment.srcIcon}>
              <Comment
                srcIcon={comment.srcIcon}
                userName={comment.userName}
                date={comment.date}
                text={comment.text}
                like={like}
                name={`comment-${index + 1}`}
                onChange={handleCommentChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
