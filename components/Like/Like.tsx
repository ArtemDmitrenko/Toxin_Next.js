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
    setAmount((prevAmount) => {
      let newAmount = prevAmount;

      if (active) {
        newAmount -= 1;
      } else {
        newAmount += 1;
      }

      if (onChange) {
        onChange(newAmount, !active);
      }

      return newAmount;
    });

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
