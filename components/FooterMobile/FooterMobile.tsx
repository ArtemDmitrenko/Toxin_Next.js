import Logo from 'Components/Logo/Logo';
import CopyrightBar from 'Components/CopyrightBar/CopyrightBar';

import styles from './footerMobile.module.scss';

const FooterMobile = () => (
  <div className={styles.footerMobile}>
    <Logo width={110} height={44} alt="Logo" />
    <CopyrightBar text="Copyright © 2018 Toxin отель. Все права защищены." forMobile />
  </div>
);

export default FooterMobile;
