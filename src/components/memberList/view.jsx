import { Table, Modal } from "antd";
import React from "react";
import * as api from "../../util/api";

class NestedTable extends React.Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    this.setState({
      loading: true,
      data: null
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

  //数据表格格式
  columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "姓名", dataIndex: "realName", key: "realName" },
    { title: "账号", dataIndex: "loginNmae", key: "loginNmae" },
    { title: "校区", dataIndex: "campus", key: "campus" },
    { title: "身份", dataIndex: "role", key: "role" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "是否接收邮件提醒", dataIndex: "acceptEmail", key: "acceptEmail" }
  ];

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        loading={this.state.loading}
      />
    );
  }
}

export default NestedTable;
