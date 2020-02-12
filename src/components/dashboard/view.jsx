import { Row, Col, Divider } from "antd";
import React from "react";
import "./index.css";
import Announcement from "./Announcement";
import OrderStat from "./OrderStat";
import PersonalInfo from "./PersonalInfo";

export default class DashBoard extends React.Component {
  render() {
    return (
      <div id="dash-container">
        <Row gutter={[16, 16]} justify="start">
          <Col xs={24} lg={15}>
            <Announcement />
            <Divider />
          </Col>
          <Col xs={24} lg={9}>
            <OrderStat />
            <Divider />
            <PersonalInfo />
          </Col>
        </Row>
      </div>
    );
  }
}
