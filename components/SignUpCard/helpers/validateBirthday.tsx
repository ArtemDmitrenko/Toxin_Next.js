const validateBirthday = (value: string) => {
  const dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
  if (value) {
    if (!value.match(dateReg)) return 'Некорректная дата';
    return undefined;
  }
  return 'Укажите дату рождения';
};

export default validateBirthday;
