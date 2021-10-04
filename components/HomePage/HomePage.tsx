import Logo from 'Components/Logo/Logo';
import Counter from 'Components/Counter/Counter';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Logo width={106} height={40} />
    <Counter />
  </div>
);

export default HomePage;
