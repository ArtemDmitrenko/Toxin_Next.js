const validateName = (value: string) => {
  const nameReg = /^([а-яё]+|[a-z]+)$/i;
  if (value) {
    if (!value.match(nameReg)) return 'Поле не должно содержать символы';
    return undefined;
  }
  return 'Заполните поле';
};

export default validateName;
