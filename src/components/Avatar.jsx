import { Avatar, Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../Actions";
import "./Avatar.css";

const UserList = ["U", "Lucy", "Tom", "Edward"];
const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

const color = "#f56a00"

function AutosetAvatar({user,onLogout}) {
  return (
    <div className="avatar">
      <Avatar
        style={{ backgroundColor: color, verticalAlign: "middle" }}
        size="large"
      >
        {user}
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
  return {
    user: state.user
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
