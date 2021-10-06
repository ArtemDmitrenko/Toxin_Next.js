import Counter from 'Components/Counter/Counter';
import Reference from 'Components/Reference/Reference';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <Reference text="Зарегистрироваться" type="solid" size="small" />
    <Reference text="Зарегистрироваться" type="solid" size="big" />
    <Reference text="click me" type="bordered" size="small" />
    <Reference text="click me" type="bordered" size="big" />
  </div>
);

export default HomePage;
