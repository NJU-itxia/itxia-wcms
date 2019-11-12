import { EventEmitter } from "events";
import axios from "axios";
import * as config from "../config/config";

const host = (() => {
  const { host, protocol } = config.default.network.api;
  return protocol + "://" + host;
})();

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
      } else {
        //请求成功，但返回值错误
        let message = json.errorMessage;
        if (json.payload) {
          message += ": " + json.payload.toString().substring(0, 32); //避免过长的错误信息.
        }
        emitter.emit("fail", message, json);
      }
    })
    .catch(e => {
      //请求失败，网络、json原因...
      emitter.emit("error", e);
    });
  return emitter;
};

export const post = (path, data) => {
  return request(path, "POST", data);
};

export const get = path => {
  return request(path, "GET");
};
