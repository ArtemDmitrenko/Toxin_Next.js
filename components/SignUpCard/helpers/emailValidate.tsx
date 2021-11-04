import hasValidateEmail from 'Root/utils/hasValidateEmail';
import validate from './validate';

const emailValidate = (signNoText: string, signNotValid: string) => (value: string) => {
  validate(signNoText);
  if (value) {
    if (!hasValidateEmail(value)) return signNotValid;
    return undefined;
  }
  return signNoText;
};

export default emailValidate;
