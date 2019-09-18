import * as actions from "./actions";
import React from "react";
import "./style.css";
import { view as Navigate } from "../navigate/index";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { view as Avatar } from "../avatar/index";
import { view as SelfInfo } from "../selfInfo/index";

const { Header, Sider, Content, Footer } = Layout;

class MainPage extends React.Component {
  componentDidMount() {
    //先获取个人信息(为了显示名字、头像...)
    this.props.onGetUserInfo();

    if (!this.props.page) {
      //切换到默认页
      this.props.onChangPage("selfInfo");
    }
    //获取个人信息
  }
  render() {
    return (
      <Layout className="mainPage">
        <Header>
          <div className="logo"></div>
          <Avatar className="avatar"></Avatar>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Navigate></Navigate>
          </Sider>
          <Layout>
            <Content style={{ margin: "24px 16px 0" }}>
              <div className="mid">
                <div className="page">
                  {this.props.page === "selfInfo" ? (
                    <SelfInfo></SelfInfo>
                  ) : (
                    <div>功能开发中...</div>
                  )}
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              南京大学IT侠-web组 © 2019
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapState = state => {
  let page, userInfo;
  if (state.mainPage) {
    page = state.mainPage.page;
    if (state.mainPage.userInfo) {
      userInfo = state.mainPage.userInfo;
    }
  }
  return {
    page,
    userInfo
  };
};
const mapDispatch = dispatch => ({
  onGetUserInfo: () => {
    dispatch(actions.getUserInfo());
  },
  onChangPage: page => {
    dispatch(actions.changePage(page));
  }
});

export default connect(
  mapState,
  mapDispatch
)(MainPage);