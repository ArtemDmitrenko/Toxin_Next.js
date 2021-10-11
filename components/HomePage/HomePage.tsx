import Counter from 'Components/Counter/Counter';
import DateRange from 'Components/DateRange/DateRange';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <DateRange headers={['прибытие', 'выезд']} placeholder="ДД.ММ.ГГГГ" />
  </div>
);

export default HomePage;
