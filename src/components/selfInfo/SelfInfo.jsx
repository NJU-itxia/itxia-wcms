import { Form, notification, Divider, Card } from "antd";
import React from "react";
import * as api from "../../util/api";
import { MemberSettings } from "./MemberSettings";
import { PasswordReset } from "./PasswordReset";
import { OAuthQQ } from "./OauthQQ";
import { Loading } from "../loading/Loading";
import "./index.css";
import { UserInfoContext } from "../../context/UserInfo";
import { BasicInfo } from "./BasicInfo";

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

  static contextType = UserInfoContext;

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
      .GET("/whoami")
      .then(payload => {
        this.setState({
          selfInfo: {
            isLoad: true,
            payload
          }
        });
      })
      .catch(e => {
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
      return <Loading />;
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
    const payload = this.props.selfInfoPayload;
    return (
      <div id="selfinfo-container">
        <Card title="基本信息">
          <BasicInfo />
        </Card>
        <Divider />
        <Card title="个人信息设置">
          <MemberSettings
            payload={payload}
            onUpdateInfo={this.props.onUpdateInfo}
          />
        </Card>
        <Divider />
        <Card title="绑定QQ登录">
          <OAuthQQ payload={payload} onUpdateInfo={this.props.onUpdateInfo} />
        </Card>
        <Divider />
        <Card title="重置密码">
          <PasswordReset
            payload={payload}
            onUpdateInfo={this.props.onUpdateInfo}
          />
        </Card>
      </div>
    );
  }
}

const WrappedSelfInfoForm = Form.create({
  name: "self_info"
})(SelfInfoForm);

export { SelfInfo };
