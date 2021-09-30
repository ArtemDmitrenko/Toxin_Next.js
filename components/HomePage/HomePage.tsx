import Counter from 'Components/Counter/Counter';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
  </div>
);

export default HomePage;
