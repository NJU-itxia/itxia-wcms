import React, { useContext } from "react";
import { Form } from "antd";
import { UserInfoContext } from "../../context/UserInfo";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 }
};

/**
 * 个人基本信息.
 */
export default function BasicInfo() {
  const context = useContext(UserInfoContext);
  const { realName, loginName, _id, role } = context;
  return (
    <Form {...formItemLayout}>
      <Form.Item label="姓名">
        <span>{realName}</span>
      </Form.Item>
      <Form.Item label="登录名">
        <span className="ant-form-text">{String(loginName)}</span>
      </Form.Item>
      <Form.Item label="账号ID">
        <span className="ant-form-text">{String(_id)}</span>
      </Form.Item>
      <Form.Item label="账号身份">{String(role)}</Form.Item>
    </Form>
  );
}
