import * as actionTypes from "./actionTypes";
import networkStatus from "./status";
/**
 * 还没请求：isUpdating: false, success: false
 * 发送请求：isUpdating: true, success: false
 * 请求成功：isUpdating: false, success: true
 * 请求失败：isUpdating: false, success: false, error
 *
 */
export default (
  state = { status: networkStatus.IDLE, error: undefined },
  action
) => {
  switch (action.type) {
    case actionTypes.UPDATE_USERINFO_STARTED:
      return { ...state, status: networkStatus.SENT, error: undefined };
    case actionTypes.UPDATE_USERINFO_SUCCESS:
      const response = JSON.parse(action.result);
      if (response.success) {
        return { ...state, status: networkStatus.SUCCESS, error: undefined };
      } else {
        console.debug("请求成功但被服务器拒绝");
        return {
          ...state,
          status: networkStatus.FAILURE,
          error: "身份验证失败，请尝试重新登录"
        };
      }
    case actionTypes.UPDATE_USERINFO_FAILURE:
      return {
        ...state,
        status: networkStatus.FAILURE,
        error: action.error
      };
    case actionTypes.NOTIFICATED:
      return {
        ...state,
        status: networkStatus.IDLE
      };
    default:
      return state;
  }
};
