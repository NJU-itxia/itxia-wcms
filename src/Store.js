import { createStore, compose } from "redux";
import reducer from "./Reducer";

const win = window;
const storeEnhancers = compose(
  win && win.devToolsExtension ? win.devToolsExtension() : f => f
);

const initState = {
  isLogin: false,
  user: ""
};
export default createStore(reducer, initState, storeEnhancers);
