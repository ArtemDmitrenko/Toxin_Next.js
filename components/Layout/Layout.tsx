import Head from 'next/head';

import Header from 'Components/Header/Header';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';
import FooterMobile from 'Components/FooterMobile/FooterMobile';

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
  const navigation = [
    {
      id: 1,
      name: 'О нас',
      href: '/',
    },
    {
      id: 2,
      name: 'Услуги',
      href: '/',
      subMenu: [
        { id: 1, name: 'Аренда конференц-зала', href: '/' },
        { id: 2, name: 'Трансфер до отеля', href: '/' },
        { id: 3, name: 'Аренда транспорта', href: '/' },
        { id: 4, name: 'Камера хранения / сейф', href: '/' },
      ],
    },
    {
      id: 3,
      name: 'Вакансии',
      href: '/',
    },
    {
      id: 4,
      name: 'Новости',
      href: '/',
    },
    {
      id: 5,
      name: 'Соглашения',
      href: '/',
      subMenu: [
        { id: 1, name: 'Обработка персональных данных', href: '/' },
        { id: 2, name: 'Условия бронирования', href: '/' },
      ],
    },
  ];

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
