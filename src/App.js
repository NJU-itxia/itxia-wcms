import React from "react";
import { view as Login } from "./components/login";
import { view as MainPage } from "./components/mainPage";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Route exact={true} path="/">
        <Redirect to="/login"></Redirect>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/home">
        <MainPage></MainPage>
      </Route>
      <Route path="*">
        <span>Page not found.</span>
      </Route>
    </Router>
  );
}

export default App;
