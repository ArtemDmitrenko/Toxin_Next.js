import validate from './validate';

const nameValidate = (signNoText: string, signNotValid: string) => (value: string) => {
  validate(signNoText);
  const nameReg = /^([а-яё]+|[a-z]+)$/i;
  if (value) {
    if (!value.match(nameReg)) return signNotValid;
    return undefined;
  }
  return signNoText;
};

export default nameValidate;
