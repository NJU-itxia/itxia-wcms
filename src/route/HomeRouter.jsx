import React from "react";
import routePath from "./routePath";
import { Route, Redirect, Switch, Link } from "react-router-dom";

import { view as SelfInfo } from "../components/selfInfo";
import { view as MemberList } from "../components/memberList";
import { view as AddMember } from "../components/addMember";
import { view as RequestOrder } from "../components/requestOrder";
import { view as HandleOrder } from "../components/handleOrder";
import { view as TagManage } from "../components/tagManage";
import { view as DashBoard } from "../components/dashboard";
import { AnnouncementEditor } from "../components/announcement";
import { HandleOrderNew } from "../components/handleOrderNew";
import NotFound from "../components/notFound";

function HomeRouter(props) {
  return (
    <Switch>
      <Route exact={true} path={routePath.HOME}>
        <Redirect to={routePath.DASHBOARD}></Redirect>
      </Route>
      <Route path={routePath.SELF_INFO}>
        <SelfInfo></SelfInfo>
      </Route>
      <Route path={routePath.MEMBER_LIST}>
        <MemberList></MemberList>
      </Route>
      <Route path={routePath.ADD_MEMBER}>
        <AddMember></AddMember>
      </Route>
      <Route path={routePath.REQUEST_ORDER}>
        <RequestOrder></RequestOrder>
      </Route>
      <Route path={routePath.HANDLE_ORDER_NEW}>
        <HandleOrderNew />
      </Route>
      <Route path={routePath.TAG_MANAGE}>
        <TagManage></TagManage>
      </Route>
      <Route path={routePath.DASHBOARD}>
        <DashBoard></DashBoard>
      </Route>
      <Route path={routePath.ANNOUNCE}>
        <AnnouncementEditor />
      </Route>
      <Route path={routePath.HANDLE_ORDER}>
        <HandleOrder></HandleOrder>
      </Route>
      <Route path={routePath.IMG_HOST}>
        <NotFound />
      </Route>
      <Route path="*">
        <span>page not found</span>
        <Link to={routePath.SELF_INFO}>back</Link>
      </Route>
    </Switch>
  );
}

export { HomeRouter };
