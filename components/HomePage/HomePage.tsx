import Counter from 'Components/Counter/Counter';
import DateRange from 'Components/DateRange/DateRange';
import Reference from 'Components/Reference/Reference';

import styles from './homePage.module.scss';

const addDatesOfState = (dates: { arrival: string, departure: string }) => {
  const datesOfState = {
    arrival: dates.arrival,
    departure: dates.departure,
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
    <Reference text="Зарегистрироваться" type="solid" size="small" />
    <Reference text="Зарегистрироваться" type="solid" size="big" />
    <Reference text="click me" type="bordered" size="small" />
    <Reference text="click me" type="bordered" size="big" />
    <Reference text="Перейти к оплате" type="directed" size="big" />
  </div>
);

export default HomePage;
