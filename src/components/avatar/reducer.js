import * as actionTypes from "./actionTypes";

export default (state = { login: { isLogin: true } }, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return { ...state, login: { isLogin: false } };
    default:
      return state;
  }
};
