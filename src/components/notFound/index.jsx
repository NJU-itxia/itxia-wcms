import { Result } from "antd";
import React from "react";

export default function() {
  return (
    <Result
      status="wbnm$1"
      title="Not Found"
      subTitle="可能还在开发,或是出错了."
      icon={<img src="/img/emoji-han.png" alt="404"></img>}
    />
  );
}
