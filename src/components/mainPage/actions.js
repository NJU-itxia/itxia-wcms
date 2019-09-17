import * as actionTypes from "./actionTypes";
import createMyFetch from "../../util/network";

export const changePage = newPage => ({
  type: actionTypes.CHANGE_PAGE,
  newPage
});


const myFetch = createMyFetch();

export const fetchStarted = () => ({ type: actionTypes.FETCH_STARTED });
export const fetchSuccess = result => ({
  type: actionTypes.FETCH_SUCCESS,
  result
});
export const fetchFailure = error => ({
  type: actionTypes.FETCH_FAILURE,
  error
});

export const getUserInfo = () => {
  return myFetch(
    "admin/info",
    {
      method: "POST",
      body: JSON.stringify({})
    },
    fetchStarted,
    fetchSuccess,
    fetchFailure
  );
};
