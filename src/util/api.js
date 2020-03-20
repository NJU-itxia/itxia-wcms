import axios from "axios";
import { config } from "CONFIG";

const urlPrefix = (() => {
  const { host, protocol } = config.network.api;
  return protocol + "://" + host;
})();

/**
 * 同时支持promise和callback的API请求方法.
 * @param {String} path url path
 * @param {String} method HTTP method
 * @param {*} data request data
 * @param {function?} callback
 */
function requestData(path, method, data, callback) {
  const myPromise = new Promise((resolve, reject) => {
    axios({
      method,
      url: urlPrefix + path,
      data,
      withCredentials: true
    })
      .then(res => {
        const json = res.data;
        if (!!!json) {
          reject("返回值格式错误"); //绝不应该出现的错误
          return;
        }
        if (json.errorCode === 0) {
          //请求成功，直接返回payload
          resolve(json.payload);
        } else {
          //返回值错误
          let message = json.errorMessage;
          if (json.payload) {
            message += ": " + json.payload.toString().substring(0, 32); //避免过长的错误信息.
          }
          const reason = { message, data: json };
          reason.toString = function() {
            return this.message; //就算忘了(其实是懒了) .message，也能直接获得错误信息
          };
          reject(reason);
        }
      })
      .catch(e => {
        //请求失败，网络、json解析错误等原因...
        const reason = Object.assign(e, {
          message: e.toString()
        });
        reject(reason);
      });
  });
  /**
   * 如果提供了callback，则调用callback
   * 如果没有callback，就返回promise
   */
  if (typeof callback === "function") {
    myPromise
      .then(data => {
        callback(null, data);
      })
      .catch(reason => {
        callback(reason, null);
      });
    return null;
  } else {
    return myPromise;
  }
}

const GET = (path, callback) => {
  return requestData(path, "GET", undefined, callback);
};
const POST = (path, data, callback) => {
  return requestData(path, "POST", data, callback);
};
const PUT = (path, data, callback) => {
  return requestData(path, "PUT", data, callback);
};

export { GET, POST, PUT };
