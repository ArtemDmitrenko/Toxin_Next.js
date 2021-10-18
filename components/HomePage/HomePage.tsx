import Counter from 'Components/Counter/Counter';
import BackgroundWithSlogan from 'Components/BackgroundWithSlogan/BackgroundWithSlogan';

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
    <BackgroundWithSlogan />
  </div>
);

export default HomePage;
