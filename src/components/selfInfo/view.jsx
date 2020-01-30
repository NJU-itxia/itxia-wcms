import { Form, Spin, notification, Divider } from "antd";
import React from "react";
import * as api from "../../util/api";
import MemberSettings from "./MemberSettings";
import PasswordReset from "./PasswordReset";
import OauthQQ from "./OauthQQ";

class SelfInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selfInfo: {
        isLoad: false,
        payload: undefined
      }
    };
    this.fetchSelfInfo = this.fetchSelfInfo.bind(this);
    this.handleUpdateSelfInfo = this.handleUpdateSelfInfo.bind(this);
  }

  componentDidMount() {
    this.fetchSelfInfo();
  }

  fetchSelfInfo() {
    this.setState({
      selfInfo: {
        isLoad: false
      }
    });
    api
      .get("/whoami")
      .on("succ", payload => {
        this.setState({
          selfInfo: {
            isLoad: true,
            payload
          }
        });
      })
      .on("fail", message => {
        notification.error({
          message: "返回值错误",
          description: message,
          duration: 0
        });
      })
      .on("error", e => {
        notification.error({
          message: "网络请求失败",
          description: e.toString(),
          duration: 0
        });
      });
  }

  /**
   * 请求API更新个人信息.
   */
  handleUpdateSelfInfo() {
    this.fetchSelfInfo(); //从服务器更新信息
  }

  render() {
    if (this.state.selfInfo.isLoad !== true) {
      //TODO 居中转圈圈
      return <Spin></Spin>;
    }
    return (
      <WrappedSelfInfoForm
        selfInfoPayload={this.state.selfInfo.payload}
        onUpdateInfo={this.handleUpdateSelfInfo}
      ></WrappedSelfInfoForm>
    );
  }
}

class SelfInfoForm extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 }
    };
    const payload = this.props.selfInfoPayload;
    return (
      <div>
        <h1>基本信息</h1>
        <section className="member-section">
          <Form {...formItemLayout}>
            <Form.Item label="姓名">
              <span>{String(payload.realName)}</span>
            </Form.Item>
            <Form.Item label="登录名">
              <span className="ant-form-text">{String(payload.loginName)}</span>
            </Form.Item>
            <Form.Item label="账号ID">
              <span className="ant-form-text">{String(payload.id)}</span>
            </Form.Item>
            <Form.Item label="账号身份">
              <span className="ant-form-text">
                {payload.role === 1
                  ? "普通成员"
                  : payload.role === 2
                  ? "管理员"
                  : "未知"}
              </span>
            </Form.Item>
          </Form>
        </section>
        <Divider dashed></Divider>
        <h1>个人设置</h1>
        <section>
          <MemberSettings
            payload={payload}
            onUpdateInfo={this.props.onUpdateInfo}
          />
        </section>
        <Divider dashed></Divider>
        <h1>重置密码</h1>
        <section>
          <PasswordReset
            payload={payload}
            onUpdateInfo={this.props.onUpdateInfo}
          />
        </section>
        <Divider dashed></Divider>
        <h1>绑定QQ登录</h1>
        <section>
          <OauthQQ
            payload={payload}
            onUpdateInfo={this.props.onUpdateInfo}
          />
        </section>
      </div>
    );
  }
}

const WrappedSelfInfoForm = Form.create({
  name: "self_info"
})(SelfInfoForm);

export default SelfInfo;
