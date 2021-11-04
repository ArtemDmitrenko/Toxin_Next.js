import validate from './validate';

const birthdayValidate = (signNoText: string, signNotValid: string) => (value: string) => {
  validate(signNoText);
  const dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
  if (value) {
    if (!value.match(dateReg)) return signNotValid;
    return undefined;
  }
  return signNoText;
};

export default birthdayValidate;
