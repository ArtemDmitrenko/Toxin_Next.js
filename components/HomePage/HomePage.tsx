import Counter from 'Components/Counter/Counter';
import Subscribe from 'Components/Subscribe/Subscribe';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <Subscribe
      method="POST"
      url="https://jsonplaceholder.typicode.com/users"
      headers={{ 'Content-Type': 'application/json' }}
    />
  </div>
);

export default HomePage;
