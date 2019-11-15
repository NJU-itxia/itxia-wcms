import React from "react";
import * as api from "../../util/api";
import { Modal, Button, Popconfirm } from "antd";

const actions = {
  ACCEPT: { actionName: "接单", actionEnum: 0, buttonType: "primary" },
  PUT_BACK: { actionName: "放回", actionEnum: 1, buttonType: "default" },
  COMPLETE: { actionName: "完成", actionEnum: 2, buttonType: "primary" },
  CANCEL: { actionName: "取消", actionEnum: 3, buttonType: "danger" },
  ABANDON: { actionName: "废弃", actionEnum: 4, buttonType: "danger" }
};
const statusToAction = {
  0: [actions.ACCEPT, actions.CANCEL, actions.ABANDON],
  1: [actions.PUT_BACK, actions.COMPLETE, actions.CANCEL, actions.ABANDON]
};

export default class Action extends React.Component {
  state = {
    loading: false,
    actionEnum: undefined
  };
  handleAction(actionEnum, actionName) {
    this.setState({
      loading: true,
      actionEnum
    });
    const postData = {
      orderID: this.props.id,
      action: actionEnum
    };
    api
      .post(`/order/${this.props.id}/handle`, postData)
      .on("succ", () => {
        Modal.success({
          title: "操作成功",
          content: "预约单已成功" + actionName,
          centered: true
        });
      })
      .on("fail", message => {
        Modal.error({
          title: "操作失败",
          content: message,
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
        this.props.onActionDone();
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const actionArray = statusToAction[this.props.status];
    return (
      <div>
        {actionArray
          ? actionArray.map(value => {
              return (
                <Popconfirm
                  key={value.actionEnum}
                  title={`确定要${value.actionName}吗？`}
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => {
                    this.handleAction(value.actionEnum, value.actionName);
                  }}
                >
                  <Button
                    type={value.buttonType}
                    size="small"
                    style={{
                      margin: "0.5em"
                    }}
                    loading={
                      this.state.loading &&
                      this.state.actionEnum === value.actionEnum
                    }
                    disabled={this.state.loading}
                  >
                    {value.actionName}
                  </Button>
                </Popconfirm>
              );
            })
          : ""}
      </div>
    );
  }
}
