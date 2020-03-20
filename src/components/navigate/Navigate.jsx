import { Menu, Icon } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "../logout";
import { routePath } from "../../route/routePath";
import "./style.css";

const { SubMenu } = Menu;

function Navigate() {
  return (
    <Menu
      defaultSelectedKeys={[window.location.pathname]}
      mode="horizontal"
      theme="dark"
      overflowedIndicator={
        <div>
          <Icon type="menu" />
          菜单
        </div>
      }
    >
      <Menu.Item key={routePath.DASHBOARD}>
        <Icon type="dashboard" />
        DashBoard
        <Link to={routePath.DASHBOARD}></Link>
      </Menu.Item>
      <Menu.Item key={routePath.HANDLE_ORDER_NEW}>
        <Icon type="calendar" />
        预约单
        <Link to={routePath.HANDLE_ORDER_NEW}></Link>
      </Menu.Item>
      <SubMenu
        title={
          <span>
            <Icon type="appstore" />
            管理员
          </span>
        }
      >
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
        <Menu.Item key={routePath.ANNOUNCE}>
          <Icon type="form" />
          发布公告
          <Link to={routePath.ANNOUNCE}></Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key={routePath.SELF_INFO}>
        <Icon type="smile" />
        个人信息
        <Link to={routePath.SELF_INFO}></Link>
      </Menu.Item>
      <SubMenu
        title={
          <span>
            <Icon type="experiment" />
            实验功能
          </span>
        }
      >
        <Menu.Item key={routePath.TAG_MANAGE}>
          <Icon type="tags" />
          管理标签
          <Link to={routePath.TAG_MANAGE}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.IMG_HOST}>
          <Icon type="picture" />
          图床服务
          <Link to={routePath.IMG_HOST}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.REQUEST_ORDER}>
          <Icon type="calendar" />
          发起预约
          <Link to={routePath.REQUEST_ORDER}></Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="logout">
        <LogoutButton />
      </Menu.Item>
    </Menu>
  );
}

export { Navigate };
