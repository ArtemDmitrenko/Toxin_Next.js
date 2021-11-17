import Reference from 'Components/Reference/Reference';
import { useState } from 'react';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar';

import styles from './reviewCard.module.scss';

type ReviewCardProps = {
  maxLength: number,
};

const ReviewCard = ({ maxLength }: ReviewCardProps) => {
  const [textLength, setTextLength] = useState(0);
  const [isOpen, setOpen] = useState(false);

  const handleTitleButtonClick = () => { setOpen(!isOpen); };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { length } = e.target.value;

    setTextLength(length);

    // Reset field height
    e.target.style.height = 'inherit';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 5)
                 + parseInt(computed.getPropertyValue('padding-top'), 5)
                 + e.target.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 5)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 5);

    e.target.style.height = `${height}px`;
  };

  return (
    <div>
      <button
        className={styles.title}
        type="button"
        onClick={handleTitleButtonClick}
      >
        Оставить отзыв
      </button>
      {isOpen && (
      <form>
        <textarea
          className={styles.field}
          maxLength={500}
          required
          onKeyDown={handleKeyDown}
        />
        <div className={styles.footer}>
          <Reference isButton buttonType="submit" text="отправить отзыв" type="bordered" size="big" />
          <CircularProgressBar
            sqSize={44}
            textLength={textLength}
            maxLength={maxLength}
            strokeWidth={4}
          />
        </div>
      </form>
      )}
    </div>
  );
};

export default ReviewCard;
