import { Modal } from "antd";
import React from "react";
import * as api from "../../util/api";
import MemberListTable from "./MemberListTable";

class NestedTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleActionDone = this.handleActionDone.bind(this);
  }
  state = {
    loading: false,
    data: []
  };

  componentDidMount() {
    this.updateData();
  }

  handleActionDone() {
    this.updateData();
  }

  updateData() {
    this.setState({
      loading: true
    });
    api
      .get("/member/all")
      .on("succ", payload => {
        this.setState({
          loading: false,
          data: payload
        });
      })
      .on("fail", json => {
        Modal.error({
          title: "获取成员列表失败",
          content: json.errorMessage
        });
      })
      .on("error", e => {
        Modal.error({
          title: "网络请求失败",
          content: e.toString()
        });
      });
  }

  render() {
    return (
      <MemberListTable {...this.state} onActionDone={this.handleActionDone} />
    );
  }
}

export default NestedTable;
