import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./Reducer";
import thunkMiddleware from "redux-thunk";

const win = window;
const middlewares = [thunkMiddleware];
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  win && win.devToolsExtension ? win.devToolsExtension() : f => f
);

const initState = {
  isLogin: false,
  user: "",
  page: undefined,
  selfInfo: {
    //个人信息
    loading: false,
    error: undefined,
    data: undefined
  }
};
export default createStore(reducer, initState, storeEnhancers);
