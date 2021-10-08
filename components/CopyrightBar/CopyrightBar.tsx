import SocialIcons from 'Components/SocialIcons/SocialIcons';

import facebook from './img/facebook.svg';
import instagram from './img/instagram.svg';
import twitter from './img/twitter.svg';

import styles from './copyrightBar.module.scss';

const buttons = [
  {
    id: 1,
    name: 'twitter',
    href: '/',
    src: twitter,
    width: 24,
    height: 24,
  },
  {
    id: 2,
    name: 'facebook',
    href: '/',
    src: facebook,
    width: 22,
    height: 22,
  },
  {
    id: 3,
    name: 'instagram',
    href: '/',
    src: instagram,
    width: 22,
    height: 22,
  },
];

type CopyrightBarProps = {
  text: string
};

const CopyrightBar = (props: CopyrightBarProps) => {
  const { text } = props;
  return (
    <div className={styles.copyright}>
      <div className={styles.content}>
        <span className={styles.text}>{text}</span>
        <SocialIcons buttons={buttons} />
      </div>
    </div>
  );
};

export default CopyrightBar;
