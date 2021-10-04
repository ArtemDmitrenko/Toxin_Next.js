import Counter from 'Components/Counter/Counter';
import BackgroundWithSlogan from 'Components/BackgroundWithSlogan/BackgroundWithSlogan';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <BackgroundWithSlogan />
  </div>
);

export default HomePage;
