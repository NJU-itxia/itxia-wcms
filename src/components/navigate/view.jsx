import { Menu, Icon } from "antd";
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import routePath from "../../util/routePath";

class Sider extends React.Component {
  state = {
    mode: "inline",
    theme: "dark"
  };

  render() {
    return (
      <Menu
        defaultSelectedKeys={[window.location.pathname]}
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
        <Menu.Item key={routePath.HANDLE_ORDER_NEW}>
          <Icon type="table" />
          查看预约
          <Link to={routePath.HANDLE_ORDER_NEW}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.TAG_MANAGE}>
          <Icon type="tags" />
          管理标签
          <Link to={routePath.TAG_MANAGE}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.ANNOUNCE}>
          <Icon type="form" />
          发布公告
          <Link to={routePath.ANNOUNCE}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.IMG_HOST}>
          <Icon type="picture" />
          图床服务
          <Link to={routePath.IMG_HOST}></Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sider;
