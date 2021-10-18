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
  mockJSON: Array<RoomCard>,
  itemsPerPage: number
};

const Pagination = (props: PaginationProps) => {
  const { mockJSON, itemsPerPage } = props;
  const [curNumber, setCurNumber] = useState(0);

  const allItems = mockJSON.slice(0, 150);
  const pagesTotal = Math.ceil(allItems.length / itemsPerPage);
  const pagesVisited = itemsPerPage * curNumber;

  const handlePageClick = (page: { selected: number }) => {
    setCurNumber(page.selected);
  };

  const displayItems = allItems
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => (
      <li key={item.id}>
        <img src={item.thumbnailUrl} alt="room" />
      </li>
    ));

  const previousClasses = () => (
    `${styles.buttonArrow} ${styles.previous} ${curNumber === 0 ? styles.hide : ''}`
  );

  const nextClasses = () => (
    `${styles.buttonArrow} ${styles.next} ${curNumber === itemsPerPage ? styles.hide : ''}`
  );

  return (
    <div>
      <ul className={styles.list}>
        {displayItems}
      </ul>
      <ReactPaginate
        pageCount={pagesTotal}
        initialPage={curNumber}
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
    </div>
  );
};

export default Pagination;
