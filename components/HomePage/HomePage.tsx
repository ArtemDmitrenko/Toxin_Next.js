import Counter from 'Components/Counter/Counter';
import CopyrightBar from 'components/CopyrightBar/CopyrightBar';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <div>
      <CopyrightBar text="Copyright © 2018 Toxin отель. Все права защищены." />
    </div>
  </div>
);

export default HomePage;
