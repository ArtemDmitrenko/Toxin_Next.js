import Counter from '../Counter/Counter';
import styles from './homePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.root}>
      <Counter></Counter>
    </div>
  )
}

export default HomePage;
