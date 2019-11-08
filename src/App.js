import React from "react";
import { view as Login } from "./components/login";
import { view as MainPage } from "./components/mainPage";
import { view as SelfInfo } from "./components/selfInfo";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Redirect to="/login"></Redirect>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/home">
          <nav>
            <ul>
              <li>
                <Link to="/home/self">个人信息</Link>
              </li>
              <li>
                <Link to="/home/member">成员列表</Link>
              </li>
              <li>
                <Link to="/login">注销</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact={true} path="/home">
              <Redirect to="/home/self"></Redirect>
            </Route>
            <Route path="/home/self">
              <span>self</span>
              <SelfInfo></SelfInfo>
            </Route>
            <Route path="*">
              <span>page not found</span>
              <Link to="/home/self">back</Link>
            </Route>
          </Switch>
        </Route>
        <Route>
          <span>Page not found.</span>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
