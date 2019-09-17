import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import "./Login.css";
import store from "../Store";
import * as actions from "../Actions"
import {connect} from "react-redux"

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        //TODO 发送登录请求
        //store.dispatch(actions.login(values.username));
        this.props.onLogin(values.username);
      }
    });
  };
  

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ maxWidth: "300px" }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);
//export default WrappedNormalLoginForm;

function mapState(state, ownProps){
  return {
    username : state.username
  }
}

function mapDispatch(dispatch,ownProps){
  return{
    onLogin: (username)=>{
      dispatch(actions.login(username));
    }
  }
}

export default connect(mapState,mapDispatch)(WrappedNormalLoginForm);
//ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
