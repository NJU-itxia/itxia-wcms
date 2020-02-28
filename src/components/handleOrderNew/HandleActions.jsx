import React, { useState, useContext } from "react";
import { Button, Popconfirm, Modal, Alert } from "antd";
import * as api from "../../util/api";
import { UserInfoContext } from "../../context/UserInfo";
import RequireRole from "../requireRole";

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

  static contextType = UserInfoContext;

  render() {
    const { handler, status } = this.props.data;
    const { submiting, submitType } = this.state;
    const { _id: userID, role } = this.context;
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
        <RequireRole
          custom={whoami => {
            if (status === "正在处理" && handler._id !== whoami._id) {
              console.log(handler.realName);
              //console.log(whoami);
              return true;
            }
          }}
        >
          <Alert
            type="info"
            message={
              <span>
                正由 <strong>{handler && handler.realName}</strong> 处理中.
              </span>
            }
          ></Alert>
        </RequireRole>
        {status === "已完成" && handler._id !== userID ? (
          <Alert
            type="success"
            message={
              <span>
                已由 <strong>{handler.realName}</strong> 处理完成.
              </span>
            }
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

        <RequireRole
          custom={whoami => {
            const { role } = whoami;
            if (role === "管理员" || role === "超级账号") {
              if (status === "等待处理") {
                return true;
              }
            }
          }}
        >
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
        </RequireRole>
      </div>
    );
  }
}
