import { counterDecrement, counterIncrement } from 'Root/redux/testCounter/testCounterActions';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';
import Header from 'Components/Header/Header';

import styles from './counter.module.scss';

const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.testCounter.value);

  return (
    <div className={styles.root}>
      <Header content="Test counter" />
      <h1 className={styles.counter}>{count}</h1>
      <button type="button" className={styles.button} onClick={() => dispatch(counterDecrement())}> - </button>
      <button type="button" className={styles.button} onClick={() => dispatch(counterIncrement())}> + </button>
    </div>
  );
};

export default Counter;
