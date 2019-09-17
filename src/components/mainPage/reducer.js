import * as actionTypes from "./actionTypes";

export default (
  state = { page: null, userInfo: { loading: false, error: null, data: null } },
  action
) => {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE:
      return { ...state, page: action.newPage };
    case actionTypes.FETCH_STARTED:
      return {
        ...state,
        userInfo: { loading: true, error: undefined, data: undefined }
      };
    case actionTypes.FETCH_SUCCESS:
      const response = JSON.parse(action.result);
      if (response.success) {
        return {
          ...state,
          userInfo: { loading: false, error: undefined, data: response }
        };
      } else {
        console.debug("请求成功但被服务器拒绝");
        return {
          ...state,
          userInfo: { loading: false, error: "请尝试重新登录", data: undefined }
        };
      }
    case actionTypes.FETCH_FAILURE:
      return {
        ...state,
        userInfo: { loading: false, error: action.error, data: undefined }
      };
    default:
      return state;
  }
};
