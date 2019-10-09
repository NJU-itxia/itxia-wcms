import * as actionTypes from "./actionTypes";
export const changePage = pageKey => ({
    type: actionTypes.CHANGE_PAGE,
    newPage: pageKey
  });