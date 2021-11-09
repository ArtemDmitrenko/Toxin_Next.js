import styles from './loadingSpinner.module.scss';

const LoadingSpinner = () => (
  <div className={styles.wrapper}>
    <div className={styles.spinner} />
  </div>
);

export default LoadingSpinner;
