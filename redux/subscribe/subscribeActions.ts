import SubscribeActionTypes from './subscribeActionTypes';

const subscribe = (email: string) => (<const>{
  type: SubscribeActionTypes.SUBSCRIBE,
  email,
});

export default subscribe;
