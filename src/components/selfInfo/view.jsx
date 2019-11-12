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
import * as api from "../../util/api";

const { Option } = Select;

class SelfInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selfInfo: {
        isLoad: false,
        payload: undefined
      },
      tag: {
        loading: false,
        payload: []
      }
    };
    this.fetchSelfInfo = this.fetchSelfInfo.bind(this);
    this.handleUpdateSelfInfo = this.handleUpdateSelfInfo.bind(this);
  }

  componentDidMount() {
    this.fetchSelfInfo();
  }

  fetchSelfInfo() {
    this.setState({
      selfInfo: {
        isLoad: false
      },
      tag: {
        loading: true,
        payload: []
      }
    });
    api
      .get("/member")
      .on("succ", payload => {
        this.setState({
          selfInfo: {
            isLoad: true,
            payload
          }
        });
      })
      .on("fail", message => {
        notification.error({
          message: "返回值错误",
          description: message,
          duration: 0
        });
      })
      .on("error", e => {
        notification.error({
          message: "网络请求失败",
          description: e.toString(),
          duration: 0
        });
      });
    api.get("/tag").on("succ", payload => {
      this.setState({
        tag: {
          loading: false,
          payload
        }
      });
    });
  }

  /**
   * 请求API更新个人信息.
   */
  handleUpdateSelfInfo(info) {
    api.post("/admin/updateInfo", info).then(res => {
      //TODO
      if (res.data.success === true) {
        notification.success({ message: "ok!" });
      }
      this.fetchSelfInfo(); //从服务器更新信息
    });
  }

  render() {
    if (this.state.selfInfo.isLoad !== true) {
      //TODO 居中转圈圈
      return <Spin></Spin>;
    }
    return (
      <WrappedSelfInfoForm
        selfInfoPayload={this.state.selfInfo.payload}
        onUpdateInfo={this.handleUpdateSelfInfo}
        tagList={this.state.tag.payload}
      ></WrappedSelfInfoForm>
    );
  }
}

class SelfInfoForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onUpdateInfo(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const payload = this.props.selfInfoPayload;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="姓名">
          <span>{String(payload.realName)}</span>
        </Form.Item>
        <Form.Item label="登录名">
          <span className="ant-form-text">{String(payload.loginName)}</span>
        </Form.Item>
        <Form.Item label="账户ID">
          <span className="ant-form-text">{String(payload.id)}</span>
        </Form.Item>
        <Form.Item label="校区" hasFeedback>
          {getFieldDecorator("campus", {
            rules: [{ required: true, message: "请选择你的校区" }]
          })(
            <Select placeholder="请选择你的校区">
              <Option value={1}>仙林</Option>
              <Option value={2}>鼓楼</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="预约单邮件提醒">
          {getFieldDecorator("acceptEmail", {
            valuePropName: "checked",
            initialValue: payload.acceptEmail
          })(<Switch />)}
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
              {this.props.tagList.map(tag => (
                <Option key={tag.id} value={tag.id}>
                  {tag.tagName}
                </Option>
              ))}
            </Select>
          )}
          <Alert
            message="关注标签功能还未生效 (需要与新预约系统一起工作)"
            type="warning"
            closable
          />
        </Form.Item>

        <Form.Item label="邮箱地址">
          {getFieldDecorator("email", {
            rules: [{ required: false, message: "请填写您的邮箱地址" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
          <Button
            type="primary"
            loading={false} //TODO
            htmlType="submit"
          >
            更新个人信息
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSelfInfoForm = Form.create({
  name: "self_info"
})(SelfInfoForm);

export default SelfInfo;
