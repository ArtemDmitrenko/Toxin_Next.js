const valuesWrapper = (arr: Array<number>, postfix?: string) => (
  `${arr[0]}${postfix} – ${arr[1]}${postfix}`
);

export default valuesWrapper;
