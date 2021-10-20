import RangeSlider from 'Components/RangeSlider/RangeSlider';
import Counter from 'Components/Counter/Counter';
import DateRange from 'Components/DateRange/DateRange';
import CopyrightBar from 'Components/CopyrightBar/CopyrightBar';
import Subscribe from 'Components/Subscribe/Subscribe';
import Reference from 'Components/Reference/Reference';
import Like from 'Components/Like/Like';
import FooterMobile from 'Components/FooterMobile/FooterMobile';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';
import Checkbox from 'Components/Checkbox/Checkbox';
import Header from 'Components/Header/Header';
import RoomCard from 'Components/RoomCard/RoomCard';
import roomCards from 'Components/RoomCard/roomCards.json';
import BackgroundWithSlogan from 'Components/BackgroundWithSlogan/BackgroundWithSlogan';

import styles from './index.module.scss';

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

const Home = () => {
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
      <Like amountLike={12} isLiked />
      <CopyrightBar text="Copyright © 2018 Toxin отель. Все права защищены." forMobile={false} />
      <Header menu={navigation} />
      <Checkbox title="Можно с питомцами" name="box1" />
      <FooterMobile />
      <FooterDesktop
        navContent={footerItems.navContent}
        logoSign={footerItems.logoSign}
        subscribeSign={footerItems.subscribeSign}
        subscribeTitle={footerItems.subscribeTitle}
        addNewEmail={addNewEmail}
      />
      <RangeSlider
        min={-10}
        max={10}
        valueFrom={-3.5}
        valueTo={5.9}
        step={0.01}
        postfix="₽"
      />
      <div className={styles.roomCards}>
        <RoomCard
          roomNumber={roomCards.roomNumber}
          cost={roomCards.cost}
          amountReviews={roomCards.amountReviews}
          images={roomCards.images}
          level={roomCards.level}
          href={roomCards.href}
          amountStar={roomCards.amountStar}
        />
        <RoomCard
          roomNumber={roomCards.roomNumber}
          cost={roomCards.cost}
          amountReviews={roomCards.amountReviews}
          images={roomCards.images}
          level={roomCards.level}
          href={roomCards.href}
          amountStar={roomCards.amountStar}
        />
        <RoomCard
          roomNumber={roomCards.roomNumber}
          cost={roomCards.cost}
          amountReviews={roomCards.amountReviews}
          images={roomCards.images}
          level={roomCards.level}
          href={roomCards.href}
          amountStar={roomCards.amountStar}
        />
      </div>
      <BackgroundWithSlogan />
    </div>
  );
};

export default Home;
