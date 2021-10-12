import Counter from 'Components/Counter/Counter';
import CopyrightBar from 'Components/CopyrightBar/CopyrightBar';
import Subscribe from 'Components/Subscribe/Subscribe';
import Reference from 'Components/Reference/Reference';
import FooterMobile from '../FooterMobile/FooterMobile';

import styles from './homePage.module.scss';

const addNewEmail = (email: string) => {
  const subscriptionData = {
    userEmail: email,
  };
};

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <Subscribe
      onSubmit={addNewEmail}
    />
    <Reference text="Зарегистрироваться" type="solid" size="small" />
    <Reference text="Зарегистрироваться" type="solid" size="big" />
    <Reference text="click me" type="bordered" size="small" />
    <Reference text="click me" type="bordered" size="big" />
    <Reference text="Перейти к оплате" type="directed" size="big" />
    <CopyrightBar text="Copyright © 2018 Toxin отель. Все права защищены." forMobile={false} />
    <FooterMobile />
  </div>
);

export default HomePage;
