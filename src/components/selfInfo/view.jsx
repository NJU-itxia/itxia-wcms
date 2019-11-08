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

const orderTags = [
  "重装系统",
  "安装固态",
  "进水",
  "linux",
  "windows",
  "无法开机"
];

class SelfInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selfInfo: {
        isLoad: false,
        payload: undefined
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
      }
    });
    api
      .post("/admin/info", "")
      .then(res => {
        if (res.data.success === true) {
          this.setState({
            selfInfo: {
              isLoad: true,
              payload: res.data.data
            }
          });
        } else {
          //TODO
        }
      })
      .catch(() => {
        //TODO onReject
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
      ></WrappedSelfInfoForm>
    );
  }
}

class SelfInfoForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.acceptEmail === null || values.acceptEmail === undefined) {
          values.acceptEmail = false;
        }
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
          <span className="ant-form-text">{String(payload.name)}</span>
        </Form.Item>
        <Form.Item label="账户ID">
          <span className="ant-form-text">{String(payload.id)}</span>
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
            //TODO
            <Switch defaultChecked={payload.acceptEmail} />
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
          <Alert
            message="关注标签功能还未生效 (需要与新预约系统一起工作)"
            type="warning"
            closable
          />
        </Form.Item>

        <Form.Item label="邮箱地址">
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "请填写您的邮箱地址" }]
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
  mapPropsToFields: props => {
    const { locationRawValue, email, acceptEmail } = props.selfInfoPayload;
    return {
      location: Form.createFormField({ value: locationRawValue }),
      acceptEmail: Form.createFormField({ value: acceptEmail }), //??? 不生效
      email: Form.createFormField({ value: email })
    };
  },
  name: "validate_other"
})(SelfInfoForm);

export default SelfInfo;
