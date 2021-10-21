import { useState } from 'react';

import styles from './like.module.scss';

type LikeProps = {
  amountLike: number,
  isLiked?: boolean,
  onChange?: (active: boolean) => void,
};

const Like = ({ amountLike, isLiked = false, onChange }: LikeProps) => {
  const [amount, setAmount] = useState(amountLike);
  const [active, setActive] = useState(isLiked);

  const handleClickButton = () => {
    if (active) {
      setAmount(amount - 1);
    } else {
      setAmount(amount + 1);
    }

    setActive(!active);
    if (onChange) {
      onChange(!active);
    }
  };

  const styleButton = () => (
    `${styles.like} ${active ? styles.likeActive : ''}`
  );

  return (
    <button type="button" className={styleButton()} onClick={handleClickButton}>{amount}</button>
  );
};

export default Like;
