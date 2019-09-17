import { Avatar, Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import "./style.css";

const color = "#f56a00";

function AutosetAvatar({ name, onLogout }) {
  return (
    <div className="avatar">
      <Avatar
        style={{ backgroundColor: color, verticalAlign: "middle" }}
        size="large"
      >
        {name}
      </Avatar>
      <Button
        size="small"
        style={{ marginLeft: 16, verticalAlign: "middle" }}
        onClick={onLogout}
      >
        退出登录
      </Button>
    </div>
  );
}

const mapState = state => {
  let name = "未知用户";
  if (
    state.mainPage &&
    state.mainPage.userInfo &&
    state.mainPage.userInfo.data &&
    state.mainPage.userInfo.data.name
  ) {
    name = state.mainPage.userInfo.data.name;
  }
  return {
    name
  };
};

const mapDispatch = dispatch => {
  return {
    onLogout: () => {
      dispatch(actions.logout());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(AutosetAvatar);
