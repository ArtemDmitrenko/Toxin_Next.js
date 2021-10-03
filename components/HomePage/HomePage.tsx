import Counter from 'Components/Counter/Counter';
import Button from 'Components/Button/Button';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <Button text="Войти" btnType="withBorder" />
    <Button text="Зарегистрироваться" btnType="gradient" />
  </div>
);

export default HomePage;
