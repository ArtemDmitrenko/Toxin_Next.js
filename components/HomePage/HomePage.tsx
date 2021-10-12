import Header from '../Header/Header';


import Counter from 'Components/Counter/Counter';
import CopyrightBar from 'Components/CopyrightBar/CopyrightBar';
import Subscribe from 'Components/Subscribe/Subscribe';
import Reference from 'Components/Reference/Reference';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';

import styles from './homePage.module.scss';

const addNewEmail = (email: string) => {
  const subscriptionData = {
    userEmail: email,
  };
};

<<<<<<< HEAD
const HomePage = () => {
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
    <div className={styles.root}>
      <Header menu={navigation} />







      <Counter />
      <Subscribe
        onSubmit={addNewEmail}
      />
      <Reference text="Зарегистрироваться" type="solid" size="small" />
      <Reference text="Зарегистрироваться" type="solid" size="big" />
      <Reference text="click me" type="bordered" size="small" />
      <Reference text="click me" type="bordered" size="big" />
      <Reference text="Перейти к оплате" type="directed" size="big" />
      <CopyrightBar text="Copyright © 2018 Toxin отель. Все права защищены." />
    </div>
  );
};
=======
const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <Subscribe
      onSubmit={addNewEmail}
    />
    <Reference text="Зарегистрироваться" type="solid" size="small" />
    <Reference text="Зарегистрироваться" type="solid" size="big" />
    <Reference text="click me" type="bordered" size="small" />
    <Reference text="click me" type="bordered" size="big" />
    <FooterDesktop
      navContent={footerItems.navContent}
      logoSign={footerItems.logoSign}
      subscribeSign={footerItems.subscribeSign}
      subscribeTitle={footerItems.subscribeTitle}
      addNewEmail={addNewEmail}
    />
  </div>
);
>>>>>>> remotes/origin/10-footer-desktop

export default HomePage;
