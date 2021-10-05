import Link from 'next/link';

import styles from './reference.module.scss';

type ReferenceProps = {
  text: string,
  type: 'bordered' | 'solid',
  size: 'big' | 'small'
};

const Reference = (props: ReferenceProps) => {
  const { text, type, size } = props;
  const classes = [styles.reference, styles[type], styles[size]];

  return (
    <Link href="/" passHref>
      <a href="replace" className={classes.join(' ')}>
        {text}
      </a>
    </Link>
  );
};

export default Reference;
