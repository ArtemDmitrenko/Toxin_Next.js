import Link from 'next/link';

import Logo from 'Components/Logo/Logo';
import Subscribe from 'Components/Subscribe/Subscribe';
import CopyrightBar from '../CopyrightBar/CopyrightBar';

import styles from './footerDesktop.module.scss';

type FooterLink = {
  id: number,
  item: string;
  href: string;
};

type FooterColumn = {
  id: number,
  title: string;
  items: Array<FooterLink>;
};

type FooterData = {
  navContent: Array<FooterColumn>,
  logoSign: string,
  subscribeTitle: string,
  subscribeSign: string,
  addNewEmail: (email: string) => void,
};

const FooterDesktop = (props: FooterData) => {
  const {
    navContent, logoSign, subscribeSign, subscribeTitle, addNewEmail,
  } = props;

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Logo width={110} height={40} alt="Toxin hotel logo" />
            <p className={styles.sign}>{logoSign}</p>
          </div>
          <div className={styles.content}>
            {navContent.map((column) => (
              <div key={column.id} className={styles.column}>
                <h3 className={styles.title}>{column.title}</h3>
                {column.items.map((items) => (
                  <Link key={items.id} href={items.href} passHref>
                    <a href="replace" className={styles.item}>{items.item}</a>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.subscribe}>
            <h3 className={styles.title}>{subscribeTitle}</h3>
            <p className={styles.sign}>{subscribeSign}</p>
            <Subscribe onSubmit={addNewEmail} />
          </div>
        </div>
      </div>
      <CopyrightBar text="Copyright © 2018 Toxin отель. Все права защищены." />
    </footer>
  );
};

export default FooterDesktop;
