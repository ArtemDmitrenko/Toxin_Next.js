import { useEffect } from 'react';
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import convertNumToWordform from 'Root/utils/convertNumToWordform';
import { requestRooms } from 'Root/redux/rooms/roomsActions';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';

import RoomCard from 'Components/RoomCard/RoomCard';
import LoadingSpinner from 'Components/LoadingSpinner/LoadingSpinner';
import Reference from 'Components/Reference/Reference';

import calcAmountReviews from './helpers/calcAmountReviews';
import calcAmountStars from './helpers/calcAmountStars';

import styles from './pagination.module.scss';

type PaginationProps = {
  limit: number,
  onChange?: (pageNumber: number) => void
};

const Pagination = (props: PaginationProps) => {
  const { limit, onChange } = props;

  const dispatch = useAppDispatch();
  const roomsStore = useAppSelector((store) => store.rooms);

  const convertSnapshotToJSX = (snapshot: Array<QueryDocumentSnapshot<DocumentData>>) => {
    const roomsJSX: Array<JSX.Element> = [];

    snapshot.forEach((item) => {
      const room = item.data();

      roomsJSX.push(
        <li key={room.room}>
          <RoomCard
            roomNumber={room.room}
            level={room.level}
            cost={room.cost}
            amountReviews={calcAmountReviews(room.reviews)}
            images={room.images}
            href={`/rooms/${room.room}`}
            amountStar={calcAmountStars(room.reviews)}
          />
        </li>,
      );
    });

    return roomsJSX;
  };

  useEffect(() => {
    dispatch(requestRooms({ limit }));
  }, []);

  const handlePageClick = () => {
    if (roomsStore.currentPages > roomsStore.totalPages) return;

    dispatch(requestRooms({
      limit,
      endDataPoint: roomsStore.rooms[roomsStore.rooms.length - 1],
    }));

    if (onChange) onChange(roomsStore.currentPages);
  };

  const stylesPagination = () => (
    `${styles.pagination} ${roomsStore.currentPages === roomsStore.totalPages ? styles.paginationHidden : ''}`
  );

  return (
    roomsStore.loadingInit ? (
      <LoadingSpinner />
    ) : (
      <>
        <ul className={styles.list}>
          {roomsStore.rooms && convertSnapshotToJSX(roomsStore.rooms)}
        </ul>
        <div className={stylesPagination()}>
          {
            roomsStore.loadingAdditional ? (
              <LoadingSpinner />
            ) : (
              <Reference
                isButton
                buttonType="button"
                text={`Показать еще
                (${roomsStore.currentPages}
                  ${convertNumToWordform(roomsStore.currentPages, [
                  'страница',
                  'страницы',
                  'страниц',
                ])} из 
                ${roomsStore.totalPages})`}
                type="bordered"
                size="big"
                onClick={handlePageClick}
              />
            )
          }
        </div>
      </>
    )
  );
};

export default Pagination;
