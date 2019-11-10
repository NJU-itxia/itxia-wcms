import { Menu, Icon } from "antd";
import React from "react";
import { connect } from "react-redux";
import "./style.css";
import { changePage } from "./actions";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

class Sider extends React.Component {
  constructor(props) {
    super(props);
    this.pageSelectHandler = this.pageSelectHandler.bind(this);
  }
  state = {
    mode: "inline",
    theme: "dark"
  };

  pageSelectHandler(args) {
    this.props.onPageSelect(args.key);
  }

  render() {
    return (
      <Menu
        defaultSelectedKeys={["selfInfo"]}
        defaultOpenKeys={["sub1"]}
        mode={this.state.mode}
        theme={this.state.theme}
        onSelect={this.pageSelectHandler}
      >
        <Menu.Item key="selfInfo">
          <Icon type="smile" />
          个人信息
          <Link to="/home/self"></Link>
        </Menu.Item>
        <Menu.Item key="memberList">
          <Icon type="ordered-list" />
          成员列表
          <Link to="/home/member"></Link>
        </Menu.Item>
        <Menu.Item key="addMember">
          <Icon type="user-add" />
          添加成员
          <Link to="/home/addMember"></Link>
        </Menu.Item>
        <Menu.Item key="requestOrder">
          <Icon type="user-add" />
          发起预约
          <Link to="/home/request"></Link>
        </Menu.Item>
        <Menu.Item key="handleOrder">
          <Icon type="user-add" />
          查看预约
          <Link to="/home/handle"></Link>
        </Menu.Item>
        <Menu.Item key="tagManage">
          <Icon type="user-add" />
          管理标签
          <Link to="/home/tag"></Link>
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
