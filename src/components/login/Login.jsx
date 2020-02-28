import React from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Modal,
  Spin,
  Divider,
  notification
} from "antd";
import "antd/dist/antd.css";
import "./style.css";
import * as api from "../../util/api";
import { Redirect, Link } from "react-router-dom";
import routePath from "../../route/routePath";

const localStorageKeys = {
  isRememberAccount: "isRememberAccount",
  rememberAccount: "rememberAccount"
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentDidMount() {
    this.autoLogin().catch(() => {
      if (!!!localStorage.getItem("needRecoverOldAccount")) {
        Modal.confirm({
          title: "第一次登录新系统嘛？",
          content: "登录新系统前,需要将旧系统账号迁移过来.",
          okText: "现在迁移",
          cancelText: "不用了",
          onOk: () => {
            window.location = "/recovery";
          },
          onCancel: () => {
            localStorage.setItem("needRecoverOldAccount", "nope");
          },
          centered: true
        });
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //记住用户名
        localStorage.setItem(
          localStorageKeys.isRememberAccount,
          values.rememberAccount
        );
        if (values.rememberAccount === true) {
          localStorage.setItem(
            localStorageKeys.rememberAccount,
            values.username
          );
        } else {
          localStorage.removeItem(localStorageKeys.rememberAccount);
        }
        //处理登录逻辑
        this.handleLogin(values.username, values.password);
      }
    });
  };

  async handleLogin(username, password) {
    try {
      await api.POST("/login", { loginName: username, password });
      this.setState({ isLogin: true });
    } catch (error) {
      Modal.error({
        title: "登录失败",
        content: error.message,
        centered: true
      });
    }
  }

  async autoLogin() {
    const key = "autologin";
    notification.info({
      key,
      message: "检查登录状态中...",
      icon: <Spin />,
      duration: 0
    });
    try {
      await api.GET("/whoami");
      setTimeout(() => {
        notification.success({
          key,
          message: "已登录, 自动跳转到主页.",
          duration: 3
        });
      }, 500);
      this.setState({
        isLogin: true
      });
    } catch (error) {
      setTimeout(() => {
        notification.close(key);
      }, 500);
      return Promise.reject(error);
    }
  }

  render() {
    if (this.state.isLogin === true) {
      return <Redirect to={routePath.HOME}></Redirect>;
    }
    const { getFieldDecorator } = this.props.form;
    const oAuthUrl =
      "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101842907&redirect_uri=https%3A%2F%2Fapi.itxia.cn%2Foauth%2Fqq&scope=get_user_info";
    return (
      <div className="loginPage">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div id="loginSystemName">
            <h3>IT侠后台管理系统</h3>
            <Divider dashed />
          </div>
          <img src="/img/itxia-logo.jpg" alt="itxia logo" id="itxia-logo"></img>
          <Form.Item>
            {getFieldDecorator("username", {
              initialValue: localStorage.getItem("rememberAccount")
                ? localStorage.getItem("rememberAccount")
                : "",
              rules: [{ required: true, message: "请输入登录账号" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="账号"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("rememberAccount", {
              valuePropName: "checked",
              initialValue:
                localStorage.getItem(localStorageKeys.isRememberAccount) ===
                "true"
                  ? true
                  : false
            })(<Checkbox>记住账号</Checkbox>)}
            <Link to="/recovery" target="_blank" id="recovery-btn">
              <Button type="link">迁移旧系统账号</Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
          <Divider />
          <p>其它登录方式:</p>
          <div id="other-login">
            <a href={oAuthUrl} target="_blank" rel="noopener noreferrer">
              <img
                src="/img/loginViaQQ.png"
                alt="QQ授权登录"
                id="qq-oauth-logo"
              ></img>
            </a>
          </div>
        </Form>
      </div>
    );
  }
}

const Login = Form.create({ name: "normal_login" })(LoginForm);

export { Login };
