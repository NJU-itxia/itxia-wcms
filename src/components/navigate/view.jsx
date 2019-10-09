import { Menu, Icon, Switch } from "antd";
import React from "react";
import { connect } from "react-redux";
import "./style.css";
import { changePage } from "./actions";
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
    console.debug(args.key);
    this.props.onPageSelect(args.key);
  }

  render() {
    return (
      <div>
        <Menu
          style={{ width: "100%" }}
          defaultSelectedKeys={["selfInfo"]}
          defaultOpenKeys={["sub1"]}
          mode={this.state.mode}
          theme={this.state.theme}
          onSelect={this.pageSelectHandler}
        >
          <Menu.Item key="selfInfo">
            <Icon type="mail" />
            个人信息
          </Menu.Item>
          <Menu.Item key="memberList">
            <Icon type="calendar" />
            成员列表
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Three</span>
              </span>
            }
          >
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
            <SubMenu key="sub1-2" title="Submenu">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="setting" />
                <span>Navigation Four</span>
              </span>
            }
          >
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
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
