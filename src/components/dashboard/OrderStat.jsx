import React from "react";
import { Card, Statistic, Row, Col, Divider } from "antd";
import * as api from "../../util/api";
import Loading from "../loading/Loading";
import * as timeUtil from "../../util/time";

class OrderStat extends React.Component {
  state = {
    loading: true,
    data: null
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const data = await api.GET("/stat/order");
    this.setState({
      loading: false,
      data
    });
  }

  render() {
    const { loading, data } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
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
        <Divider />
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
        <span style={{ float: "right", fontSize: "0.5rem" }}>
          统计更新时间：{timeUtil.utcDateToText(data.updateTime)}
        </span>
      </Card>
    );
  }
}

export { OrderStat };
