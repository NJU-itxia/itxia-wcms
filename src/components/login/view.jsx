import React from "react";
import { Form, Icon, Input, Button, Checkbox, Modal } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import * as actions from "./actions";
import { connect } from "react-redux";
import config from "../../config/config";
import * as api from "../../util/api";
import { Redirect } from "react-router-dom";

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

  handleLogin(username, password) {
    api
      .post("/admin/login", { loginName: username, password })
      .on("succ", () => {
        this.setState({ isLogin: true });
      })
      .on("fail", () => {
        Modal.error({
          title: "用户名或密码不匹配"
        });
      })
      .on("error", (e) => {
        Modal.error({
          title: "网络请求失败",
          content: e.toString()
        });
      });
  }

  render() {
    if (this.state.isLogin === true) {
      return <Redirect to="/home"></Redirect>;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginPage">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div id="loginSystemName">
            <span>{String(config.etc.name)}</span>
            <br></br>
            <br></br>
          </div>
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
                placeholder=""
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder=""
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);
//export default WrappedNormalLoginForm;

function mapDispatch(dispatch, ownProps) {
  return {
    onLogin: (username, password) => {
      dispatch(actions.login(username, password));
    }
  };
}

export default connect(
  null,
  mapDispatch
)(WrappedNormalLoginForm);
//ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
