import Logo from 'Components/Logo';
import Counter from 'Components/Counter/Counter';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Logo size={{ width: '106px', height: '40px' }} />
    <Counter />
  </div>
);

export default HomePage;
