import styles from 'components/CopyrightBar/CopyrightBar.module.scss';
import SocialIcons from '../SocialIcons/SocialIcons';
import facebook from './img/facebook.svg';
import instagram from './img/instagram.svg';
import twitter from './img/twitter.svg';

const buttons = [
  {
    name: 'twitter', href: '/', src: twitter, width: 24, height: 24,
  },
  {
    name: 'facebook', href: '/', src: facebook, width: 22, height: 22,
  },
  {
    name: 'instagram', href: '/', src: instagram, width: 22, height: 22,
  },
];

type CopyrightBarProps = {
  text: string
};

export default function CopyrightBar(props: CopyrightBarProps) {
  const { text } = props;
  return (
    <div className={styles.copyright}>
      <div className={styles.content}>
        <span className={styles.text}>{text}</span>
        <SocialIcons buttons={buttons} />
      </div>
    </div>
  );
}
