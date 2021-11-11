import styles from './message.module.scss';

type MessageProps = {
  type: 'error' | 'warning' | 'success',
  children: React.ReactNode
};

const Message = (props: MessageProps) => {
  const { children, type } = props;

  const stylesMessage = () => {
    const map = {
      error: styles.error,
      warning: styles.warning,
      success: styles.success,
    };

    return `${styles.message} ${map[type]}`;
  };

  return (
    <div className={stylesMessage()}>
      {children}
    </div>
  );
};

export default Message;
