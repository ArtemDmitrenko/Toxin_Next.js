const createShortDateDisplay = (date: Array<Date>): string => {
  const firstDate = date[0].toLocaleDateString('ru-RU', {
    month: 'short', day: 'numeric',
  });
  const secondDate = date[1].toLocaleDateString('ru-RU', {
    month: 'short', day: 'numeric',
  });

  const sliceLongNames = (name: string): string => {
    if (name.length > 5) {
      return name.slice(0, name.length - 1);
    }
    return name;
  };

  return `${sliceLongNames(firstDate)} - ${sliceLongNames(secondDate)}`;
};

export default createShortDateDisplay;
