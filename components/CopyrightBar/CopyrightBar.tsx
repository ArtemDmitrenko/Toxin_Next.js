import SocialIcons from 'Components/SocialIcons/SocialIcons';

import facebook from './img/facebook.svg';
import instagram from './img/instagram.svg';
import twitter from './img/twitter.svg';

import styles from './copyrightBar.module.scss';

const buttons = [
  {
    id: 1,
    name: 'twitter',
    href: 'https://twitter.com/',
    src: twitter,
    width: 24,
    height: 24,
  },
  {
    id: 2,
    name: 'facebook',
    href: 'https://www.facebook.com/',
    src: facebook,
    width: 22,
    height: 22,
  },
  {
    id: 3,
    name: 'instagram',
    href: 'https://www.instagram.com/',
    src: instagram,
    width: 22,
    height: 22,
  },
];

type CopyrightBarProps = {
  text: string,
  forMobile?: boolean,
};

const CopyrightBar = (props: CopyrightBarProps) => {
  const { text, forMobile = false } = props;

  const stylesCopyrightBar = () => (
    `${forMobile ? styles.contentMobile : styles.content}`
  );

  return (
    <div className={styles.copyright}>
      <div className={stylesCopyrightBar()}>
        <span className={styles.text}>{text}</span>
        <SocialIcons buttons={buttons} />
      </div>
    </div>
  );
};

export default CopyrightBar;
