import React from "react";
import { view as Login } from "./components/login";
import { view as MainPage } from "./components/mainPage";
import { connect } from "react-redux";
import "./App.css";

function App({ isLogin }) {
  return (
    <div className="App">
      {isLogin?<MainPage></MainPage>:<Login></Login>}
    </div>
  )
}

const mapState = state => {
  return { isLogin: state.login.isLogin ? state.login.isLogin : false };
};

export default connect(mapState)(App);
