import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import RoomCard from 'Components/RoomCard/RoomCard';

import styles from './pagination.module.scss';

type RoomReviews = {
  bad?: number,
  satisfactory?: number,
  good?: number,
  amazing?: number,
};

type RoomImage = {
  alt: string,
  src: string,
};

type RoomType = {
  room: number,
  isLux: boolean,
  cost: number,
  reviews: RoomReviews,
  imagesPreview: Array<RoomImage>
  images: Array<RoomImage>
};

type PaginationProps = {
  allItems: Array<RoomType>,
  itemsPerPage: number,
  onChange?: (pageNumber: number) => void
};

const calcAmountReviews = (reviews: RoomReviews) => (
  Object.values(reviews).reduce((previewVal, currentVal) => previewVal + currentVal)
);

const calcAmountStars = (reviews: RoomReviews) => {
  const sum = Object.values(reviews).reduce((previewVal, currentVal, index) => (
    previewVal + currentVal * (index + 1)
  ));

  return Math.floor(sum / 5 + 0.5);
};

const Pagination = (props: PaginationProps) => {
  const { allItems, itemsPerPage, onChange } = props;
  const [currentPage, setCurrentPage] = useState(0);

  const pagesTotal = Math.ceil(allItems.length / itemsPerPage);
  const startPosition = itemsPerPage * currentPage;

  const handlePageClick = (page: { selected: number }) => {
    setCurrentPage(page.selected);
    if (onChange) onChange(page.selected);
  };

  const displayItems = allItems
    .slice(startPosition, startPosition + itemsPerPage)
    .map((item) => (
      <div key={item.room}>
        <RoomCard
          roomNumber={item.room}
          isLux={item.isLux}
          cost={item.cost}
          amountReviews={calcAmountReviews(item.reviews)}
          images={item.imagesPreview}
          href={`/rooms/${item.room}`}
          amountStar={calcAmountStars(item.reviews)}
        />
      </div>

    ));

  const displaySign = () => {
    const totalItems: number = allItems.length;
    const shownTotalItems: string = totalItems < 100 ? totalItems.toString() : '100+';
    const from: number = startPosition + 1;
    let to: number;
    if (currentPage + 1 === pagesTotal) {
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
    <>
      <ul className={styles.list}>
        {displayItems}
      </ul>
      <ReactPaginate
        pageCount={pagesTotal}
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
  );
};

export default Pagination;
