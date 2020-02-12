import { Spin } from "antd";
import React from "react";
import "./index.css";

export default function(props) {
  const { tip = "加载中...", delay = 500 } = props;
  return (
    <div className="loading">
      <Spin tip={tip} delay={delay}></Spin>
    </div>
  );
}
