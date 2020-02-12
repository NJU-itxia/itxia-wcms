import React from "react";
import { Form, Row, Col, Icon, Switch, Radio, Checkbox, Card } from "antd";

class SearchConditionBar extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }
  state = {
    isExpend: false
  };
  getFormItems() {
    const { getFieldDecorator } = this.props.form;
    const itemArr = [];
    //TODO 根据isExpand
    return itemArr.map(value => {
      return value;
    });
  }
  onToggle() {
    this.setState({ isExpend: true });
  }
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
                initialValue: "全部"
              })(
                <Radio.Group>
                  <Radio value="全部">全部</Radio>
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
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <a
                style={{ marginLeft: 8, fontSize: 12 }}
                onClick={this.onToggle}
              >
                Collapse <Icon type={this.state.isExpend ? "up" : "down"} />
              </a>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

let myTimer = null;

export default Form.create({
  onFieldsChange: (props, changedFields, allFields) => {
    //将表单值转换为queryString
    let queryString = "";
    const { onlyMine, campus, status } = allFields;
    if (onlyMine.value === true) {
      queryString += "&onlyMine=1";
    }
    if (campus.value !== "全部") {
      queryString += `&campus=${campus.value}`;
    }
    queryString += `&status=${status.value.join(",")}`;
    if (myTimer) {
      clearTimeout(myTimer);
    }
    myTimer = setTimeout(() => {
      props.onConditionChange(queryString);
    }, 1000);
  }
})(SearchConditionBar);
