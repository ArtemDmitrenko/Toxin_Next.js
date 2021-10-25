import { useState } from 'react';

import styles from './like.module.scss';

type LikeData = {
  amountLike: number,
  isLiked: boolean,
};

type LikeProps = {
  amountLike: number,
  isLiked?: boolean,
  onChange?: (data: LikeData) => void,
};

const Like = ({
  amountLike,
  isLiked = false,
  onChange,
}: LikeProps) => {
  const [amount, setAmount] = useState(amountLike);
  const [active, setActive] = useState(isLiked);

  const handleClickButton = () => {
    let currentValue: number = amount;

    if (active) {
      currentValue -= 1;
    } else {
      currentValue += 1;
    }

    if (onChange) {
      onChange({
        amountLike: currentValue,
        isLiked: !active,
      });
    }

    setAmount(currentValue);
    setActive(!active);
  };

  const styleButton = () => (
    `${styles.like} ${active ? styles.likeActive : ''}`
  );

  return (
    <button type="button" className={styleButton()} onClick={handleClickButton}>{amount}</button>
  );
};

export type { LikeData };
export default Like;
