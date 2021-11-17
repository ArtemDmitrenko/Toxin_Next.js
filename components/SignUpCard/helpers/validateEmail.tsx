import hasValidateEmail from 'Root/utils/hasValidateEmail';

const validateEmail = (value: string) => {
  if (value) {
    if (!hasValidateEmail(value)) return 'Некорректный Email';
    return undefined;
  }
  return 'Укажите Email';
};

export default validateEmail;
