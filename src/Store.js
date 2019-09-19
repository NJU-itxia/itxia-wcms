import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as loginReducer } from "./components/login/index";
import { reducer as mainPageReducer } from "./components/mainPage/index";
import { reducer as selfInfoReducer } from "./components/selfInfo";
import { reducer as avatarReducer } from "./components/avatar/index";
//import { reducer as navigateReducer } from "./components/navigate";

const win = window;
const middlewares = [thunkMiddleware];
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  win && win.devToolsExtension ? win.devToolsExtension() : f => f
);
const reducer = combineReducers({
  login: loginReducer,
  mainPage: mainPageReducer,
  selfInfo: selfInfoReducer
});

const initState = {
  login: {
    //登录状态
    isLogin: false,
    error: null
  },
  mainPage: {
    page: null, //当前页面
    userInfo: {
      //个人信息
      loading: false,
      error: null,
      data: null
    }
  }
};
export default createStore(reducer, initState, storeEnhancers);
