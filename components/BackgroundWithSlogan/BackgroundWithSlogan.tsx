import styles from './backgroundWithSlogan.module.scss';

const BackgroundWithSlogan = () => (
  <div className={styles.main}>
    <div className={styles.wrapper}>
      <div className={styles.slogan}>
        <p className={styles.text}>Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
      </div>
    </div>
  </div>
);

export default BackgroundWithSlogan;
