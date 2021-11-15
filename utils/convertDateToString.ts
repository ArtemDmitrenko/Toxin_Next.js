const convertDateToString = (date: Date) => (
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
);

export default convertDateToString;
