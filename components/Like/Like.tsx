import { useState } from 'react';

import styles from './like.module.scss';

type LikeProps = {
  amountLike: number;
};

const Like = ({ amountLike }: LikeProps) => {
  const [amount, setAmount] = useState(amountLike);
  const [active, setActive] = useState(false);

  const subtract = () => {
    setActive(!active);
    setAmount(amount - 1);
  };

  const sum = () => {
    setActive(!active);
    setAmount(amount + 1);
  };

  const handleClickButton = () => (
    active ? subtract() : sum()
  );

  const styleButton = () => (
    `${styles.like} ${active ? styles.likeActive : ''}`
  );

  return (
    <button type="button" className={styleButton()} onClick={handleClickButton}>{amount}</button>
  );
};

export default Like;
