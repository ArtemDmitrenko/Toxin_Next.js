/* eslint-disable no-useless-escape */
const replaceSwitch = (substr: string) => {
  switch (substr) {
    case ',':
      return '.';

    default:
      return '';
  }
};

const validateStr = (str: string, postfix?: string) => {
  const validateExp = new RegExp(`^(\-)?([0-9])+(\.)?([0-9])*${postfix} – (\-)?([0-9])+(\.)?([0-9])*${postfix}$`);
  const replaceExp = new RegExp(`(\,|${postfix})`, 'g');

  if (!str.match(validateExp)) return null;

  const arrValues = str
    .replace(replaceExp, replaceSwitch)
    .split(' – ')
    .map((item) => Number(item));

  return arrValues;
};

export default validateStr;
