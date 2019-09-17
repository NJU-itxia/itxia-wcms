import * as actionTypes from "./actionTypes";

export default (state = { isLogin: false }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      const response = JSON.parse(action.result);
      if (response.success) {
        return {
          ...state,
          isLogin: true
        };
      } else {
        return {
          ...state,
          isLogin: false,
          error: "用户名或密码错误"
        };
      }
    case actionTypes.FETCH_FAILURE:
      return {
        ...state,
        isLogin: false,
        error: action.error
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false
      };
    default:
      return state;
  }
};
