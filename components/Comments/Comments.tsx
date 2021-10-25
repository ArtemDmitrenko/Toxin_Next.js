import { useState } from 'react';

import convertNumToWordform from 'Root/utils/convertNumToWordform';
import Comment from 'Components/Comment/Comment';
import { LikeData } from 'Components/Like/Like';

import styles from './comments.module.scss';

type CommentType = {
  [key: string]: {
    srcIcon: string,
    userName: string,
    date: string,
    text: string,
    like: { amountLike: number; isLiked: boolean },
    name: string,
    onChange?: (data: LikeData) => void,
  },
};

type CommentsProps = {
  comments: CommentType;
};

const Comments = (props: CommentsProps) => {
  const { comments } = props;

  const [commentList, setCommentList] = useState(comments);

  const handleCommentChange = (data: LikeData) => {
    setCommentList(() => {
      const newCommentList = { ...commentList };

      Object.keys(newCommentList).forEach((item) => {
        const itemNumber: number = Number(item);
        if (newCommentList[itemNumber].name === data.name) {
          newCommentList[itemNumber].like.amountLike = data.amountLike;
          newCommentList[itemNumber].like.isLiked = data.isLiked;
        }
      });

      return newCommentList;
    });
  };

  return (
    <div className={styles.comments}>
      <div className={styles.header}>
        <h2 className={styles.title}>Отзывы посетителей номера</h2>
        <span className={styles.amountComments}>{`${comments.length} ${convertNumToWordform(Object.keys(comments).length, ['отзыв', 'отзыва', 'отзывов'])}`}</span>
      </div>
      <div className={styles.content}>
        {Object.keys(comments).map((key, index) => {
          const like = {
            ...comments[key].like,
            name: `comment-${index + 1}`,
          };
          return (
            <div className={styles.comment} key={comments[key].srcIcon}>
              <Comment
                srcIcon={comments[key].srcIcon}
                userName={comments[key].userName}
                date={comments[key].date}
                text={comments[key].text}
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
