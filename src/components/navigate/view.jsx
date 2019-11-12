import { Menu, Icon } from "antd";
import React from "react";
import { connect } from "react-redux";
import "./style.css";
import { changePage } from "./actions";
import { Link } from "react-router-dom";
import routePath from "../../util/routePath";

const { SubMenu } = Menu;

class Sider extends React.Component {
  constructor(props) {
    super(props);
    this.pageSelectHandler = this.pageSelectHandler.bind(this);
  }
  state = {
    mode: "inline",
    theme: "dark",
    path: window.location.pathname
  };

  pageSelectHandler(args) {
    this.props.onPageSelect(args.key);
  }

  render() {
    return (
      <Menu
        defaultSelectedKeys={[this.state.path]}
        mode={this.state.mode}
        theme={this.state.theme}
        onSelect={this.pageSelectHandler}
      >
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
          <Icon type="user-add" />
          发起预约
          <Link to={routePath.REQUEST_ORDER}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.HANDLE_ORDER}>
          <Icon type="user-add" />
          查看预约
          <Link to={routePath.HANDLE_ORDER}></Link>
        </Menu.Item>
        <Menu.Item key={routePath.TAG_MANAGE}>
          <Icon type="user-add" />
          管理标签
          <Link to={routePath.TAG_MANAGE}></Link>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapDispatch = dispatch => ({
  onPageSelect: pageKey => {
    //TODO
    dispatch(changePage(pageKey));
  }
});

export default connect(
  null,
  mapDispatch
)(Sider);
