import Head from 'next/head';

import Header from 'Components/Header/Header';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';
import FooterMobile from 'Components/FooterMobile/FooterMobile';

import navigation from './navigation.json';

import styles from './layout.module.scss';

type LayoutProps = {
  children: React.ReactNode,
  title: string,
  description?: string,
  keywords?: string
};

const Layout = (props: LayoutProps) => {
  const {
    children,
    title,
    description = 'Лучший отель в мире с самыми дешевыми ценами',
    keywords = 'отель, люкс, гостиница, проживание',
  } = props;

  return (
    <div className={styles.wrapper}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Head>
      <Header menu={navigation} isAuth />
      <main className={styles.main}>
        {children}
      </main>
      <FooterDesktop
        navContent={footerItems.navContent}
        logoSign={footerItems.logoSign}
        subscribeSign={footerItems.subscribeSign}
        subscribeTitle={footerItems.subscribeTitle}
        addNewEmail={() => {}}
      />
      <FooterMobile />
    </div>
  );
};

export default Layout;
