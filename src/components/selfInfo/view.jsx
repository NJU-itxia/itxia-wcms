import { Form, Select, Input, Switch, Button, Spin } from "antd";
import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";

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
        if(values.acceptEmail===null || values.acceptEmail===undefined){
          values.acceptEmail = false;
        }
        this.props.onUpdateInfo(values);
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
              <Option value="仙林">仙林</Option>
              <Option value="鼓楼">鼓楼</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="预约单邮件提醒">
          {getFieldDecorator("acceptEmail", { valuePropName: "value" })(
            <Switch defaultChecked={this.props.data.acceptEmail} />
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
              {orderTags.map((tag, tagIndex) => (
                <Option key={tagIndex} value={tag}>
                  {tag}
                </Option>
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
          <Button
            type="primary"
            loading={this.props.update.isUpdating}
            htmlType="submit"
          >
            更新个人信息
          </Button>
        </Form.Item>
        <span>{this.props.update.error ? this.props.update.error : 0}</span>
      </Form>
    );
  }
}

const mapState = state => {
  let loading = false,
    error,
    data;
  const { isUpdating, success, error: updateError } = state.selfInfo;
  if (state.mainPage && state.mainPage.userInfo) {
    loading = state.mainPage.userInfo.loading;
    error = state.mainPage.userInfo.error;
    data = state.mainPage.userInfo.data;
  }
  return {
    loading,
    error,
    data,
    update: {
      isUpdating,
      success,
      updateError
    }
  };
};

const mapDispatch = dispatch => ({
  onUpdateInfo: newInfo => {
    dispatch(actions.updateUserInfo(newInfo));
  }
});

const WrappedSelfInfo = Form.create({
  mapPropsToFields: props => {
    if (props.data && !props.error) {
      const { locationRaw, email, acceptEmail } = props.data;
      let location;
      switch (locationRaw) {
        case "GU_LOU":
          location = "鼓楼";
          break;

        case "XIAN_LIN":
          location = "仙林";
          break;
        default:
            location = "鼓楼";
      }
      return {
        location: Form.createFormField({ value: location }),
        acceptEmail: Form.createFormField({ value: acceptEmail }), //??? 不生效
        email: Form.createFormField({ value: email })
      };
    }
    return {};
  },
  name: "validate_other"
})(SelfInfo);

export default connect(
  mapState,
  mapDispatch
)(WrappedSelfInfo);
