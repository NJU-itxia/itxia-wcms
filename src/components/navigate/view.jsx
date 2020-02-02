import { Menu, Icon } from "antd";
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import routePath from "../../util/routePath";

class Sider extends React.Component {
  state = {
    mode: "inline",
    theme: "dark",
    path: window.location.pathname
  };

  render() {
    return (
      <Menu
        defaultSelectedKeys={[this.state.path]}
        mode={this.state.mode}
        theme={this.state.theme}
        onSelect={this.pageSelectHandler}
      >
        <Menu.Item key={routePath.DASHBOARD}>
          <Icon type="dashboard" />
          DashBoard
          <Link to={routePath.DASHBOARD}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.SELF_INFO}>
          <Icon type="smile" />
          个人信息
          <Link to={routePath.SELF_INFO}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.MEMBER_LIST}>
          <Icon type="ordered-list" />
          成员列表
          <Link to={routePath.MEMBER_LIST}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.ADD_MEMBER}>
          <Icon type="user-add" />
          添加成员
          <Link to={routePath.ADD_MEMBER}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.REQUEST_ORDER}>
          <Icon type="calendar" />
          发起预约
          <Link to={routePath.REQUEST_ORDER}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.HANDLE_ORDER}>
          <Icon type="table" />
          查看预约
          <Link to={routePath.HANDLE_ORDER}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.TAG_MANAGE}>
          <Icon type="tags" />
          管理标签
          <Link to={routePath.TAG_MANAGE}></Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sider;
