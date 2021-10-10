import Logo from 'Components/Logo/Logo';
import Counter from 'Components/Counter/Counter';
import Subscribe from 'Components/Subscribe/Subscribe';
import Reference from 'Components/Reference/Reference';
import Header from 'Components/Header/Header';

import styles from './homePage.module.scss';

const HomePage = () => {
  const navigation = [
    {
      id: 1,
      name: 'О нас',
      href: '/',
      subMenu: [],
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
      subMenu: [],
    },
    {
      id: 4,
      name: 'Новости',
      href: '/',
      subMenu: [],
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
      <Logo width={106} height={40} alt="Toxin hotel logo" />
      <Counter />
      <Subscribe action="/" />
      <Reference text="Зарегистрироваться" type="solid" size="small" />
      <Reference text="Зарегистрироваться" type="solid" size="big" />
      <Reference text="click me" type="bordered" size="small" />
      <Reference text="click me" type="bordered" size="big" />
      <Header menu={navigation} />
    </div>
  );
};

export default HomePage;
