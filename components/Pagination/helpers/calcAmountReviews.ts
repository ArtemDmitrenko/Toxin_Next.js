import RoomReviews from './RoomReviews';

const calcAmountReviews = (reviews: RoomReviews) => (
  Object.values(reviews).reduce((previewVal, currentVal) => previewVal + currentVal)
);

export default calcAmountReviews;
