import { useEffect } from 'react';
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import convertNumToWordform from 'Root/utils/convertNumToWordform';
import { requestRooms, setCurrentPage } from 'Root/redux/rooms/roomsActions';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';

import { SearchFilterState } from 'Components/SearchFilter/SearchFilter';
import RoomCard from 'Components/RoomCard/RoomCard';
import LoadingSpinner from 'Components/LoadingSpinner/LoadingSpinner';

import calcAmountReviews from './helpers/calcAmountReviews';
import calcAmountStars from './helpers/calcAmountStars';

import styles from './pagination.module.scss';

type PaginationProps = {
  limit: number,
  filterConstraints?: SearchFilterState,
  onChange?: (pageNumber: number) => void
};

const Pagination = (props: PaginationProps) => {
  const { limit, onChange, filterConstraints } = props;

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
    dispatch(requestRooms({ limit, filterConstraints }));
  }, [filterConstraints]);

  const stylesButton = (isActive: boolean) => {
    const style: Array<string> = [styles.button];

    if (isActive) style.push(styles.buttonActive);

    return style.join(' ');
  };

  const stylesNextButton = () => {
    const style = [styles.button, styles.buttonToggle, styles.buttonNext];

    if (roomsStore.currentPage === roomsStore.totalPages) style.push(styles.hide);

    return style.join(' ');
  };

  const stylesPrevButton = () => {
    const style = [styles.button, styles.buttonToggle, styles.buttonPrev];

    if (roomsStore.currentPage === 1) style.push(styles.hide);

    return style.join(' ');
  };

  const handlePageClick = (newPage: number) => {
    const newPageIsValid = newPage <= roomsStore.totalPages && newPage >= 1;

    if (!newPageIsValid) return;

    dispatch(setCurrentPage({ newCurrentPage: newPage }));

    if (onChange) onChange(roomsStore.currentPage);
  };

  const generatePagesRefs = () => {
    const elements: Array<JSX.Element> = [];
    for (let i = 0; i < roomsStore.totalPages; i += 1) {
      elements.push(
        <button
          type="button"
          onClick={() => { handlePageClick(i + 1); }}
          className={stylesButton(i + 1 === roomsStore.currentPage)}
        >
          {i + 1}
        </button>,
      );
    }

    return elements;
  };

  return (
    roomsStore.loadingInit ? (
      <LoadingSpinner />
    ) : (
      <>
        <ul className={styles.list}>
          {roomsStore.rooms.length
            && convertSnapshotToJSX(roomsStore.rooms[roomsStore.currentPage - 1])}
        </ul>
        {!roomsStore.totalPages && (
          <p> По вашему запросу ничего не найдено </p>
        )}
        <div className={styles.wrapper}>
          <div className={styles.pagesNavigation}>
            <button
              type="button"
              className={stylesPrevButton()}
              onClick={() => { handlePageClick(roomsStore.currentPage - 1); }}
            />
            {generatePagesRefs()}
            <button
              type="button"
              className={stylesNextButton()}
              onClick={() => { handlePageClick(roomsStore.currentPage + 1); }}
            />
          </div>
          <p className={styles.paragraph}>
            {roomsStore.rooms[roomsStore.currentPage - 1] && (
              `${limit * (roomsStore.currentPage - 1) + 1}
              – ${limit * (roomsStore.currentPage - 1)
              + roomsStore.rooms[roomsStore.currentPage - 1].length}
              из ${roomsStore.size} 
              ${convertNumToWordform(roomsStore.size, ['вариант', 'варианта', 'вариантов'])} аренды`
            )}
          </p>
        </div>
      </>
    )
  );
};

export default Pagination;
