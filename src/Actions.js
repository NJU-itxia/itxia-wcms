import * as ActionTypes from "./ActionTypes";
import config from "./config/config";
const apiHost = config.network.api.host;
const protocol = config.network.api.protocol;

export const login = username => {
  return {
    type: ActionTypes.LOGIN,
    user: username
  };
};

export const logout = () => {
  return {
    type: ActionTypes.LOGOUT
  };
};

//网络请求
export const fetchStarted = () => ({ type: ActionTypes.FETCH_STARTED });
export const fetchSuccess = result => ({
  type: ActionTypes.FETCH_SUCCESS,
  result
});
export const fetchFailure = error => ({
  type: ActionTypes.FETCH_FAILURE,
  error
});

let reqID = 0;
const fetchAPI = (uri, startAction, successAction, failureAction) => {
  return dispatch => {
    uri = `${protocol}://${apiHost}/${uri}`;
    console.debug(`fetching:${uri}`);
    const mReqID = ++reqID;
    const dispatchIfVaild = action => {
      if (reqID === mReqID) {
        return dispatch(action);
      }
    };

    dispatchIfVaild(startAction);
    fetch(uri)
      .then(response => {
        const responseCode = Number(response.status);
        if (200 <= responseCode && responseCode < 300) {
          //请求成功
          response
            .json()
            .then(responseJson => {
              //返回json
              dispatchIfVaild(successAction(responseJson));
            })
            .catch(error => {
              console.debug(`解析json出错`);
              dispatchIfVaild(failureAction(error));
            });
        } else {
          dispatchIfVaild(failureAction(`请求错误:${responseCode}`));
        }
      })
      .catch(error => {
        dispatchIfVaild(failureAction(error));
      });
  };
};

//个人信息
export const fetchSelfInfoStarted = () => ({
  type: ActionTypes.GET_SELFINFO_STARTED
});
export const fetchSelfInfoSuccess = result => ({
  type: ActionTypes.GET_SELFINFO_SUCCESS,
  result
});
export const fetchSelfInfoFailure = error => ({
  type: ActionTypes.GET_SELFINFO_FAILURE,
  error
});
export const fetchSelfInfo = () => {
  return fetchAPI(
    "admin/info",
    fetchSelfInfoStarted,
    fetchSelfInfoSuccess,
    fetchSelfInfoFailure
  );
};
