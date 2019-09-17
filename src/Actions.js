import * as ActionTypes from "./ActionTypes";

export const login = (username) => {
  return {
    type: ActionTypes.LOGIN,
    user: username
  };
};

export const logout = ()=>{
    return{
        type: ActionTypes.LOGOUT
    }
}