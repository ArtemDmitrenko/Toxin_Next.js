import Logo from 'Components/Logo/Logo';
import Counter from 'Components/Counter/Counter';
import Subscribe from 'Components/Subscribe/Subscribe';
import Reference from 'Components/Reference/Reference';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Logo width={106} height={40} alt="Toxin hotel logo" />
    <Counter />
    <Subscribe action="/" />
    <Reference text="Зарегистрироваться" type="solid" size="small" />
    <Reference text="Зарегистрироваться" type="solid" size="big" />
    <Reference text="click me" type="bordered" size="small" />
    <Reference text="click me" type="bordered" size="big" />
    <FooterDesktop
      navContent={footerItems.navContent}
      logoSign={footerItems.logoSign}
      subscribeSign={footerItems.subscribeSign}
      subscribeTitle={footerItems.subscribeTitle}
      copyright={footerItems.copyright}
    />
  </div>
);

export default HomePage;
