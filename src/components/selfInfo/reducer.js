import * as actionTypes from "./actionTypes";
import requestStatus from "../../util/requestStatus";
/**
 * 还没请求：isUpdating: false, success: false
 * 发送请求：isUpdating: true, success: false
 * 请求成功：isUpdating: false, success: true
 * 请求失败：isUpdating: false, success: false, error
 *
 */
export default (
  state = { status: requestStatus.IDLE, error: undefined },
  action
) => {
  switch (action.type) {
    case actionTypes.NOTIFICATED:
      return {
        ...state,
        status: requestStatus.IDLE
      };
    case actionTypes.UPDATE_SELFINFO:
      if (action.payload.requestName !== "selfInfo") return state;
      switch (action.payload.status) {
        case requestStatus.IDLE:
          return state;
        case requestStatus.PENDING:
          return { ...state, status: requestStatus.PENDING, error: undefined };
        case requestStatus.SUCC:
          const response = action.payload.json;
          if (response.success === true) {
            return {
              ...state,
              status: requestStatus.SUCC,
              error: undefined
            };
          } else {
            return {
              ...state,
              status: requestStatus.ERROR,
              error: "身份验证失败，请尝试重新登录"
            };
          }
        case requestStatus.ERROR:
          return {
            ...state,
            status: requestStatus.ERROR,
            error: action.payload.error
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
