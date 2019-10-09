import * as actionTypes from "./actionTypes";
import requestStatus from "../../util/requestStatus";

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
    case actionTypes.ADD_MEMBER:
      if (action.payload.requestName !== "addMember") return state;
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
              error: response.data
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
