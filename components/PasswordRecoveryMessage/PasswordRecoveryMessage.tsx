import styles from './passwordRecoveryMessage.module.scss';

type PasswordRecoveryMessageProps = {
  message: string,
  isError?: boolean,
};

const PasswordRecoveryMessage = ({ message, isError = false }: PasswordRecoveryMessageProps) => {

  const stylesMessage = (isError: boolean) => (
    `${styles.container} ${isError ? styles.error : ""}`
  );

  return (
    <div className={stylesMessage(isError)}>
      <p>{message}</p>
    </div>
  );
};

export default PasswordRecoveryMessage;
