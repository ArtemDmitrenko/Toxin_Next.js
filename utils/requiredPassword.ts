const requiredPassword = (password: string) => (password ? undefined : 'Введите пароль');

export default requiredPassword;
