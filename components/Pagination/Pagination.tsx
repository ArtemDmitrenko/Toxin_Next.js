import { useState } from 'react';

import ReactPaginate from 'react-paginate';

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

  const allItems = mockJSON.slice(0, 2);
  const pagesTotal = Math.ceil(allItems.length / itemsPerPage);
  const pagesVisited = itemsPerPage * curNumber;

  const handlePageClick = (page: { selected: number }) => {
    setCurNumber(page.selected);
  };

  const displayItems = allItems
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => (
      <li key={item.id}>
        <img src={item.url} alt="room" />
      </li>
    ));

  return (
    <div>
      <ul>
        {displayItems}
      </ul>
      <ReactPaginate
        pageCount={pagesTotal}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default Pagination;
