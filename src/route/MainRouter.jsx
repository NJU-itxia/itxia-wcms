import React, { useEffect } from "react";
import { routePath } from "./routePath";
import { Login } from "COMPONENTS/login";
import { Home } from "COMPONENTS/home";
import { Recovery } from "COMPONENTS/recovery";
import { UserInfoProvider } from "CONTEXT/UserInfo";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useLocation
} from "react-router-dom";
import { NotFound } from "COMPONENTS/notFound";
import { mapPathnameToTitle } from "./mapPathnameToTitle";

function TopLevelRouter() {
  //根据pathname，更新title
  const location = useLocation();
  useEffect(() => {
    document.title = mapPathnameToTitle(location.pathname);
  }, [location]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={routePath.LOGIN} />
      </Route>
      <Route path={routePath.LOGIN}>
        <Login />
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
        <NotFound />
      </Route>
    </Switch>
  );
}

function MainRouter() {
  return (
    <Router>
      <TopLevelRouter />
    </Router>
  );
}

export { MainRouter };
