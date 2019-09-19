import * as actionTypes from "./actionTypes";
import createMyFetch from "../../util/network";

const myFetch = createMyFetch();

export const updateStarted = () => ({ type: actionTypes.UPDATE_USERINFO_STARTED });
export const updateSuccess = result => ({
  type: actionTypes.UPDATE_USERINFO_SUCCESS,
  result
});
export const updateFailure = error => ({
  type: actionTypes.UPDATE_USERINFO_FAILURE,
  error
});

export const updateUserInfo = (newInfo) => {
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
