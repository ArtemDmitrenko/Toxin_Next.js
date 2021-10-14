import { useState } from 'react';

import { GuestsDropdownConfig } from 'Components/GuestsDropdown/GuestsDropdown';
import Counter from 'Components/Counter/Counter';
import CopyrightBar from 'Components/CopyrightBar/CopyrightBar';
import Subscribe from 'Components/Subscribe/Subscribe';
import Reference from 'Components/Reference/Reference';
import Header from 'Components/Header/Header';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';

import styles from './homePage.module.scss';
import RoomSearchCard from '../RoomSearchCard/RoomSearchCard';

const guestDropdownConfig: GuestsDropdownConfig = [
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

const HomePage = () => {
  const [datesOfStay, setDatesOfStay] = useState({ arrival: '', departure: '' });
  const [numberOfGuests, setNumberOfGuests] = useState([
    { title: '', group: '', number: 0 },
  ]);

  const addDatesOfState = (dates: { arrival: string, departure: string }) => {
    setDatesOfStay({
      ...datesOfStay,
      arrival: dates.arrival,
      departure: dates.departure,
    });
  };

  const addNumberOfGuest = (
    guestGroups: Array<{ title: string, group: string, number: number }>,
  ) => {
    setNumberOfGuests([...numberOfGuests, ...guestGroups]);
  };

  const handleSearchCardSubmit = () => {
    /* здесь нужно определиться что мы делаем
    /* с данными из формы
    /* (отпрвляем на сервер/добавляем в стор редакса???)
    /*
    /* === КОД НИЖЕ ТОЛЬКО ДЛЯ ПРОВЕРКИ ТОГО
    /* ЧТО ФУНКЦИЯ setNumberOfGuests() НОРМАЛЬНО РАБОТАЕТ
    */
    setNumberOfGuests([
      { title: 'взрослые', group: 'adults', number: 2 },
      { title: 'дети', group: 'adults', number: 4 },
      { title: 'младенцы', group: 'babies', number: 7 },
    ]);
    /* === JUST TO TEST THE FUNCTION setNumberOfGuests() === */
  };

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
        addNumberOfGuest={addNumberOfGuest}
        addDatesOfState={addDatesOfState}
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
