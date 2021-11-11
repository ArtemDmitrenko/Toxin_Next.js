import styles from './passwordRecoveryMessage.module.scss';

type PasswordRecoveryMessageProps = {
  message: string,
  isError?: boolean,
};

const PasswordRecoveryMessage = ({ message, isError = false }: PasswordRecoveryMessageProps) => {
  const classesArr = [styles.container];

  if (isError) classesArr.push(styles.error);

  const classes = classesArr.join(' ');

  return (
    <div className={classes}>
      <p>{message}</p>
    </div>
  );
};

export default PasswordRecoveryMessage;
