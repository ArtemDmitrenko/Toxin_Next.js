import { useState } from 'react';
import { Field, Form } from 'react-final-form';

import { useAppSelector } from 'Root/redux/hooks';
import Reference from 'Components/Reference/Reference';
import CircularProgressBar from 'Components/CircularProgressBar/CircularProgressBar';

import styles from './reviewCard.module.scss';

type ReviewCardProps = {
  maxLength: number,
  onSubmit: (data: { userId: string, comment: string }) => void;
};

const ReviewCard = ({ maxLength, onSubmit }: ReviewCardProps) => {
  const [textLength, setTextLength] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const { userId } = useAppSelector((state) => state.auth);

  const letterCounter = (text: string) => (
    text ? setTextLength(text.length) : setTextLength(0)
  );

  const handleFormSubmit = ({ text }:{ text: string }) => {
    onSubmit({
      userId,
      comment: text,
    });
  };

  const handleTitleButtonClick = () => { setOpen(!isOpen); };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { target } = event;

    if (target instanceof HTMLTextAreaElement) {
      target.style.height = 'inherit';
      const computed = window.getComputedStyle(target);

      const height = parseInt(computed.getPropertyValue('border-top-width'), 5)
                   + parseInt(computed.getPropertyValue('padding-top'), 5)
                   + target.scrollHeight
                   + parseInt(computed.getPropertyValue('padding-bottom'), 5)
                   + parseInt(computed.getPropertyValue('border-bottom-width'), 5);

      target.style.height = `${height}px`;
    }
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
      <Form onSubmit={handleFormSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              className={styles.field}
              name="text"
              component="textarea"
              maxLength={500}
              required
              validate={letterCounter}
              onKeyDown={handleKeyDown}
            />
            <div className={styles.footer}>
              <Reference
                isButton
                buttonType="submit"
                text="отправить отзыв"
                type="bordered"
                size="big"
                disabled={submitting}
              />
              <CircularProgressBar
                sqSize={44}
                textLength={textLength}
                maxLength={maxLength}
                strokeWidth={4}
              />
            </div>
          </form>
        )}
      </Form>
      )}
    </div>
  );
};

export default ReviewCard;
