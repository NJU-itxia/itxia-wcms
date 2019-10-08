import * as actionTypes from "./actionTypes";
import { sendRequest } from "../../util/request";


export const nitificated = () => ({
  type: actionTypes.NOTIFICATED
});

export const updateSelfInfoCallback = result => ({
  type: actionTypes.UPDATE_SELFINFO,
  payload: result
});

export const updateSelfInfo = newInfo => {
  return sendRequest(
    "selfInfo",
    "admin/updateInfo",
    "POST",
    JSON.stringify(newInfo),
    updateSelfInfoCallback
  );
};
