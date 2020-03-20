import React from "react";
import { routePath } from "./routePath";
import { Route, Redirect, Switch, Link } from "react-router-dom";

import { SelfInfo } from "../components/selfInfo";
import { MemberList } from "../components/memberList";
import { AddMember } from "../components/addMember";
import { RequestOrder } from "../components/requestOrder";
import { TagManage } from "../components/tagManage";
import { DashBoard } from "../components/dashboard";
import { AnnouncementEditor } from "../components/announcementEditor";
import { HandleOrder } from "COMPONENTS/handleOrderNew";
import { NotFound } from "COMPONENTS/notFound/NotFound";

function HomeRouter() {
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
        <HandleOrder />
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
