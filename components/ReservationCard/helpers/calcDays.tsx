const calcDays = (dateRange: { arrival: string, departure: string }): number => {
  const MILLISECONDS_IN_DAY: number = 24 * 3600 * 1000;
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  const firstDay = new Date(dateRange.arrival.replace(pattern, '$3-$2-$1')).getTime();
  const lastDay = new Date(dateRange.departure.replace(pattern, '$3-$2-$1')).getTime();
  return (lastDay - firstDay) / MILLISECONDS_IN_DAY;
};

export default calcDays;
