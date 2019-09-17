import * as ActionTypes from "./actionTypes";
import createMyFetch from "../../util/network";

const myFetch = createMyFetch();

export const fetchStarted = () => ({ type: ActionTypes.FETCH_STARTED });
export const fetchSuccess = result => ({
  type: ActionTypes.FETCH_SUCCESS,
  result
});
export const fetchFailure = error => ({
  type: ActionTypes.FETCH_FAILURE,
  error
});

export const login = (username, password) => {
  return myFetch(
    "admin/login",
    {
      method: "POST",
      body: JSON.stringify({
        id: username,
        password: password
      })
    },
    fetchStarted,
    fetchSuccess,
    fetchFailure
  );
};
