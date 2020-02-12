import React from "react";
import { Button, Popconfirm, Modal, Alert } from "antd";
import * as api from "../../util/api";

export default class OrderInfoCard extends React.Component {
  state = {
    submiting: false,
    submitType: null
  };
  onSubmit = actionType => async () => {
    const { _id } = this.props.data;
    this.setState({
      submiting: true,
      submitType: actionType
    });
    try {
      await api.PUT(`/order/${_id}/${actionType}`);
    } catch (error) {
      return Modal.error({
        title: "操作失败",
        content: `${error.message}`,
        okText: "确定",
        centered: true
      });
    }
    this.setState({
      submiting: false,
      submitType: null
    });
    let actionName;
    switch (actionType) {
      case "accept":
        actionName = "接受";
        break;
      case "done":
        actionName = "完成";
        break;
      case "giveup":
        actionName = "放回";
        break;
      case "delete":
        actionName = "删除";
        break;
      default:
    }
    const { onHandleOrder } = this.props;
    Modal.success({
      title: "操作成功",
      content: `预约单已成功${actionName}.`,
      okText: "确定",
      centered: true,
      onOk: () => {
        onHandleOrder();
      }
    });
  };
  render() {
    const { handler, status } = this.props.data;
    const { submiting, submitType } = this.state;
    const { _id: userID, role } = this.props.whoami;
    return (
      <div className="order-btn-container">
        {status === "等待处理" ? (
          <Popconfirm
            title="确定要接单吗?"
            okText="确定"
            cancelText="取消"
            onConfirm={this.onSubmit("accept")}
          >
            <Button
              type="primary"
              loading={submiting && submitType === "accept"}
            >
              我来处理
            </Button>
          </Popconfirm>
        ) : null}
        {status === "正在处理" && handler._id !== userID ? (
          <Alert
            type="info"
            message={`正由 ${handler.realName} 处理中`}
          ></Alert>
        ) : null}
        {status === "正在处理" && handler._id === userID ? (
          <Popconfirm
            title="确定要放回吗?"
            okText="确定"
            cancelText="取消"
            onConfirm={this.onSubmit("giveup")}
          >
            <Button loading={submiting && submitType === "giveup"}>放回</Button>
          </Popconfirm>
        ) : null}
        {status === "正在处理" && handler._id === userID ? (
          <Popconfirm
            title="确定完成预约单了吗?"
            okText="确定"
            cancelText="取消"
            onConfirm={this.onSubmit("done")}
          >
            <Button type="primary" loading={submiting && submitType === "done"}>
              完成
            </Button>
          </Popconfirm>
        ) : null}
        {(role === "管理员" || role === "超级账号") && status === "等待处理" ? (
          <Popconfirm
            title="确定要删除预约单吗?"
            okText="确定"
            cancelText="取消"
            onConfirm={this.onSubmit("delete")}
          >
            <Button
              type="danger"
              loading={submiting && submitType === "delete"}
            >
              删除
            </Button>
          </Popconfirm>
        ) : null}
      </div>
    );
  }
}
