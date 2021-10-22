import { useState } from 'react';

import convertNumToWordform from 'Root/utils/convertNumToWordform';

import Comment from 'Components/Comment/Comment';

import styles from './comments.module.scss';

type CommentsProps = {
  comments: Array<{
    srcIcon: string,
    userName: string,
    date: string,
    text: string,
    like: { amountLike: number; isLiked: boolean },
    name: string,
    onChange?: (amountLike: number, isLiked: boolean, name: string) => void,
  }>,
  onChange?: (amountLike: number, isLiked: boolean, name: string) => void,
};

const Comments = (props: CommentsProps) => {
  const { comments, onChange } = props;

  const [commentList, setCommentList] = useState(comments);

  const handleCommentChange = (amountLike: number, isLiked: boolean, name: string) => {
    setCommentList(() => {
      const newCommentList = { ...commentList };

      Object.keys(newCommentList).forEach((item) => {
        const itemNumber: number = Number(item);
        if (newCommentList[itemNumber].name === name) {
          newCommentList[itemNumber].like.amountLike = amountLike;
          newCommentList[itemNumber].like.isLiked = isLiked;
        }
      });

      if (onChange) {
        onChange(amountLike, isLiked, name);
      }

      return newCommentList;
    });
  };

  return (
    <div className={styles.comments}>
      <div className={styles.header}>
        <h2 className={styles.title}>Отзывы посетителей номера</h2>
        <span className={styles.amountComments}>{`${comments.length} ${convertNumToWordform(comments.length, ['отзыв', 'отзыва', 'отзывов'])}`}</span>
      </div>
      <div className={styles.content}>
        {comments.map((comment, index) => {
          const like = {
            ...comment.like,
            name: `comment-${index + 1}`,
          };
          return (
            <div className={styles.comment}>
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
