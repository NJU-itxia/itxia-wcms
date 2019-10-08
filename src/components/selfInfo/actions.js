import * as actionTypes from "./actionTypes";
import createMyFetch from "../../util/network";
import { sendRequest } from "../../util/request";

const myFetch = createMyFetch();

export const updateStarted = () => ({
  type: actionTypes.UPDATE_USERINFO_STARTED
});
export const updateSuccess = result => ({
  type: actionTypes.UPDATE_USERINFO_SUCCESS,
  result
});
export const updateFailure = error => ({
  type: actionTypes.UPDATE_USERINFO_FAILURE,
  error
});

export const updateUserInfo = newInfo => {
  return myFetch(
    "admin/updateInfo",
    {
      method: "POST",
      body: JSON.stringify(newInfo)
    },
    updateStarted,
    updateSuccess,
    updateFailure
  );
};

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
