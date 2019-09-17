import * as actions from "./actions";
import React from "react";
import "./style.css";
import { view as Navigate } from "../navigate/index";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { view as Avatar } from "../avatar/index";
import { view as SelfInfo } from "../selfInfo/index";

const { Header } = Layout;

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
      <Layout>
        <Header>
          <div className="logo"></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">后台管理</Menu.Item>
            <Menu.Item key="2">预约系统</Menu.Item>
            <Menu.Item key="3">统计信息</Menu.Item>
            <Menu.Item
              style={{
                float: "right"
              }}
            >
              <Avatar></Avatar>
            </Menu.Item>
          </Menu>
        </Header>
        <div className="mid">
          <aside className="navigate">
            <Navigate></Navigate>
          </aside>
          <div className="page">
            {this.props.page === "selfInfo" ? (
              <SelfInfo></SelfInfo>
            ) : (
              <div>功能开发中...</div>
            )}
          </div>
        </div>
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
