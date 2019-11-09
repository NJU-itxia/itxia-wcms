import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col
} from "antd";
import React from "react";
import axios from "axios";
const { Option } = Select;

class Demo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      axios.post("http://localhost:3000/order",values,{
        withCredentials:true
      })
      .then(res=>{
        console.log(res.status)
        console.log(res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    });
  };

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
          })(<Select placeholder="请选择保修情况">
          <Option value={0}>不确定</Option>
          <Option value={1}>在保</Option>
          <Option value={2}>过保</Option>
        </Select>)}
        </Form.Item>

        <Form.Item label="校区" hasFeedback>
          {getFieldDecorator("campus", {
            rules: [{ required: true, message: "请选择校区" }]
          })(<Select placeholder="请选择校区">
          <Option value={1}>仙林</Option>
          <Option value={2}>鼓楼</Option>
        </Select>)}
        </Form.Item>

        <Form.Item label="标签">
          {getFieldDecorator("tag", {
            rules: [
              {
                required: false,
                message: "Please select your favourite colors!",
                type: "array"
              }
            ]
          })(
            <Select
              mode="multiple"
              placeholder="请选择相关标签"
            >
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="问题详细描述" hasFeedback>
          {getFieldDecorator("description", {
            rules: [{ required: true, message: "请详细描述你遇到的问题" }]
          })(<Input.TextArea autoSize={
            {minRows: 3,
            maxRows:6}
          } allowClear={true}/>)}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: "validate_other" })(Demo);

export default WrappedDemo;
