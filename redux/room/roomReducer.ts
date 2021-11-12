import InferValueTypes from 'Root/redux/utils';
// тут должен быть импорт типа, который берется с фаербейса

import RoomActionTypes from './roomActionTypes';
import * as actions from './roomActions';

type RoomAction = ReturnType<InferValueTypes<typeof actions>>;

// type RoomState = 

// const initialState: RoomState = {};

const roomReducer = (state = initialState, action: RoomAction) => {

};

export default roomReducer;
