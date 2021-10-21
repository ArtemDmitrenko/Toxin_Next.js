const createShortDateDisplay = (date: Array<Date>): string => {
  const firstDate = date[0].toLocaleDateString('ru-RU', {
    month: 'short', day: 'numeric',
  });
  const secondDate = date[1].toLocaleDateString('ru-RU', {
    month: 'short', day: 'numeric',
  });

  const sliceLongNames = (name: string): string => {
    const lastSymbolIndex = name.length - 1;
    const lastSymbol = name.charAt(lastSymbolIndex);

    if (lastSymbol === '.') {
      return name.slice(0, lastSymbolIndex);
    }
    return name;
  };

  return `${sliceLongNames(firstDate)} - ${sliceLongNames(secondDate)}`;
};

export default createShortDateDisplay;
