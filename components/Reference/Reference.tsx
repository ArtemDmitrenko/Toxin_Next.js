import Link from 'next/link';

import styles from './reference.module.scss';

type ReferenceProps = {
  text: string,
  type: 'bordered' | 'solid' | 'directed',
  size: 'big' | 'small',
  href: string,
  onClick?: () => void,
};

const Reference = (props: ReferenceProps) => {
  const {
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
    <Link href={href} passHref>
      <a href="replace" onClick={onClick} className={classes}>
        {text}
      </a>
    </Link>
  );
};

export default Reference;
