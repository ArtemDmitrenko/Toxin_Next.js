const formattingDate = (date: Date): string => {
  const today = date;
  const day = (`0${today.getDate()}`).slice(-2);
  const month = (`0${today.getMonth() + 1}`).slice(-2);

  return `${day}.${month}.${today.getFullYear()}`;
};

export default formattingDate;
