import { Form, Input, Button, Upload, Modal, Radio } from "antd";
import React from "react";
import config from "../../config/config";
import * as api from "../../util/api";

class AnnouncementEditor extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { resetFields, validateFields } = this.props.form;
    validateFields(async (err, values) => {
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
        try {
          await api.POST("/announcement", values);
          Modal.success({
            title: "发布成功",
            centered: true
          });
          resetFields();
          //TODO 清空表单防止重复提交
        } catch (error) {
          Modal.error({
            title: "发布失败",
            content: error.message,
            centered: true
          });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="标题">
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "请输入标题" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="公告类型">
          {getFieldDecorator("type", {
            rules: [{ required: true, message: "请选择公告类型" }]
          })(
            <Radio.Group>
              <Radio value="预约">预约页面公告</Radio>
              <Radio value="后台">后台系统公告</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="公告内容">
          {getFieldDecorator("content", {
            rules: [{ required: true, message: "请填写公告内容" }]
          })(<Input.TextArea autoSize={{ minRows: 3 }} allowClear={true} />)}
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

        <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            发送公告
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create()(AnnouncementEditor);

export default WrappedDemo;
