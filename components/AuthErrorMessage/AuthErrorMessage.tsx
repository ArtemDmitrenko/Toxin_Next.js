import Link from 'next/link';

import styles from './authErrorMessage.module.scss';

const AuthErrorMessage = ({ href }:{ href: string }) => (
  <div className={styles.container}>
    <span>
      <b>Не удаётся войти.</b>
    </span>
    <span>
      Проверьте правильность ввода
      {' '}
      <b>пароля</b>
      {' '}
      и
      {' '}
      <b>email</b>
      <ul>
        <li>
          Возможно, нажата клавиша
          {' '}
          <b>Caps Lock</b>
          ?
        </li>
        <li>
          Может быть, у Вас включена неправильная
          {' '}
          <b>раскладка</b>
          ?
          (русская или английская)
        </li>
      </ul>
    </span>
    <span>
      Если Вы всё внимательно проверили,
      но войти всё равно не удаётся, Вы можете
      {' '}
      <Link href={href} passHref>
        <a href="replace" className={styles.link}>
          нажать&nbsp;сюда
        </a>
      </Link>
      {' '}
      чтобы восстановить пароль.
    </span>
  </div>
);

export default AuthErrorMessage;
