import styles from './backgroundAuth.module.scss';

type BackgroundAuthProps = {
  children: React.ReactNode,
};

const BackgroundAuth = (props: BackgroundAuthProps) => {
  const { children } = props;

  return (
    <div className={styles.backgroundAuth}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundAuth;
