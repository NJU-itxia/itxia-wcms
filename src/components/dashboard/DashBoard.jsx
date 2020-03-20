import { Divider } from "antd";
import React from "react";
import { AnnouncementList } from "./AnnouncementList";
import { OrderStat } from "./OrderStat";
import { MyOrderStat } from "./MyOrderStat";
import "./index.css";

function DashBoard() {
  return (
    <div id="dash-container">
      <div id="dash-stat">
        <OrderStat />
        <Divider />
        <MyOrderStat />
      </div>
      <div id="dash-space" />
      <div id="dash-anno">
        <AnnouncementList />
        <Divider />
      </div>
    </div>
  );
}

export { DashBoard };
