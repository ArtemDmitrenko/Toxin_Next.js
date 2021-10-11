import Link from 'next/link';

import Logo from 'Components/Logo/Logo';
import Subscribe from 'Components/Subscribe/Subscribe';

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
  copyright: string
};

const FooterDesktop = (props: FooterData) => {
  const {
    navContent, logoSign, subscribeSign, subscribeTitle, copyright,
  } = props;

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Logo width={106} height={40} alt="Toxin hotel logo" />
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
            <Subscribe action="/" />
          </div>
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.wrapperBar}>
          <p className={styles.copyright}>{copyright}</p>
          <p className={styles.socialLinks}>Social links</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterDesktop;
