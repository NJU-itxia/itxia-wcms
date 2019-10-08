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

    dispatch(status.PENDING);

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
              dispatch(status.SUCC, JSON.parse(responseJson));
            })
            .catch(error => {
              dispatch(status.ERROR, null, `未知错误:${error}`);
            });
        } else {
          dispatch(status.ERROR, null, "未知错误");
        }
      })
      .catch(error => {
        dispatch(status.ERROR, null, error);
      });
  };
};
