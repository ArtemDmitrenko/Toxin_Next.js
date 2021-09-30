import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { counterDecrement, counterIncrement } from '../../redux/actions/testActions';
import Header from '../Header/Header';
import styles from './counter.module.scss';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootStateOrAny) => state.test.value);

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
