import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as loginReducer } from "./components/login/index";
import { reducer as mainPageReducer } from "./components/mainPage/index";
import { reducer as selfInfoReducer } from "./components/selfInfo";
import { reducer as memberListReducer } from "./components/memberList";
import { reducer as addMemberReducer } from "./components/addMember";
//import { reducer as navigateReducer } from "./components/navigate";

const middlewares = [thunkMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancers = composeEnhancers(
  applyMiddleware(...middlewares)
);
const reducer = combineReducers({
  login: loginReducer,
  mainPage: mainPageReducer,
  selfInfo: selfInfoReducer,
  memberList: memberListReducer,
  addMember: addMemberReducer
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
