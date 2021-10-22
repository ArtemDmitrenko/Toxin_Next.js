import { useState } from 'react';

import styles from './like.module.scss';

type LikeProps = {
  amountLike: number,
  isLiked?: boolean,
  name: string,
  onChange?: (amountLike: number, isLiked: boolean, name: string) => void,
};

const Like = ({
  amountLike,
  isLiked = false,
  name,
  onChange,
}: LikeProps) => {
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
        onChange(newAmount, !active, name);
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
