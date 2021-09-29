import type { NextPage } from 'next'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { counterDecrement, counterIncrement } from '../redux/actions/testActions';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootStateOrAny) => state.test.value);

  return (
    <div className="index-page">
      <h1> Test counter </h1>
      <h1>{count}</h1>
      <button onClick={() => dispatch(counterDecrement())}> - </button>
      <button onClick={() => dispatch(counterIncrement())}> + </button>
    </div>
  )
}


export default Home
