import { PropsWithChildren } from 'react';

import styles from './message.module.scss';

type MessageProps = {
  type: 'error' | 'warning' | 'success',
};

const Message = (props: PropsWithChildren<MessageProps>) => {
  const { children, type } = props;

  const stylesMessage = () => {
    const map = {
      error: styles.error,
      warning: styles.warning,
      success: styles.success,
    };

    return [styles.message, map[type]].join(' ');
  };

  return (
    <div className={stylesMessage()}>
      {children}
    </div>
  );
};

export default Message;
