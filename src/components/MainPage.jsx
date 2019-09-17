import store from "../Store";
import actions from "../Actions";
import React from "react";
import "./MainPage.css";
import Navigate from "./Navigate";
import { connect } from "react-redux";
import { Layout, Menu} from "antd";
import Avatar from "./Avatar";

const { Header } = Layout;

class MainPage extends React.Component {
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
            <Menu.Item style={{
                "float":"right"
                
            }}><Avatar></Avatar></Menu.Item>
          </Menu>
          
        </Header>
        <Navigate></Navigate>
          <p>{this.props.user ? this.props.user : "未登录"}</p>
      </Layout>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    isLogin: state.isLogin
  };
};

export default connect(mapState)(MainPage);
