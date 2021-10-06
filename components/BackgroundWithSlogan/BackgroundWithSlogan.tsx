import styles from './backgroundWithSlogan.module.scss';

const BackgroundWithSlogan = () => (
  <div className={styles.main}>
    <div className={styles.wrapper}>
      <p className={styles.slogan}>Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
    </div>
  </div>
);

export default BackgroundWithSlogan;
