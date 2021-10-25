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

  const handleCommentChange = (commentNumber: number, data: LikeData) => {
    const newCommentList = [...commentsList];
    newCommentList[commentNumber].like = data;

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
                commentNumber={index}
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
