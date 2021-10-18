import Counter from 'Components/Counter/Counter';
import CopyrightBar from 'Components/CopyrightBar/CopyrightBar';
import Subscribe from 'Components/Subscribe/Subscribe';
import Reference from 'Components/Reference/Reference';
import FooterMobile from 'Components/FooterMobile/FooterMobile';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';
import Header from 'Components/Header/Header';
import { DropdownConfig } from 'Components/Dropdown/Dropdown';
import RoomSearchCard, { RoomSearchCardData } from '../RoomSearchCard/RoomSearchCard';

import styles from './homePage.module.scss';

const guestDropdownConfig: DropdownConfig = [
  { title: 'взрослые', group: 'adults', wordforms: ['гость', 'гостя', 'гостей'] },
  { title: 'дети', group: 'adults', wordforms: ['гость', 'гостя', 'гостей'] },
  { title: 'младенцы', group: 'babies', wordforms: ['младенец', 'младенца', 'младенцев'] },
];

const dateRangeConfig = {
  headers: ['прибытие', 'выезд'],
  placeholder: 'ДД.ММ.ГГГГ',
  defaultValues: [new Date('2021-10-19'), new Date('2021-10-23')],
};

const addNewEmail = (email: string) => {
  const subscriptionData = {
    userEmail: email,
  };
};

const handleSearchCardSubmit = (data: RoomSearchCardData) => {
  console.log(data);

  /* здесь нужно определиться что мы делаем
  /* с данными из формы
  /* (отправляем на сервер/добавляем в стор редакса???)
  */
};

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
      <Counter />
      <RoomSearchCard
        guestsDropdownConfig={guestDropdownConfig}
        dateRangeConfig={dateRangeConfig}
        onSubmit={handleSearchCardSubmit}
      />

      <Subscribe onSubmit={addNewEmail} />
      <Reference text="Зарегистрироваться" type="solid" size="small" />
      <Reference text="Зарегистрироваться" type="solid" size="big" />
      <Reference text="click me" type="bordered" size="small" />
      <Reference text="click me" type="bordered" size="big" />
      <Reference text="Перейти к оплате" type="directed" size="big" />
      <CopyrightBar text="Copyright © 2018 Toxin отель. Все права защищены." />
      <Header menu={navigation} />
      <FooterMobile />
      <FooterDesktop
        navContent={footerItems.navContent}
        logoSign={footerItems.logoSign}
        subscribeSign={footerItems.subscribeSign}
        subscribeTitle={footerItems.subscribeTitle}
        addNewEmail={addNewEmail}
      />
    </div>
  );
};

export default HomePage;
