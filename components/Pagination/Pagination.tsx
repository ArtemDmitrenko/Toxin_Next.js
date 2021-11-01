import { useState, useEffect, ReactNode } from 'react';
import ReactPaginate from 'react-paginate';

import Firebase from 'Root/utils/Firebase';
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

// type RoomImage = {
//   alt: string,
//   src: string,
// };

// type RoomType = {
//   room: number,
//   level: string,
//   cost: number,
//   reviews: RoomReviews,
//   images: Array<RoomImage>
// };

type PaginationProps = {
  itemsPerPage: number,
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

const Pagination = (props: PaginationProps) => {
  const { itemsPerPage, onChange } = props;

  const [totalItems, setTotalItems] = useState(0); // объединить в один стейт?
  const [totalPages, setTotalPages] = useState(0); // объединить в один стейт?
  const [currentPage, setCurrentPage] = useState(0); // объединить в один стейт?
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<ReactNode>([]);

  useEffect(() => { // side-effect определения общего количества элементов и страниц
    const fetchSize = async () => {
      setTotalItems(await Firebase.getFullSize());

      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    };

    fetchSize();
  }, []);

  useEffect(() => { // side-effect для получения номеров на текующую страницу
    const fetchRooms = async () => {
      const snapshot = await Firebase.getRooms(itemsPerPage * currentPage, itemsPerPage);

      const roomsJSX: Array<ReactNode> = [];

      snapshot.forEach((item) => {
        const room = item.data();

        roomsJSX.push(
          <div key={room.room}>
            <RoomCard
              roomNumber={room.room}
              level={room.level}
              cost={room.cost}
              amountReviews={calcAmountReviews(room.reviews)}
              images={room.images}
              href={`/rooms/${room.room}`}
              amountStar={calcAmountStars(room.reviews)}
            />
          </div>,
        );
      });

      setRooms(roomsJSX);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const handlePageClick = (page: { selected: number }) => {
    setCurrentPage(page.selected);
    if (onChange) onChange(page.selected);
  };

  const displaySign = () => {
    const shownTotalItems: string = totalItems < 100 ? totalItems.toString() : '100+';
    const from: number = itemsPerPage * currentPage + 1;
    let to: number;
    if (currentPage + 1 === totalPages) {
      to = totalItems;
    } else {
      to = totalItems < itemsPerPage ? totalItems : itemsPerPage * (currentPage + 1);
    }
    return `${from} – ${to} из ${shownTotalItems} вариантов аренды`;
  };

  const previousClasses = () => (
    `${styles.buttonArrow} ${styles.previous} ${currentPage === 0 ? styles.hide : ''}`
  );

  const nextClasses = () => (
    `${styles.buttonArrow} ${styles.next} ${currentPage === itemsPerPage ? styles.hide : ''}`
  );

  return (
    loading ? (
      <LoadingSpinner />
    ) : (
      <>
        <ul className={styles.list}>
          {rooms}
        </ul>
        <ReactPaginate
          pageCount={totalPages}
          initialPage={currentPage}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel=""
          nextLabel=""
          previousLinkClassName={previousClasses()}
          nextLinkClassName={nextClasses()}
          pageClassName={styles.page}
          onPageChange={handlePageClick}
          containerClassName={styles.container}
          breakClassName={styles.break}
          activeClassName={styles.active}
          pageLinkClassName={styles.link}
          breakLinkClassName={styles.break}
        />
        <p className={styles.sign}>{displaySign()}</p>
      </>
    )
  );
};

// export type { RoomType };
export default Pagination;
