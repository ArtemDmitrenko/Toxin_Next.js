import Link from 'next/link';

import styles from './notFoundPage.module.scss';

const NotFoundPage = () => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <h1>Ой! Данная страница не найдена :( </h1>
      <h2>
        <Link href="/">
          <a className={styles.link} href="replace" tabIndex={0}>
            Вернуться на главную
          </a>
        </Link>
      </h2>
    </div>
  </div>
);

export default NotFoundPage;
