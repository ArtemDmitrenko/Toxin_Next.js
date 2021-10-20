import { useState } from 'react';

import styles from './like.module.scss';

type LikeProps = {
  amountLike: number,
  isLiked?: boolean,
  onChange?: (amountLike: number, isLiked: boolean) => void,
};

const Like = ({ amountLike, isLiked = false, onChange }: LikeProps) => {
  const [amount, setAmount] = useState(amountLike);
  const [active, setActive] = useState(isLiked);

  const handleClickButton = () => {
    if (active) {
      setAmount(amount - 1);
      if (onChange) {
        onChange(amount - 1, !active);
      }
    } else {
      setAmount(amount + 1);
      if (onChange) {
        onChange(amount + 1, !active);
      }
    }
    setActive(!active);
  };

  const styleButton = () => (
    `${styles.like} ${active ? styles.likeActive : ''}`
  );

  return (
    <button type="button" className={styleButton()} onClick={handleClickButton}>{amount}</button>
  );
};

export default Like;
