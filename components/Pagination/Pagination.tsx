import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

type RoomCard = {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
};

type PaginationProps = {
  allItems: Array<RoomCard>,
  itemsPerPage: number
};

const Pagination = (props: PaginationProps) => {
  const { allItems, itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState(0);

  const pagesTotal = Math.ceil(allItems.length / itemsPerPage);
  const startPosition = itemsPerPage * currentPage;

  const handlePageClick = (page: { selected: number }) => {
    setCurrentPage(page.selected);
  };

  const displayItems = allItems
    .slice(startPosition, startPosition + itemsPerPage)
    .map((item) => (
      <li key={item.id}>
        <img src={item.thumbnailUrl} alt="room" />
      </li>
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
    <div>
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
    </div>
  );
};

export default Pagination;
