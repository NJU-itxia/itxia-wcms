import React from "react";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
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
  return {isLogin: state.isLogin}
};

export default connect(mapState)(App);
