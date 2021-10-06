import Logo from 'Components/Logo/Logo';
import Counter from 'Components/Counter/Counter';
import Subscribe from 'Components/Subscribe/Subscribe';
import DateRange from 'Components/DateRange/DateRange';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Logo width={106} height={40} alt="Toxin hotel logo" />
    <Counter />
    <Subscribe />
    <DateRange headers={['прибытие', 'выезд']} placeholder="ДД.ММ.ГГГГ" />
  </div>
);

export default HomePage;
