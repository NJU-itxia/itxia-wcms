import * as actionTypes from "./actionTypes";
import { sendRequest } from "../../util/request";


export const nitificated = () => ({
  type: actionTypes.NOTIFICATED
});

export const addMemberCallback = result => ({
  type: actionTypes.ADD_MEMBER,
  payload: result
});

export const addMember = newMember => {
  return sendRequest(
    "addMember",
    "admin/member/create",
    "PUT",
    JSON.stringify(newMember),
    addMemberCallback
  );
};
