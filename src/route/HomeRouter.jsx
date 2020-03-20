import React from "react";
import { routePath } from "./routePath";
import { Route, Redirect, Switch } from "react-router-dom";

import { SelfInfo } from "COMPONENTS/selfInfo";
import { MemberList } from "COMPONENTS/memberList";
import { AddMember } from "COMPONENTS/addMember";
import { RequestOrder } from "COMPONENTS/requestOrder";
import { TagManage } from "COMPONENTS/tagManage";
import { DashBoard } from "COMPONENTS/dashboard";
import { AnnouncementEditor } from "COMPONENTS/announcementEditor";
import { HandleOrder } from "COMPONENTS/handleOrderNew";
import { NotFound } from "COMPONENTS/notFound/NotFound";

function HomeRouter() {
  return (
    <Switch>
      <Route exact={true} path={routePath.HOME}>
        <Redirect to={routePath.DASHBOARD} />
      </Route>
      <Route path={routePath.SELF_INFO}>
        <SelfInfo />
      </Route>
      <Route path={routePath.MEMBER_LIST}>
        <MemberList />
      </Route>
      <Route path={routePath.ADD_MEMBER}>
        <AddMember />
      </Route>
      <Route path={routePath.REQUEST_ORDER}>
        <RequestOrder />
      </Route>
      <Route path={routePath.HANDLE_ORDER_NEW}>
        <HandleOrder />
      </Route>
      <Route path={routePath.TAG_MANAGE}>
        <TagManage />
      </Route>
      <Route path={routePath.DASHBOARD}>
        <DashBoard />
      </Route>
      <Route path={routePath.ANNOUNCE}>
        <AnnouncementEditor />
      </Route>
      <Route path={routePath.HANDLE_ORDER}>
        <HandleOrder />
      </Route>
      <Route path={routePath.IMG_HOST}>
        <NotFound />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export { HomeRouter };
