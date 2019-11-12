import { Table, Modal } from "antd";
import React from "react";
import * as api from "../../util/api";

class NestedTable extends React.Component {
  state = {
    loading: false,
    data: []
  };

  componentDidMount() {
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

  //数据表格格式
  columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "姓名", dataIndex: "realName", key: "realName" },
    { title: "登录名", dataIndex: "loginName", key: "loginName" },
    { title: "校区", dataIndex: "campus", key: "campus" },
    {
      title: "身份",
      dataIndex: "role",
      key: "role",
      render: role => {
        switch (role) {
          case 0:
            return "游客";
          case 1:
            return "成员";
          case 2:
            return "管理员";
          default:
            return "未知";
        }
      }
    },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "是否接收邮件提醒", dataIndex: "acceptEmail", key: "acceptEmail" }
  ];

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data.map(value => ({
          key: value.id,
          ...value
        }))}
        loading={this.state.loading}
      />
    );
  }
}

export default NestedTable;
