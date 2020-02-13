import React from "react";
import { view as Login } from "./components/login";
import { view as SelfInfo } from "./components/selfInfo";
import { view as Navigate } from "./components/navigate";
import { view as MemberList } from "./components/memberList";
import { view as AddMember } from "./components/addMember";
import { view as RequestOrder } from "./components/requestOrder";
import { view as HandleOrder } from "./components/handleOrder";
import { view as TagManage } from "./components/tagManage";
import { view as DashBoard } from "./components/dashboard";
import { AnnouncementEditor } from "./components/announcement";
import { HandleOrderNew } from "./components/handleOrderNew";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import Recovery from "./components/recovery";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";
import "./App.css";
import { Layout, Icon } from "antd";
import routePath from "./util/routePath";
import { view as Footer } from "./components/footer";

const { Sider, Header, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
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
            <Layout
              style={{
                height: "100%"
              }}
            >
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                collapsedWidth="0"
                breakpoint="md"
                onCollapse={isCollapsed => {
                  this.setState({ collapsed: isCollapsed });
                }}
              >
                <div id="sider-logo" />
                <Navigate></Navigate>
              </Sider>
              <Layout>
                <Header style={{ background: "#fff", padding: 0 }}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                  />
                  <div
                    id="header-right"
                    style={{
                      display: "inline",
                      float: "right",
                      marginRight: "2em"
                    }}
                  >
                    <Logout />
                  </div>
                </Header>
                <Content id="main-content">
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
                </Content>
                <Footer />
              </Layout>
            </Layout>
          </Route>
          <Route>
            <span>Page not found.</span>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
