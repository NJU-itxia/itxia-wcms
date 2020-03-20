import React from "react";
import { Card, Statistic, Row, Col } from "antd";
import * as api from "../../util/api";
import { Loading } from "../loading/Loading";

class MyOrderStat extends React.Component {
  state = {
    loading: true,
    data: null
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const data = await api.GET("/stat/order/mine");
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
        <h1>我的预约单</h1>
        <Row>
          <Col span={8}>
            <Statistic
              title="正在处理"
              value={data["正在处理"]}
              precision={0}
              valueStyle={{ color: "green" }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="已完成"
              value={data["已完成"]}
              precision={0}
              valueStyle={{ color: "blue" }}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export { MyOrderStat };
