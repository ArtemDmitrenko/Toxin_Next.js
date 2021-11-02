import { useState, useEffect, ReactNode } from 'react';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from '@firebase/firestore';

import Firebase from 'Root/utils/Firebase';
import convertNumToWordform from 'Root/utils/convertNumToWordform';
import RoomCard from 'Components/RoomCard/RoomCard';
import LoadingSpinner from 'Components/LoadingSpinner/LoadingSpinner';

import styles from './pagination.module.scss';

type RoomReviews = {
  terrible?: number,
  bad?: number,
  satisfactory?: number,
  good?: number,
  amazing?: number,
};

type PaginationProps = {
  limit: number,
  onChange?: (pageNumber: number) => void
};

const calcAmountReviews = (reviews: RoomReviews) => (
  Object.values(reviews).reduce((previewVal, currentVal) => previewVal + currentVal)
);

const calcAmountStars = (reviews: RoomReviews) => {
  const sum = Object.entries(reviews).reduce((accumulator, [key, value]) => {
    const collection: { [key: string]: number } = {
      terrible: 1,
      bad: 2,
      satisfactory: 3,
      good: 4,
      amazing: 5,
    };

    const coef = collection[key] ?? 0;

    return accumulator + value * coef;
  }, 0);

  return Math.floor(sum / calcAmountReviews(reviews) + 0.5);
};

type PageState = {
  viewPages: number,
  totalPages: number,
  endDataPoint?: QueryDocumentSnapshot<DocumentData>,
};

const Pagination = (props: PaginationProps) => {
  const { limit, onChange } = props;

  const [page, setPage] = useState<PageState>({
    viewPages: 1,
    totalPages: 1,
  });

  const [loading, setLoading] = useState({
    initial: true,
    additional: false,
  });

  const [rooms, setRooms] = useState<Array<ReactNode>>([]);

  const convertSnapshotToJSX = (snapshot: QuerySnapshot<DocumentData>) => {
    const roomsJSX: Array<ReactNode> = [];

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
    const fetchRooms = async () => {
      let snapshot: QuerySnapshot<DocumentData>;

      if (page.endDataPoint === undefined) {
        snapshot = await Firebase.getRooms({ documentsLimit: limit });
      } else {
        snapshot = await Firebase.getRooms({
          documentsLimit: limit,
          documentPoint: page.endDataPoint,
        });
      }

      const newTotalPages = (Math.ceil(await Firebase.getFullSize()) / limit);

      setRooms((prevState) => ([...prevState, ...convertSnapshotToJSX(snapshot)]));
      setPage((prevState) => ({
        ...prevState,
        totalPages: newTotalPages,
        endDataPoint: snapshot.docs[snapshot.docs.length - 1],
      }));
      setLoading({ additional: false, initial: false });
    };

    fetchRooms();
  }, [page.viewPages]);

  const handlePageClick = () => {
    const newViewPages = page.viewPages + 1;

    if (newViewPages > page.totalPages) return;

    setPage((prevState) => ({ ...prevState, viewPages: newViewPages }));
    setLoading((prevState) => ({ ...prevState, additional: true }));

    if (onChange) onChange(newViewPages);
  };

  const stylesLoadButton = () => (
    `${styles.showMore} ${page.viewPages === page.totalPages ? styles.showMoreHidden : ''}`
  );

  return (
    loading.initial ? (
      <LoadingSpinner />
    ) : (
      <>
        <ul className={styles.list}>
          {rooms}
        </ul>
        <div className={styles.pagination}>
          {
            loading.additional ? (
              <LoadingSpinner />
            ) : (
              <button
                type="button"
                className={stylesLoadButton()}
                onClick={handlePageClick}
              >
                {`Показать еще
                (${page.viewPages}
                  ${convertNumToWordform(page.viewPages, [
                  'страница',
                  'страницы',
                  'страниц',
                ])} из 
                ${page.totalPages})`}
              </button>
            )
          }
        </div>
      </>
    )
  );
};

export default Pagination;
