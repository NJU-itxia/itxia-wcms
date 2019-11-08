import axios from "axios";
import * as config from "../config/config";
const host = (() => {
  const { host, protocol } = config.default.network.api;
  return protocol + "://" + host;
})();

export const post = function(path, data) {
  return axios.post(host + path, data,{
      withCredentials:true
  });
}
