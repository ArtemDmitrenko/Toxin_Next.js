import { Timestamp } from 'firebase/firestore';
import { DatesOfStay } from 'Components/DateRange/DateRange';

const areDateRangesOverlap = (
  primaryRange: DatesOfStay,
  overlapRanges: Array<{
    userId: string,
    from: Timestamp,
    to: Timestamp,
  }>,
) => {
  let areDatesOverlap = false;

  const primaryDates = {
    from: new Date(`${primaryRange.arrival}T00:00:00`).getTime(),
    to: new Date(`${primaryRange.departure}T00:00:00`).getTime(),
  };

  overlapRanges.forEach((dates) => {
    if (areDatesOverlap) return;

    const overlapDates = {
      from: dates.from.seconds * 1000,
      to: dates.to.seconds * 1000,
    };

    const isLowerBoundaryInOverlap = primaryDates.from < overlapDates.to
      && primaryDates.from > overlapDates.from;
    const isUpperBoundaryInOverlap = primaryDates.to < overlapDates.to
      && primaryDates.to > overlapDates.from;
    const isBoundaryInOverlap = isLowerBoundaryInOverlap || isUpperBoundaryInOverlap;
    const isIncludeOverlap = primaryDates.from < overlapDates.from
      && primaryDates.to > overlapDates.to;

    if (isBoundaryInOverlap || isIncludeOverlap) areDatesOverlap = true;
  });

  return areDatesOverlap;
};

export default areDateRangesOverlap;
