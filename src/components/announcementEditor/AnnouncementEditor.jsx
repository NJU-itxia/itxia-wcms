import { Form, Input, Button, Upload, Modal, Radio } from "antd";
import React, { useEffect, useState } from "react";
import config from "../../config/config";
import * as api from "../../util/api";
import { ReactMarkdown } from "../../util/md2html";
import "./announcementEditor.css";

/**
 * 公告编辑器.
 */
function EditorForm(props) {
  const [submitting, setSubmitting] = useState(false);

  /**
   * 预览公告内容.
   * */
  function preview() {
    const { validateFields } = props.form;
    validateFields(async (err, formValues) => {
      const { content } = formValues;
      if (content) {
        Modal.info({
          title: "公告内容预览(Markdown)",
          content: <ReactMarkdown source={content} id="announce-preview" />,
          centered: true,
          width: "40rem"
        });
      }
    });
  }

  /**
   * 发送请求.
   * */
  async function postData(submitValues) {
    setSubmitting(true);
    const { resetFields } = props.form;
    try {
      await api.POST("/announcement", submitValues);
      Modal.success({
        title: "发布成功",
        centered: true
      });
      resetFields(); //发布成功后清空表单，防止重复提交
      localStorage.removeItem("announcementEditorDraft");
    } catch (error) {
      Modal.error({
        title: "发布失败",
        content: error.message,
        centered: true
      });
    } finally {
      setSubmitting(false);
    }
  }

  /**
   * 验证表单，通过后发送请求.
   * */
  function handleSubmit(e) {
    e.preventDefault();
    const { validateFields } = props.form;
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
        //发送请求
        postData(values);
      }
    });
  }

  //-----------------------------------------------------------
  //自动存草稿，有草稿时提示恢复
  let timer;
  function saveDraft() {
    const { validateFields } = props.form;
    validateFields(async (err, values) => {
      if (!err) {
        //save
        clearTimeout(timer);
        delete values.attachments; //去掉attachments，这部分没法恢复...
        timer = setTimeout(() => {
          console.log("saving...");
          localStorage.setItem(
            "announcementEditorDraft",
            JSON.stringify(values)
          );
        }, 1000);
      }
    });
  }

  function recoverFromDraft() {
    const draft = localStorage.getItem("announcementEditorDraft");
    if (draft) {
      //提示是否恢复草稿
      Modal.confirm({
        title: "是否恢复上次编辑的内容？",
        centered: true,
        okText: "恢复",
        cancelText: "不用了",
        onOk: () => {
          const { setFieldsValue } = props.form;
          setFieldsValue(JSON.parse(draft));
        },
        onCancel: () => {
          localStorage.removeItem("announcementEditorDraft");
        }
      });
    }
  }
  useEffect(() => {
    recoverFromDraft();
  }, []);
  //-----------------------------------------------------------

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  };
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} onChange={saveDraft}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>公告编辑</h1>
      </div>
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
        })(
          <Input.TextArea
            autoSize={{ minRows: 6 }}
            allowClear={true}
            placeholder="支持markdown格式"
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

      <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
        <div id="announce-edit-btn-container">
          <Button onClick={preview}>预览内容</Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            发布公告
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export const AnnouncementEditor = Form.create()(EditorForm);
