import React from "react";
import { view as Login } from "./components/login";
import { view as MainPage } from "./components/mainPage";
import { connect } from "react-redux";
//import "./App.css";

function App({ isLogin }) {
  if (isLogin) {
    return <MainPage></MainPage>;
  } else {
    return <Login></Login>;
  }
}

const mapState = state => {
  return { isLogin: state.login.isLogin ? state.login.isLogin : false };
};

export default connect(mapState)(App);
