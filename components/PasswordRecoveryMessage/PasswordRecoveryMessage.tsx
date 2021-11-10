import styles from './passwordRecoveryMessage.module.scss';

type PasswordRecoveryMessageProps = {
  message: string,
};

const PasswordRecoveryMessage = (props: PasswordRecoveryMessageProps) => (
  <div className={styles.container}>
    <p>{props.message}</p>
  </div>
);

export default PasswordRecoveryMessage;