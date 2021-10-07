function num2str(i: number, textForms: [string, string, string]) {
  const [one, two, many] = textForms;
  const n = Math.abs(i) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return many;
  if (n1 > 1 && n1 < 5) return two;
  if (n1 === 1) return one;

  return many;
}

export default num2str;
