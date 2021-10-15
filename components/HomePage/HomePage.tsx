import RangeSlider from 'Components/RangeSlider/RangeSlider';
import Counter from 'Components/Counter/Counter';
import DateRange from 'Components/DateRange/DateRange';
import CopyrightBar from 'Components/CopyrightBar/CopyrightBar';
import Subscribe from 'Components/Subscribe/Subscribe';
import Reference from 'Components/Reference/Reference';
import FooterMobile from 'Components/FooterMobile/FooterMobile';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';
import Header from 'Components/Header/Header';

import styles from './homePage.module.scss';

const addDatesOfState = (dates: { arrival: string, departure: string }) => {
  const datesOfState = {
    arrival: dates.arrival,
    departure: dates.departure,
  };
};

const addNewEmail = (email: string) => {
  const subscriptionData = {
    userEmail: email,
  };
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
      <DateRange
        headers={['прибытие', 'выезд']}
        placeholder="ДД.ММ.ГГГГ"
        defaultValues={[new Date('2021-10-19'), new Date('2021-10-23')]}
        onChange={addDatesOfState}
      />
      <Subscribe onSubmit={addNewEmail} />
      <Reference text="Зарегистрироваться" type="solid" size="small" />
      <Reference text="Зарегистрироваться" type="solid" size="big" />
      <Reference text="click me" type="bordered" size="small" />
      <Reference text="click me" type="bordered" size="big" />
      <Reference text="Перейти к оплате" type="directed" size="big" />
      <CopyrightBar text="Copyright © 2018 Toxin отель. Все права защищены." forMobile={false} />
      <Header menu={navigation} />
      <FooterMobile />
      <FooterDesktop
        navContent={footerItems.navContent}
        logoSign={footerItems.logoSign}
        subscribeSign={footerItems.subscribeSign}
        subscribeTitle={footerItems.subscribeTitle}
        addNewEmail={addNewEmail}
      />
      <RangeSlider
        min={0}
        max={15000}
        valueFrom={0}
        valueTo={15000}
        step={100}
        postfix="₽"
      />
    </div>
  );
};

export default HomePage;
