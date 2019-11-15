import React from "react";
import { Modal, Button, Popconfirm, Timeline } from "antd";
import * as api from "../../util/api";
import * as timeUtil from "../../util/time";
import actionEnums from "../../enums/actions";

export default class OrderHistoryTimeline extends React.Component {
  render() {
    const { history } = this.props;
    if (Array.isArray(history)) {
      history.sort((a, b) => a.time - b.time);
    }
    const historyInfo = [];
    historyInfo.push({
      color: "green",
      text: "预约人发起了预约"
    });
    history.forEach(value => {
      let info;
      switch (value.action) {
        case 0:
          info = {
            color: "blue",
            text: `被${value.memberName}接单.`
          };
          break;
        case 1:
          info = {
            color: "gray",
            text: `被${value.memberName}放回.`
          };
          break;
        case 2:
          info = {
            color: "blue",
            text: `预约单已完成.`
          };
          break;
        case 3:
          info = {
            color: "red",
            text: `预约单已被取消.`
          };
          break;
        case 4:
          info = {
            color: "red",
            text: `预约单已被废弃.`
          };
          break;
        default:
      }
      info.text = info.text + " " + timeUtil.unixToText(value.time);
      historyInfo.push(info);
    });

    return (
      <div>
        <Timeline mode="alternate">
          {historyInfo.map((value, index) => {
            return (
              <Timeline.Item key={index} color={value.color}>
                {value.text}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    );
  }
}
