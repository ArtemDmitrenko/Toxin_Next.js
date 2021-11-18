import { useState, useEffect } from 'react';

import convertNumToWordform from 'Root/utils/convertNumToWordform';
import Comment, { CommentProps } from 'Components/Comment/Comment';
import { LikeData } from 'Components/Like/Like';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';
import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';
import { commentRequest } from 'Root/redux/like/likeActions';

import styles from './comments.module.scss';

type CommentsProps = {
  room: number,
  comments: Array<CommentProps>
  onChange?: (room: number, index: number, comment: CommentProps) => void
};

const Comments = (props: CommentsProps) => {
  const { room, comments, onChange } = props;
  const roomNumber = String(room);
  console.log('roomNumber comments', roomNumber);

  const dispatch = useAppDispatch();

  const dataComments: FirebaseDocumentType = useAppSelector((store) => store.comment);
  console.log('data', dataComments);

  const { userId }: { userId: string | null } = useAppSelector(
    (state) => state.auth,
  );

  const [commentsList, setCommentList] = useState(comments);

  const handleCommentChange = (index: number, data: LikeData) => {
    dispatch(commentRequest({ roomNumber }));

    const newCommentList = [...commentsList];

    newCommentList[index].likes = data.likeArray;

    if (onChange) {
      onChange(room, index, newCommentList[index]);
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
          <div className={styles.comment} key={comment.srcIcon}>
            <Comment
              srcIcon={comment.srcIcon}
              userName={comment.userName}
              date={comment.date}
              text={comment.text}
              likes={comment.likes}
              onChange={(data: LikeData) => handleCommentChange(index, data)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
