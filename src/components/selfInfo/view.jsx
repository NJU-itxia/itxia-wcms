import { Form, Select, Input, Switch, Button, Spin } from "antd";
import React from "react";
import { connect } from "react-redux";

const { Option } = Select;

const orderTags = [
  "重装系统",
  "安装固态",
  "进水",
  "linux",
  "windows",
  "无法开机"
];

class SelfInfo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    console.debug(this.props);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const isLoad = !this.props.loading && !this.props.error && this.props.data;
    return !isLoad ? (
      <Spin></Spin>
    ) : (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="姓名">
          <span className="ant-form-text">{String(this.props.data.name)}</span>
        </Form.Item>
        <Form.Item label="账户ID">
          <span className="ant-form-text">{String(this.props.data.id)}</span>
        </Form.Item>
        <Form.Item label="校区" hasFeedback>
          {getFieldDecorator("location", {
            rules: [{ required: true, message: "请选择你的校区" }]
          })(
            <Select placeholder="请选择你的校区">
              <Option value="XIAN_LIN">仙林</Option>
              <Option value="GU_LOU">鼓楼</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="预约单邮件提醒">
          {getFieldDecorator("accept-email", { valuePropName: "unchecked" })(
            <Switch />
          )}
        </Form.Item>

        <Form.Item label="关注的预约标签">
          {getFieldDecorator("listen-tags", {
            rules: [
              {
                required: false,
                message: "请选择关注的预约标签",
                type: "array"
              }
            ]
          })(
            <Select mode="multiple" placeholder="请选择关注的预约标签">
              {orderTags.map(tag => (
                <Option value={tag}>{tag}</Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="邮箱地址">
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "请填写您的邮箱地址" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            更新个人信息
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            撤销所有更改
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapState = state => {
  let loading = false,
    error,
    data;
  if (state.mainPage && state.mainPage.userInfo) {
    loading = state.mainPage.userInfo.loading;
    error = state.mainPage.userInfo.error;
    data = state.mainPage.userInfo.data;
  }
  return {
    loading,
    error,
    data
  };
};

const mapDispatch = () => ({
  onUpdateInfo: () => {
    //TODO
  }
});

const WrappedSelfInfo = Form.create({ name: "validate_other" })(SelfInfo);

export default connect(
  mapState,
  mapDispatch
)(WrappedSelfInfo);
