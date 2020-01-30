import React from "react";
import { Form, Button, Modal, Input, Icon, Alert } from "antd";
import * as api from "../../util/api";

class PasswordReset extends React.Component {
  state = {
    loading: false
  };
  onUpdateInfo(values) {
    this.setState({
      loading: true
    });
    const { loginName } = this.props.payload;
    let { password } = values;
    api
      .put(`/user/${loginName}/password`, { newPassword: password })
      .on("succ", () => {
        Modal.success({
          content: "更新成功",
          centered: true,
          onOk: () => {
            this.props.onUpdateInfo();
          }
        });
      })
      .on("fail", message => {
        Modal.error({
          title: "更新失败",
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
        this.setState({
          loading: false
        });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onUpdateInfo(values);
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
        <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
          <Button
            type="primary"
            loading={this.state.loading} //TODO
            htmlType="submit"
          >
            重置密码
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(PasswordReset);
