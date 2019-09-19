import * as actionTypes from "./actionTypes";

export default (
  state = { isUpdating: false, success: false, error: undefined },
  action
) => {
  switch (action.type) {
    case actionTypes.UPDATE_USERINFO_STARTED:
      return { ...state, isUpdating: true, success: false, error: undefined };
    case actionTypes.UPDATE_USERINFO_SUCCESS:
      const response = JSON.parse(action.result);
      if (response.success) {
        return { ...state, isUpdating: false, success: true, error: undefined };
      } else {
        console.debug("请求成功但被服务器拒绝");
        return {
          ...state,
          isUpdating: false,
          success: false,
          error: "请尝试重新登录"
        };
      }
    case actionTypes.UPDATE_USERINFO_FAILURE:
      return {
        ...state,
        isUpdating: false,
        success: false,
        error: action.error
      };

    default:
      return state;
  }
};
