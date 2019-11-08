import React from "react";
import { view as Login } from "./components/login";
import { view as MainPage } from "./components/mainPage";
import { view as SelfInfo } from "./components/selfInfo";
import { view as Navigate } from "./components/navigate";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";
import "./App.css";
import { Layout, Menu, Icon } from "antd";
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
            <Redirect to="/login"></Redirect>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/home">
            <Layout style={{
              height: "100%"
            }}>
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                collapsedWidth="0"
                breakpoint="sm" //TODO 不生效?
              >
                <div className="logo" />
                <Navigate></Navigate>
              </Sider>
              <Layout>
                <Header style={{ background: "#fff", padding: 0 }}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                  />
                </Header>
                <Content
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    background: "#fff",
                    minHeight: 280
                  }}
                >
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
                </Content>
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
