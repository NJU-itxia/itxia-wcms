import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Switch, Radio, Checkbox, Card } from "antd";

/**
 * 筛选条件.
 * */
function SearchConditionBarRender(props) {
  const { getFieldDecorator, setFieldsValue } = props.form;

  useEffect(() => {
    //第一次加载时，从querystring解析出筛选条件
    let condition = {
      onlyMine: false,
      campus: "仙林",
      status: ["等待处理", "正在处理"]
    };
    const qs = window.location.search;
    if (qs) {
      for (const kv of qs.substr(1).split("&")) {
        const [key, value] = kv.split("=");
        if (value) {
          const decodedValue = decodeURI(value);
          switch (key) {
            case "onlyMine":
              condition[key] = Boolean(value);
              break;
            case "campus":
              condition[key] = decodedValue;
              break;
            case "status":
              condition[key] = decodedValue.split(",");
              break;
            default:
          }
        }
      }
    }
    setFieldsValue(condition);
  }, []);

  return (
    <Card title="筛选">
      <Form>
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

let myTimer = null;

const SearchConditionBar = Form.create({
  onFieldsChange: (props, changedFields, allFields) => {
    const condition = {};
    let qs = "";
    for (const fieldName in allFields) {
      if (allFields.hasOwnProperty(fieldName)) {
        const value = allFields[fieldName].value;
        condition[fieldName] = value;
        if (value) {
          switch (fieldName) {
            case "onlyMine":
              qs += `&onlyMine=${value}`;
              break;
            case "campus":
              qs += `&campus=${value}`;
              break;
            case "status":
              qs += `&status=${value.join(",")}`;
              break;
            default:
          }
        }
      }
    }
    if (qs) {
      qs = "?" + qs.substr(1);
    }
    const newUrl = window.location.toString().split("?")[0] + qs;
    myTimer = setTimeout(() => {
      //change query string
      window.history.pushState(null, null, newUrl);
      props.onConditionChange(condition);
    }, 1000);
  }
})(SearchConditionBarRender);

SearchConditionBar.propTypes = {
  onConditionChange: PropTypes.func.isRequired
};

export { SearchConditionBar };
