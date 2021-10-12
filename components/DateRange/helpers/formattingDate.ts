const formattingDate = (date: Date): string => {
  if (date) {
    const today = date;
    const day = (`0${today.getDate()}`).slice(-2);
    const month = (`0${today.getMonth() + 1}`).slice(-2);

    return `${day}.${month}.${today.getFullYear()}`;
  }
  return date;
};

export default formattingDate;
