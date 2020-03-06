import { Divider } from "antd";
import React from "react";
import Announcement from "./Announcement";
import OrderStat from "./OrderStat";
import PersonalInfo from "./PersonalInfo";
import "./index.css";

export function DashBoard() {
  return (
    <div id="dash-container">
      <div id="dash-stat">
        <OrderStat />
        <Divider />
        <PersonalInfo />
      </div>
      <div id="dash-space" />
      <div id="dash-anno">
        <Announcement />
        <Divider />
      </div>
    </div>
  );
}
