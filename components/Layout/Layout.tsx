import Head from 'next/head';

import Header from 'Components/Header/Header';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';
import FooterMobile from 'Components/FooterMobile/FooterMobile';
import navigation from 'Root/public/navigation.json';

const addNewEmail = (email: string) => {
  const subscriptionData = {
    userEmail: email,
  };
};

type LayoutProps = {
  children: React.ReactNode,
  title: string
};

const Layout = (props: LayoutProps) => {
  const { children, title } = props;

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Лучший отель в мире с самыми дешевыми ценами" />
        <meta name="keywords" content="отель, люкс, гостиница, проживание" />
        <title>{title}</title>
      </Head>
      <Header menu={navigation} />
      <main>
        {children}
      </main>
      <FooterDesktop
        navContent={footerItems.navContent}
        logoSign={footerItems.logoSign}
        subscribeSign={footerItems.subscribeSign}
        subscribeTitle={footerItems.subscribeTitle}
        addNewEmail={addNewEmail}
      />
      <FooterMobile />
    </div>
  );
};

export default Layout;
