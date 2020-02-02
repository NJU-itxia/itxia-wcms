import {
  Button,
  Form,
  Modal,
  Input,
  notification,
  Radio,
  Row,
  Col,
  Slider,
  Card,
  Statistic,
  Icon
} from "antd";
import React from "react";
import * as timeUtil from "../../util/time";
import * as api from "../../util/api";
import "./index.css";

export default class DashBoard extends React.Component {
  state = {
    loading: true,
    data: null
  };

  fetchData() {
    //TODO
    //mock data
    setTimeout(() => {
      this.setState({
        loading: false,
        data: {
          backlog: {
            仙林: 25,
            鼓楼: 12,
            全部: 37
          }
        }
      });
    }, 2000);
  }

  render() {
    const text = (
      <Card>
        <Statistic
          title="积压的预约单"
          value={15}
          precision={0}
          valueStyle={{ color: "red" }}
          prefix={<Icon type="arrow-up" />}
        />
        <Radio.Group
          value={"全部"}
          defaultValue="全部"
          onChange={this.handleSizeChange}
        >
          <Radio.Button value="全部">全部</Radio.Button>
          <Radio.Button value="仙林">仙林</Radio.Button>
          <Radio.Button value="鼓楼">鼓楼</Radio.Button>
        </Radio.Group>
      </Card>
    );
    return (
      <div id="dash-container">
        <Row gutter={[16, 16]} justify="start">
          <Col span={12}>
            <div>
              {text}
              {text}
            </div>
          </Col>
          <Col span={12}>
            {text}
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<Icon type="arrow-down" />}
              suffix="%"
            />
            {text}
          </Col>
        </Row>

        <div style={{ display: "none" }}>
          <Row gutter={[32, 32]}>
            <Col span={12}>{text}</Col>
            <Col span={12}>{text}</Col>
          </Row>
          <Row gutter={[32, 32]}>
            <Col span={12}>{text}</Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="积压的预约单"
                  value={15}
                  precision={0}
                  valueStyle={{ color: "red" }}
                  prefix={<Icon type="arrow-up" />}
                />
                <Radio.Group
                  value={"全部"}
                  defaultValue="全部"
                  onChange={this.handleSizeChange}
                >
                  <Radio.Button value="全部">全部</Radio.Button>
                  <Radio.Button value="仙林">仙林</Radio.Button>
                  <Radio.Button value="鼓楼">鼓楼</Radio.Button>
                </Radio.Group>
              </Card>
            </Col>
          </Row>
          <div style={{ background: "#ECECEC", padding: "30px" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<Icon type="arrow-up" />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: "#cf1322" }}
                    prefix={<Icon type="arrow-down" />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
