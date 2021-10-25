const formatSign = (daysToStay: number): string => {
  const sign = (daysToStay % 10 === 1 && daysToStay !== 11) ? 'сутки' : 'суток';
  return sign;
};

export default formatSign;
