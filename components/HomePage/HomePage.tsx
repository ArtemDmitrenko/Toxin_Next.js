import Counter from 'Components/Counter/Counter';
import DateRange from 'Components/DateRange/DateRange';
import CopyrightBar from 'Components/CopyrightBar/CopyrightBar';
import Subscribe from 'Components/Subscribe/Subscribe';
import Reference from 'Components/Reference/Reference';
import FooterDesktop from 'Components/FooterDesktop/FooterDesktop';
import footerItems from 'Components/FooterDesktop/footer-items.json';

import styles from './homePage.module.scss';

const addDatesOfState = (dates: { arrival: string, departure: string }) => {
  const datesOfState = {
    arrival: dates.arrival,
    departure: dates.departure,
  };
};

const addNewEmail = (email: string) => {
  const subscriptionData = {
    userEmail: email,
  };
};

const HomePage = () => (
  <div className={styles.root}>
    <Counter />
    <DateRange
      headers={['прибытие', 'выезд']}
      placeholder="ДД.ММ.ГГГГ"
      defaultValues={[new Date('2021-10-19'), new Date('2021-10-23')]}
      onChange={addDatesOfState}
    />
    <Subscribe onSubmit={addNewEmail} />
    <Reference text="Зарегистрироваться" type="solid" size="small" />
    <Reference text="Зарегистрироваться" type="solid" size="big" />
    <Reference text="click me" type="bordered" size="small" />
    <Reference text="click me" type="bordered" size="big" />
    <FooterDesktop
      navContent={footerItems.navContent}
      logoSign={footerItems.logoSign}
      subscribeSign={footerItems.subscribeSign}
      subscribeTitle={footerItems.subscribeTitle}
      addNewEmail={addNewEmail}
    />
  </div>
);

export default HomePage;
