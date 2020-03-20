import { Form, Select, Input, Button, Upload, Modal, Checkbox } from "antd";
import React from "react";
import { config } from "CONFIG";
import * as api from "UTIL/api";

const { Option } = Select;

class RequestOrderForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //检查附件是否全部上传.
        const uploadIDArr = [];
        if (!!!values.attachments) {
          values.attachments = [];
        }
        if (!!!values.tags) {
          values.tags = [];
        }
        for (const file of values.attachments) {
          if (file.percent === 100 && file.status === "done") {
            const { errorCode, payload } = file.response;
            console.log(file.response);
            if (errorCode === 0) {
              uploadIDArr.push(payload._id);
            }
          } else {
            Modal.error({
              title: "附件未全部上传",
              content: "请等待附件全部上传，或删除上传失败的附件.",
              centered: true
            });
            return;
          }
        }
        values.attachments = uploadIDArr;
        //TODO 处理预约成功跳转
        api
          .POST("/order", values)
          .then(payload => {
            Modal.success({
              title: "预约成功",
              centered: true
            });
          })
          .catch(e => {
            Modal.error({
              title: "网络请求失败",
              content: e.toString(),
              centered: true
            });
          });
      }
    });
  };

  state = {
    tagList: []
  };

  componentDidMount() {
    api.GET("/tag").then(payload => {
      //按名字排序
      Array.prototype.sort.call(payload, (t1, t2) => {
        return t1.tagName > t2.tagName;
      });
      this.setState({
        tagList: payload
      });
    });
    //TODO 处理错误
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="姓名" hasFeedback>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入姓名" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="手机号" hasFeedback>
          {getFieldDecorator("phone", {
            rules: [{ required: false, message: "请输入手机号" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Email" hasFeedback>
          {getFieldDecorator("email", {
            rules: [{ required: false, message: "请输入邮箱地址" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="电脑型号" hasFeedback>
          {getFieldDecorator("model", {
            rules: [{ required: true, message: "请输入电脑型号" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="是否在保修期内" hasFeedback>
          {getFieldDecorator("warranty", {
            rules: [{ required: true, message: "请选择保修情况" }]
          })(
            <Select placeholder="请选择保修情况">
              <Option value={"不确定"}>不确定</Option>
              <Option value={"在保"}>在保</Option>
              <Option value={"过保"}>过保</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="校区" hasFeedback>
          {getFieldDecorator("campus", {
            rules: [{ required: true, message: "请选择校区" }]
          })(
            <Select placeholder="请选择校区">
              <Option value={"仙林"}>仙林</Option>
              <Option value={"鼓楼"}>鼓楼</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="标签">
          {getFieldDecorator("tags", {
            rules: [
              {
                required: false,
                message: "请选择相关标签",
                type: "array"
              }
            ]
          })(
            <Select mode="multiple" placeholder="请选择相关标签">
              {this.state.tagList.map(tag => (
                <Option key={tag._id} value={tag._id}>
                  {tag.tagName}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="问题详细描述" hasFeedback>
          {getFieldDecorator("description", {
            rules: [{ required: true, message: "请详细描述你遇到的问题" }]
          })(
            <Input.TextArea
              autoSize={{ minRows: 3, maxRows: 6 }}
              allowClear={true}
            />
          )}
        </Form.Item>

        <Form.Item label="附件上传">
          {getFieldDecorator("attachments", {
            valuePropName: "fileList",
            getValueFromEvent: e => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }
          })(
            <Upload
              action={
                config.network.api.protocol +
                "://" +
                config.network.api.host +
                "/upload"
              }
              headers={{
                "X-Requested-With": null
              }}
              withCredentials
              listType="picture"
            >
              <Button>上传</Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item label="预约须知、服务条款">
          {getFieldDecorator("agreement", {
            valuePropName: "checked",
            initialValue: false,
            rules: [
              (rules, value, callback) => {
                if (value === true) {
                  callback();
                }
                callback("必须同意才能发起预约");
              }
            ]
          })(
            <Checkbox>
              我已了解并同意
              <a
                href="https://itxia.club/service"
                target="_blank"
                rel="noopener noreferrer"
              >
                预约须知和服务条款
              </a>
            </Checkbox>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            发起预约
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const RequestOrder = Form.create()(RequestOrderForm);

export { RequestOrder };
