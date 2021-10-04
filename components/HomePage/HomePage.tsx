import Logo from 'Components/Logo/Logo';
import Counter from 'Components/Counter/Counter';
import Subscribe from 'Components/Subscribe/Subscribe';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Logo width={106} height={40} alt="Toxin hotel logo" />
    <Counter />
    <Subscribe action="/" />
  </div>
);

export default HomePage;
