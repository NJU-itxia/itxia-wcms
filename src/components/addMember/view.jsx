import {
  Form,
  Select,
  Input,
  Switch,
  Button,
  notification,
  Alert,
  Icon
} from "antd";
import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import * as api from "../../util/api";

const { Option } = Select;

class AddMember extends React.Component {
  state = {
    submit: {
      loading: false,
      payload: undefined,
      error: undefined
    }
  };

  componentDidMount() {
    const savedFormValues = localStorage.getItem("addMember");
    if (savedFormValues) {
      try {
        this.props.form.setFieldsValue(JSON.parse(savedFormValues));
      } catch (e) {
        console.log("cannot set fields from local storage.");
        localStorage.removeItem("addMember");
      }
    }
  }

  componentWillUnmount() {
    const values = this.props.form.getFieldsValue();
    localStorage.setItem("addMember", JSON.stringify(values));
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.acceptEmail === null || values.acceptEmail === undefined) {
          values.acceptEmail = false;
        }
        //或许可以改成更好的方式来验证密码是否一致
        if (values.password === values.confirmPassword) {
          this.setState({
            submit: {
              loading: true
            }
          });
          api
            .post("/member", values)
            .on("succ", payload => {
              notification.success({ message: "添加成员成功", duration: 5 });
              this.setState({
                submit: {
                  loading: false,
                  payload
                }
              });
              localStorage.removeItem("addMember");
              this.props.form.setFieldsValue({});
              //TODO
            })
            .on("fail", json => {
              notification.error({
                message: "添加成员失败",
                description: json.errorMessage,
                duration: 0
              });
              this.setState({
                submit: {
                  loading: false,
                  error: json.errorMessage
                }
              });
            })
            .on("error", e => {
              notification.error({
                message: "网络请求失败",
                description: e.toString(),
                duration: 0
              });
              this.setState({
                submit: {
                  loading: false,
                  error: e
                }
              });
            });
        } else {
          notification.error({
            message: "两次密码不一致",
            description: "请检查输入的密码",
            duration: 0
          });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="姓名">
          {getFieldDecorator("realName", {
            rules: [
              { required: true, message: "请填写姓名" },
              {
                pattern: /^.{2,16}$/,
                message: ""
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="text"
              placeholder="姓名"
            />
          )}
        </Form.Item>
        <Form.Item label="登录账号名">
          {getFieldDecorator("loginName", {
            rules: [
              { required: true, message: "请填写登录账号名" },
              {
                pattern: /^\w{4,16}$/,
                message: "账号格式不正确"
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="user-add" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="text"
              placeholder="登录账号名"
              autoComplete="new-password"
            />
          )}
          <Alert
            message="用于登录系统，4-16位字母、数字组合。"
            type="info"
            closable
          />
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "请填写密码" },
              {
                pattern: /^\w{8,16}$/,
                message: "密码格式不正确"
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="密码"
            />
          )}
          <Alert
            message="密码格式：8-16位字母、数字组合"
            type="info"
            closable
          />
        </Form.Item>
        <Form.Item label="确认密码">
          {getFieldDecorator("confirmPassword", {
            rules: [
              (rules, value, callback) => {
                if (this.props.form.getFieldsValue().password === value) {
                  callback();
                }
                callback("两次密码不一致");
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="确认密码"
            />
          )}
        </Form.Item>
        <Form.Item label="校区" hasFeedback>
          {getFieldDecorator("campus", {
            rules: [{ required: true, message: "请选择你的校区" }]
          })(
            <Select placeholder="请选择你的校区">
              <Option value="1">仙林</Option>
              <Option value="2">鼓楼</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="邮箱地址">
          {getFieldDecorator("email", {
            rules: [
              { required: false, initialValue: "" },
              {
                pattern: /^[^@]+@[^@]+$/,
                message: "邮箱格式不正确"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="email"
              placeholder="邮箱地址"
            />
          )}
        </Form.Item>
        <Form.Item label="预约单邮件提醒">
          {getFieldDecorator("acceptEmail", {
            initialValue: false,
            valuePropName: "checked"
          })(<Switch />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
          <Button
            type="primary"
            loading={this.state.submit.loading}
            htmlType="submit"
          >
            添加成员
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedAddMember = Form.create({
  name: "validate_other"
})(AddMember);

export default WrappedAddMember;
