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

  const initLike = () => {
    if (isAuth) {
      const isActive = likeArray.filter((like: string) => like === userId);
      if (isActive[0] === userId) {
        return true;
      }
    }
    return false;
  };

  const [likes, setLike] = useState(likeArray);
  const [amount, setAmount] = useState(likeArray.length);
  const [active, setActive] = useState(initLike());

  const handleClickButton = () => {
    let currentValue: number = amount;
    let newLikesArray: string[] = likes;

    if (userId !== null) {
      if (active) {
        currentValue -= 1;
        newLikesArray = likes.filter((like: string) => like !== userId);
      } else {
        currentValue += 1;
        newLikesArray = [...likes, userId];
      }
    }

    if (onChange) {
      onChange({
        likeArray: newLikesArray,
      });
    }

    setAmount(currentValue);
    if (userId !== null) {
      setActive(!active);
    }
    setLike(newLikesArray);
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
