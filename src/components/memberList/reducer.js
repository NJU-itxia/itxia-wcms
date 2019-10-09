import * as actionTypes from "./actionTypes";
import requestStatus from "../../util/requestStatus";

export default (
  state = {
    memberList: {
      status: requestStatus.IDLE,
      payload: undefined,
      error: undefined
    },
    appointments: {
      status: requestStatus.IDLE,
      payload: undefined,
      error: undefined
    }
  },
  action
) => {
  switch (action.type) {
    case actionTypes.NOTIFICATED:
      //TODO
      return state;
    case actionTypes.GET_ALL_MEMBER_INFO:
      if (action.payload.requestName !== "getAllMemberInfo") return state;
      switch (action.payload.status) {
        case requestStatus.IDLE:
          return state;
        case requestStatus.PENDING:
          return {
            ...state,
            memberList: {
              status: requestStatus.PENDING,
              payload: undefined,
              error: undefined
            }
          };
        case requestStatus.SUCC:
          const response = action.payload.json;
          if (response.success === true) {
            return {
              ...state,
              memberList: {
                status: requestStatus.SUCC,
                payload: response,
                error: undefined
              }
            };
          } else {
            return {
              ...state,
              memberList: {
                status: requestStatus.ERROR,
                payload: undefined,
                error: "身份验证失败，请尝试重新登录"
              }
            };
          }
        case requestStatus.ERROR:
          return {
            ...state,
            memberList: {
              status: requestStatus.ERROR,
              payload: undefined,
              error: action.payload.error
            }
          };
        default:
          return state;
      }
    case actionTypes.GET_ALL_APPOINTMENTS:
      if (action.payload.requestName !== "getAllAppointments") return state;
      switch (action.payload.status) {
        case requestStatus.IDLE:
          return state;
        case requestStatus.PENDING:
          return {
            ...state,
            appointments: {
              status: requestStatus.PENDING,
              payload: undefined,
              error: undefined
            }
          };
        case requestStatus.SUCC:
          const response = action.payload.json;
          if (response.success === true) {
            return {
              ...state,
              appointments: {
                status: requestStatus.SUCC,
                payload: response,
                error: undefined
              }
            };
          } else {
            return {
              ...state,
              appointments: {
                status: requestStatus.ERROR,
                payload: undefined,
                error: "身份验证失败，请尝试重新登录"
              }
            };
          }
        case requestStatus.ERROR:
          return {
            ...state,
            appointments: {
              status: requestStatus.ERROR,
              payload: undefined,
              error: action.payload.error
            }
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
