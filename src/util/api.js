import { EventEmitter } from "events";
import axios from "axios";
import * as config from "../config/config";

const host = (() => {
  const { host, protocol } = config.default.network.api;
  return protocol + "://" + host;
})();
/**
 * @deprecated
 */
const request = (path, method, data) => {
  const emitter = new EventEmitter();
  axios({
    method,
    url: host + path,
    data,
    withCredentials: true
  })
    .then(res => {
      const json = res.data;
      if (json && json.errorCode === 0) {
        //请求成功
        emitter.emit("succ", json.payload);
        emitter.emit("any");
      } else {
        //请求成功，但返回值错误
        let message = json.errorMessage;
        if (json.payload) {
          message += ": " + json.payload.toString().substring(0, 32); //避免过长的错误信息.
        }
        emitter.emit("fail", message, json);
        emitter.emit("any");
      }
    })
    .catch(e => {
      //请求失败，网络、json原因...
      emitter.emit("error", e);
      emitter.emit("any");
    });
  return emitter;
};

export const put = (path, data) => {
  return request(path, "PUT", data);
};

export const post = (path, data) => {
  return request(path, "POST", data);
};

export const get = path => {
  return request(path, "GET");
};

//---------------------------------------------------------------

export const GET = (path, callback) => {
  return requestData(path, "GET", undefined, callback);
};
export const POST = (path, data, callback) => {
  return requestData(path, "POST", data, callback);
};
export const PUT = (path, data, callback) => {
  return requestData(path, "PUT", data, callback);
};

/**
 * 同时支持promise和callback的请求.
 * @param {*} callback
 */
function requestData(path, method, data, callback) {
  const myPromise = new Promise((resolve, reject) => {
    axios({
      method,
      url: host + path,
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
        reject(e.toString());
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
