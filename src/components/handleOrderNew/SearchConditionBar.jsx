import React from "react";
import { Form, Row, Col, Switch, Radio, Checkbox, Card } from "antd";

class SearchConditionBarRender extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title="筛选">
        <Form onSubmit={this.onSearch}>
          <Row gutter={24} id="sb-form-item-container">
            <Form.Item label="只看我的">
              {getFieldDecorator("onlyMine", {
                valuePropName: "checked",
                initialValue: false
              })(<Switch />)}
            </Form.Item>
            <Form.Item label="校区">
              {getFieldDecorator("campus", {
                initialValue: ""
              })(
                <Radio.Group>
                  <Radio value="">全部</Radio>
                  <Radio value="仙林">仙林</Radio>
                  <Radio value="鼓楼">鼓楼</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="状态">
              {getFieldDecorator("status", {
                initialValue: ["等待处理", "正在处理"]
              })(
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    <Col span={12}>
                      <Checkbox value="等待处理">等待处理</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="正在处理">正在处理</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="已完成">已完成</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="已取消">已取消</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>
          </Row>
        </Form>
      </Card>
    );
  }
}

let myTimer = null;

const SearchConditionBar = Form.create({
  onFieldsChange: (props, changedFields, allFields) => {
    const condition = {};
    for (const fieldName in allFields) {
      if (allFields.hasOwnProperty(fieldName)) {
        condition[fieldName] = allFields[fieldName].value;
      }
    }
    myTimer = setTimeout(() => {
      props.onConditionChange(condition);
    }, 1000);
  }
})(SearchConditionBarRender);

export { SearchConditionBar };
