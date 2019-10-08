import status from "./requestStatus";
import config from "../config/config";
const apiHost = config.network.api.host;
const protocol = config.network.api.protocol;

export const sendRequest = (requestName, uri, method, body, actionCreator) => {
  return rawDispatch => {
    const fetchConfig = {
      method,
      body
    };
    uri = `${protocol}://${apiHost}/${uri}`;
    Object.assign(fetchConfig, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    //封装dispatch
    const dispatch = (status, json, error) => {
      rawDispatch(
        actionCreator({
          requestName,
          status,
          json,
          error
        })
      );
    };

    dispatch(status.idle);

    fetch(uri, fetchConfig)
      .then(response => {
        if (response.ok) {
          if (response.body === "POST") {
            //浏览器会自动发一个OPTIONS请求...
            return;
          }
          response
            .text()
            .then(responseJson => {
              //请求成功
              dispatch(status.succ, JSON.parse(responseJson));
            })
            .catch(error => {
              dispatch(status.error, null, "JSON解析错误");
            });
        } else {
          dispatch(status.error, null, "未知错误");
        }
      })
      .catch(error => {
        dispatch(status.error, null, error);
      });
  };
};
