import { EventEmitter } from "events";
import axios from "axios";
import * as config from "../config/config";

const host = (() => {
  const { host, protocol } = config.default.network.api;
  return protocol + "://" + host;
})();

const request = (path, method, data) => {
  const emitter = new EventEmitter();
  axios
    .post(host + path, data, {
      method,
      withCredentials: true
    })
    .then(res => {
      const json = res.data;
      if (json && json.errorCode === 0) {
        //请求成功
        emitter.emit("succ", json.payload);
      } else {
        //请求成功，但返回值错误
        emitter.emit("fail", json);
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
