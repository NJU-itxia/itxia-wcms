import {
  Form,
  Select,
  Input,
  Switch,
  Button,
  Spin,
  notification,
  Alert
} from "antd";
import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import requestStatus from "../../util/requestStatus";

const { Option } = Select;

class AddMember extends React.Component {
  componentDidUpdate() {
    const { status, error } = this.props;
    let isNotificated = true;
    if (status === requestStatus.SUCC) {
      notification.success({ message: "添加成员成功", duration: 5 });
    } else if (status === requestStatus.ERROR) {
      notification.error({
        message: "添加成员失败",
        description: String(error),
        duration: 0
      });
    } else {
      isNotificated = false;
    }
    if (isNotificated) {
      this.props.onNotification();
    }
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
          this.props.onAddMember(values);
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

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: "请填写姓名" },
              {
                pattern: /^.{2,16}$/,
                message: ""
              }
            ]
          })(<Input />)}
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
          })(<Input />)}
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
          })(<Input />)}
          <Alert
            message="密码格式：8-16位字母、数字组合"
            type="info"
            closable
          />
        </Form.Item>
        <Form.Item label="确认密码">
          {getFieldDecorator("confirmPassword", {
            rules: [{ required: true, message: "请填写密码" }]
          })(<Input />)}
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
        <Form.Item label="邮箱地址">
          {getFieldDecorator("email", {
            rules: [
              { required: false, initialValue: "" },
              {
                pattern: /^[^@]+@[^@]+$/,
                message: "邮箱格式不正确"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="预约单邮件提醒">
          {getFieldDecorator("acceptEmail", {
            initialValue: false,
            valuePropName: "value"
          })(<Switch defaultChecked={false} />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
          <Button
            type="primary"
            loading={this.props.status === requestStatus.PENDING}
            htmlType="submit"
          >
            添加成员
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapState = state => {
  return state.addMember;
};

const mapDispatch = dispatch => ({
  onAddMember: newMember => {
    dispatch(actions.addMember(newMember));
  },
  onNotification: () => {
    dispatch(actions.nitificated());
  }
});

const WrappedAddMember = Form.create({
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
})(AddMember);

export default connect(
  mapState,
  mapDispatch
)(WrappedAddMember);
