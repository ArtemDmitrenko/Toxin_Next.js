import { useState } from 'react';

import { useAppSelector } from 'Root/redux/hooks';

import styles from './like.module.scss';

type LikeData = {
  likeArray: string[],
};

type LikeProps = {
  likeArray: string[],
  onChange?: (data: LikeData) => void,
};

const Like = ({
  likeArray,
  onChange,
}: LikeProps) => {
  const { userId, isAuth }: { userId: string | null, isAuth: boolean } = useAppSelector(
    (state) => state.auth,
  );

  const [likes, setLike] = useState(likeArray);
  const [amount, setAmount] = useState(likeArray.length);
  const [active, setActive] = useState(false);

  if (isAuth) {
    const isActive = likeArray.filter((like: string) => like === userId);
    if (isActive.length > 0) {
      setActive(true);
    }
  }

  const handleClickButton = () => {
    let currentValue: number = amount;

    if (userId !== null) {
      if (active) {
        currentValue -= 1;
        const newLikesArray = likes.filter((like: string) => like !== userId);
        setLike(newLikesArray);
      } else {
        currentValue += 1;
        const newLikesArray = [...likes, userId];
        setLike(newLikesArray);
      }
    }

    if (onChange) {
      onChange({
        likeArray: likes,
      });
    }

    setAmount(currentValue);
    if (userId !== null) {
      setActive(!active);
    }
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
