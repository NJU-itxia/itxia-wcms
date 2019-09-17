import * as ActionTypes from "./ActionTypes";

export default (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, isLogin: true, user: action.user };
    case ActionTypes.LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
};
