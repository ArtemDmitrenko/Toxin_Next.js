import { asyncDecrement, asyncIncrement } from 'Root/redux/testCounter/testCounterActions';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';

import styles from './counter.module.scss';

const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.testCounter.value);

  return (
    <div className={styles.root}>
      <h1>Test counter</h1>
      <h1 className={styles.counter}>{count}</h1>
      <button type="button" className={styles.button} onClick={() => dispatch(asyncDecrement())}> - </button>
      <button type="button" className={styles.button} onClick={() => dispatch(asyncIncrement())}> + </button>
    </div>
  );
};

export default Counter;
