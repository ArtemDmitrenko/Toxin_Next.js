const validateBirthday = (value: string) => {
  const dateReg = /^(0?[1-9]|[12][0-9]|3[01])[/.](0?[1-9]|1[012])[/.]\d{4}$/;
  if (value) {
    if (!value.match(dateReg)) return 'Некорректная дата';
    return undefined;
  }
  return 'Укажите дату рождения';
};

export default validateBirthday;
