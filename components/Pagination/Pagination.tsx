import { useState, useEffect, ReactNode } from 'react';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from '@firebase/firestore';

import Firebase from 'Root/api/Firebase';
import convertNumToWordform from 'Root/utils/convertNumToWordform';
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
      const snapshot = await Firebase.getRooms({ documentsLimit: limit });

      const totalItems = await Firebase.getFullSize();
      const newTotalPages = Math.ceil(totalItems / limit);

      setRooms(convertSnapshotToJSX(snapshot));
      setPage((prevState) => ({
        ...prevState,
        totalPages: newTotalPages,
        endDataPoint: snapshot.docs[snapshot.docs.length - 1],
      }));
      setLoading((prevState) => ({ ...prevState, initial: false }));
    };

    fetchRooms();

    return () => {
      setRooms([]);
      setPage({
        viewPages: 1,
        totalPages: 1,
      });
      setLoading({
        initial: true,
        additional: false,
      });
    };
  }, []);

  useEffect(() => {
    if (page.endDataPoint === undefined) return;

    const fetchRooms = async () => {
      const snapshot = await Firebase.getRooms({
        documentsLimit: limit,
        documentPoint: page.endDataPoint,
      });

      setRooms((prevState) => ([...prevState, ...convertSnapshotToJSX(snapshot)]));
      setPage((prevState) => ({
        ...prevState,
        endDataPoint: snapshot.docs[snapshot.docs.length - 1],
      }));
      setLoading((prevState) => ({ ...prevState, additional: false }));
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

  const stylesPagination = () => (
    `${styles.pagination} ${page.viewPages === page.totalPages ? styles.paginationHidden : ''}`
  );

  return (
    loading.initial ? (
      <LoadingSpinner />
    ) : (
      <>
        <ul className={styles.list}>
          {rooms}
        </ul>
        <div className={stylesPagination()}>
          {
            loading.additional ? (
              <LoadingSpinner />
            ) : (
              <Reference
                isButton
                buttonType="button"
                text={`Показать еще
                (${page.viewPages}
                  ${convertNumToWordform(page.viewPages, [
                  'страница',
                  'страницы',
                  'страниц',
                ])} из 
                ${page.totalPages})`}
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
