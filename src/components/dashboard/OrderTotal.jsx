import React from "react";
import { Card, Statistic, Row, Col, Divider } from "antd";

class OrderTotal extends React.Component {
  render() {
    const data = {
      total: {
        等待处理: 74,
        正在处理: 15,
        已完成: 9876
      },
      backlog: {
        仙林: 25,
        鼓楼: 12
      }
    };
    return (
      <div>
        <Card>
          <h1>预约单统计</h1>
          <Row>
            <Col span={8}>
              <Statistic
                title="等待处理"
                value={data.total["等待处理"]}
                precision={0}
                valueStyle={{ color: "red" }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="正在处理"
                value={data.total["正在处理"]}
                precision={0}
                valueStyle={{ color: "green" }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="已完成"
                value={data.total["已完成"]}
                precision={0}
                valueStyle={{ color: "blue" }}
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <h1>积压的预约单</h1>
          <Row>
            <Col span={8}>
              <Statistic
                title="仙林"
                value={data.backlog["仙林"]}
                precision={0}
                valueStyle={{ color: "red" }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="鼓楼"
                value={data.backlog["鼓楼"]}
                precision={0}
                valueStyle={{ color: "red" }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default OrderTotal;
