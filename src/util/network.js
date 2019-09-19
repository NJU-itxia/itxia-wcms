import config from "../config/config";
const apiHost = config.network.api.host;
const protocol = config.network.api.protocol;

const createMyFetch = () => {
  let reqID = 0;
  const myFetch = (
    uri,
    fetchConfig, //fetch的参数
    startAction,
    successAction,
    failureAction
  ) => {
    return dispatch => {
      const mReqID = ++reqID;
      const dispatchIfVaild = action => {
        if (reqID === mReqID) {
          return dispatch(action);
        }
      };

      //添油加醋一下...
      uri = `${protocol}://${apiHost}/${uri}`;
      Object.assign(fetchConfig, {
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      console.debug(`fetching:${uri}`);
      dispatchIfVaild(startAction());
      fetch(uri, fetchConfig)
        .then(response => {
          if (response.ok) {
            //请求成功
            console.debug(`request succ`);
            if (response.body === "POST") {
              return;
            }
            response
              .text()
              .then(responseJson => {
                //返回json
                console.debug(`收到json:${responseJson}`);
                dispatchIfVaild(successAction(responseJson));
              })
              .catch(error => {
                console.debug(`解析json出错:${error}`);
                //dispatchIfVaild(failureAction(error));
              });
          } else {
            dispatchIfVaild(failureAction(`请求错误:${response.status}`));
          }
        })
        .catch(error => {
          dispatchIfVaild(failureAction(error));
        });
    };
  };
  return myFetch;
};
export default createMyFetch;
