import { Menu, Icon } from "antd";
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
            <Icon type="smile" />
            个人信息
          </Menu.Item>
          <Menu.Item key="memberList">
            <Icon type="ordered-list" />
            成员列表
          </Menu.Item>
          <Menu.Item key="addMember">
            <Icon type="user-add" />
            添加成员
          </Menu.Item>
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
