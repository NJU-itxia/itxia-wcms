import React from "react";
import { routePath } from "./routePath";
import { Login } from "COMPONENTS/login";
import { Home } from "COMPONENTS/home";
import { Recovery } from "COMPONENTS/recovery";
import { UserInfoProvider } from "CONTEXT/UserInfo";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Redirect to={routePath.LOGIN}></Redirect>
        </Route>
        <Route path={routePath.LOGIN}>
          <Login></Login>
        </Route>
        <Route path={routePath.RECOVERY}>
          <Recovery />
        </Route>
        <Route path={routePath.HOME}>
          <UserInfoProvider>
            <Home />
          </UserInfoProvider>
        </Route>
        <Route>
          <span>Page not found.</span>
        </Route>
      </Switch>
    </Router>
  );
}

export { MainRouter };
