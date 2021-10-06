import Link from 'next/link';

import styles from './reference.module.scss';

type ReferenceProps = {
  text: string,
  type: 'bordered' | 'solid',
  size: 'big' | 'small'
};

const Reference = (props: ReferenceProps) => {
  const { text, type, size } = props;
  const classesArr = [styles.reference];

  if (type === 'bordered') classesArr.push(styles.bordered);
  else if (type === 'solid') classesArr.push(styles.solid);
  if (size === 'big') classesArr.push(styles.big);
  else if (size === 'small') classesArr.push(styles.small);

  const classes = classesArr.join(' ');

  return (
    <Link href="/" passHref>
      <a href="replace" className={classes}>
        {text}
      </a>
    </Link>
  );
};

export default Reference;
