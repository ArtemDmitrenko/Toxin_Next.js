import Link from 'next/link';

import styles from './reference.module.scss';

type ReferenceProps = {
  isButton?: boolean,
  buttonType?: 'button' | 'submit' | 'reset',
  disabled?: boolean,
  text: string,
  type: 'bordered' | 'solid' | 'directed',
  size: 'big' | 'small',
  href?: string,
  onClick?: () => void,
};

const Reference = (props: ReferenceProps) => {
  const {
    isButton,
    buttonType,
    disabled,
    text,
    type,
    size,
    href = '/',
    onClick,
  } = props;

  const classesArr = [styles.reference];

  if (type === 'bordered') classesArr.push(styles.bordered);
  if (type === 'solid') classesArr.push(styles.solid);
  if (type === 'directed') classesArr.push(styles.directed);
  if (size === 'big') classesArr.push(styles.big);
  if (size === 'small') classesArr.push(styles.small);

  const classes = classesArr.join(' ');

  return (
    isButton
      ? (
        <button
          type={
            (buttonType === 'submit' ? 'submit' : 'button')
          }
          disabled={disabled}
          className={classes}
          onClick={onClick}
        >
          {text}
        </button>
      )
      : (
        <Link href={href} passHref>
          <a href="replace" onClick={onClick} className={classes}>
            {text}
          </a>
        </Link>
      )
  );
};

export default Reference;
