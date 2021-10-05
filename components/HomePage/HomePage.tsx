import Counter from 'Components/Counter/Counter';
import Reference from 'Components/Reference/Reference';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <Reference text="Зарегистрироваться" type="solid" size="small" />
    <br />
    <br />
    <Reference text="Зарегистрироваться" type="solid" size="big" />
    <br />
    <br />
    <Reference text="click me" type="bordered" size="small" />
    <br />
    <br />
    <Reference text="click me" type="bordered" size="big" />
  </div>
);

export default HomePage;
