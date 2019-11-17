import React from "react";
import { Popconfirm, Button, Modal } from "antd";
import * as api from "../../util/api";

const actions = [
  {
    actionName: "设为管理员",
    condition: { role: 1 },
    buttonType: "default",
    urlPostfix: "role",
    data: { role: 2 }
  },
  {
    actionName: "设为普通成员",
    condition: { role: 2 },
    buttonType: "default",
    urlPostfix: "role",
    data: { role: 1 }
  },
  {
    actionName: "启用账号",
    condition: { status: 0 },
    buttonType: "primary",
    urlPostfix: "status",
    data: { status: 1 }
  },
  {
    actionName: "禁用账号",
    condition: { status: 1 },
    buttonType: "danger",
    urlPostfix: "status",
    data: { status: 0 }
  },
  {
    actionName: "重置密码",
    buttonType: "dashed",
    notImplemented: true
  }
];

export default class Action extends React.Component {
  state = {
    loading: false
  };
  handleAction(action) {
    if (action.notImplemented) {
      Modal.info({
        title: "操作失败",
        content: "功能尚未实现，请等待下个版本",
        centered: true
      });
      return;
    }
    this.setState({ loading: true });
    const { record } = this.props;
    api
      .put(`/member/${record.id}/${action.urlPostfix}`, action.data)
      .on("succ", () => {
        Modal.success({
          title: "操作成功",
          content: `已成功${action.actionName}.`,
          centered: true,
          onOk: () => {
            this.props.onActionDone();
          }
        });
      })
      .on("fail", message => {
        Modal.error({
          title: "操作失败",
          content: `${action.actionName}失败. ${message}`,
          centered: true
        });
      })
      .on("error", e => {
        Modal.error({
          title: "网络请求失败",
          content: e.toString(),
          centered: true
        });
      })
      .on("any", () => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { record } = this.props;
    const actionArr = actions.filter(value => {
      const { condition } = value;
      if (condition) {
        for (const key in condition) {
          if (condition[key] !== record[key]) {
            return false;
          }
        }
      }
      return true;
    });

    return (
      <div>
        {actionArr.map((value, index) => {
          return (
            <Popconfirm
              key={index}
              title={`确定要${value.actionName}吗？`}
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                this.handleAction(value);
              }}
            >
              <Button
                type={value.buttonType}
                size="small"
                style={{
                  margin: "0.5em"
                }}
                disabled={this.state.loading}
              >
                {value.actionName}
              </Button>
            </Popconfirm>
          );
        })}
      </div>
    );
  }
}
