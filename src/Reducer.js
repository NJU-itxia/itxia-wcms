import * as ActionTypes from "./ActionTypes";

export default (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, isLogin: true, user: action.user };
    case ActionTypes.LOGOUT:
      return { ...state, isLogin: false };

    //获取个人信息
    case ActionTypes.GET_SELFINFO_STARTED:
      return {
        ...state,
        selfInfo: {
          loading: true,
          error: undefined,
          data: undefined
        }
      };
    case ActionTypes.GET_SELFINFO_FAILURE:
      return {
        ...state,
        selfInfo: {
          loading: false,
          error: action.error
        }
      };
    case ActionTypes.GET_SELFINFO_SUCCESS:
      return {
        ...state,
        selfInfo: {
          loading: false,
          data: action.result
        }
      };

    default:
      return state;
  }
};
