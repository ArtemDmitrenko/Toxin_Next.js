import Link from 'next/link';

import styles from './reference.module.scss';

type ReferenceProps = {
  text: string,
  type: 'bordered' | 'solid',
  size: 'big' | 'small'
};

const Reference = (props: ReferenceProps) => {
  const { text, type, size } = props;
  const classes = [styles.reference];

  if (type === 'bordered') classes.push(styles.bordered);
  else if (type === 'solid') classes.push(styles.solid);
  if (size === 'big') classes.push(styles.big);
  else if (size === 'small') classes.push(styles.small);

  const joinedClasses = classes.join(' ');

  return (
    <Link href="/" passHref>
      <a href="replace" className={joinedClasses}>
        {text}
      </a>
    </Link>
  );
};

export default Reference;
