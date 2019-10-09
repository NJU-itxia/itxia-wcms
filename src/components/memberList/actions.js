import * as actionTypes from "./actionTypes";
import { sendRequest } from "../../util/request";


export const nitificated = () => ({
  type: actionTypes.NOTIFICATED
});

export const getAllMemberInfoCallback = result => ({
  type: actionTypes.GET_ALL_MEMBER_INFO,
  payload: result
});

export const getAllMemberInfo = () => {
  return sendRequest(
    "getAllMemberInfo",
    "admin/member/all",
    "POST",
    JSON.stringify({}),
    getAllMemberInfoCallback
  );
};

export const getAllAppointmentCallback = result => ({
  type: actionTypes.GET_ALL_APPOINTMENTS,
  payload: result
});

export const getAllAppointment = () => {
  return sendRequest(
    "getAllAppointments",
    "admin/appointment/all",
    "POST",
    JSON.stringify({}),
    getAllAppointmentCallback
  );
};
