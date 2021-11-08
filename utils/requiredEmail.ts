import hasValidateEmail from 'Root/utils/hasValidateEmail';

const requiredEmail = (email: string): string => {
  if (!email) return 'Введите email';
  if (!hasValidateEmail(email)) return 'Введите корректный email';
  return '';
};

export default requiredEmail;
