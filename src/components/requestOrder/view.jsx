import { Form, Select, Input, Button, Upload } from "antd";
import React from "react";
import config from "../../config/config";
import * as api from "../../util/api";
const { Option } = Select;

class Demo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //TODO 处理预约成功跳转
        api
          .post("/order", values)
          .on("succ", payload => {
            console.log(payload);
          })
          .on("fail", json => {
            console.log(json);
          });
      }
    });
  };

  state = {
    tagList: []
  };

  componentDidMount() {
    api.get("/tag").on("succ", payload => {
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

        <Form.Item label="QQ" hasFeedback>
          {getFieldDecorator("qq", {
            rules: [{ required: false, message: "请输入QQ号" }]
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
              <Option value={0}>不确定</Option>
              <Option value={1}>在保</Option>
              <Option value={2}>过保</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="校区" hasFeedback>
          {getFieldDecorator("campus", {
            rules: [{ required: true, message: "请选择校区" }]
          })(
            <Select placeholder="请选择校区">
              <Option value={1}>仙林</Option>
              <Option value={2}>鼓楼</Option>
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
                <Option key={tag.id} value={tag.id}>
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
            initialValue: [],
            getValueFromEvent: event => {
              const uploadIDArr = [];
              for (const file of event["fileList"]) {
                if (file.percent === 100 && file.status === "done") {
                  const { errorCode, payload } = file.response;
                  if (errorCode === 0) {
                    uploadIDArr.push(payload.id);
                  }
                }
              }
              return uploadIDArr;
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

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            发起预约
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: "validate_other" })(Demo);

export default WrappedDemo;
