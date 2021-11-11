import styles from './passwordRecoveryMessage.module.scss';

type PasswordRecoveryMessageProps = {
  message: string,
  isError?: boolean,
};

const PasswordRecoveryMessage = ({ message, isError = false }: PasswordRecoveryMessageProps) => {
  const stylesMessage = (error: boolean) => (
    `${styles.container} ${error ? styles.error : ''}`
  );

  return (
    <div className={stylesMessage(isError)}>
      <p>{message}</p>
    </div>
  );
};

export default PasswordRecoveryMessage;
