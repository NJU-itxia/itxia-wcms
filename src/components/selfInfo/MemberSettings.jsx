import React from "react";
import { Form, Select, Button, Modal } from "antd";
import * as api from "UTIL/api";

class MemberSettingsForm extends React.Component {
  state = {
    loading: false
  };
  onUpdateInfo(values) {
    this.setState({
      loading: true
    });
    const { loginName } = this.props.payload;
    api
      .PUT(`/user/${loginName}`, values)
      .then(() => {
        Modal.success({
          content: "更新成功",
          centered: true,
          onOk: () => {
            this.props.onUpdateInfo();
          }
        });
      })
      .catch(message => {
        Modal.error({
          title: "更新失败",
          content: message,
          centered: true
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
        <Form.Item label="校区" hasFeedback>
          {getFieldDecorator("campus", {
            rules: [{ required: true, message: "请选择你的校区" }],
            initialValue: this.props.payload.campus
          })(
            <Select placeholder="请选择你的校区">
              <Select.Option value={"仙林"}>仙林</Select.Option>
              <Select.Option value={"鼓楼"}>鼓楼</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
          <Button
            type="primary"
            loading={this.state.loading} //TODO
            htmlType="submit"
          >
            更新个人信息
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const MemberSettings = Form.create()(MemberSettingsForm);

export { MemberSettings };
