import RoomReviews from './RoomReviews';
import calcAmountReviews from './calcAmountReviews';

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

export default calcAmountStars;
