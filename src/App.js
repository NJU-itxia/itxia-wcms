import React from "react";
import { view as Login } from "./components/login";
import { view as MainPage } from "./components/mainPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/home">
        <MainPage></MainPage>
      </Route>
    </Router>
  );
}

export default App;
