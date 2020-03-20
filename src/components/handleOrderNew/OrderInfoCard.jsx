import React from "react";
import { Card, Divider, Icon } from "antd";
import * as timeUtil from "../../util/time";
import { Attachment } from "../attachment/Attachment";
import { HandleActions } from "./HandleActions";
import { ReactMarkdown } from "../../util/md2html";

const getStatusIcon = status => {
  switch (status) {
    case "等待处理":
      return (
        <Icon
          type="calendar"
          theme="twoTone"
          twoToneColor="green"
          style={{ fontSize: "1.5em" }}
        />
      );
    case "正在处理":
      return (
        <Icon
          type="clock-circle"
          theme="twoTone"
          twoToneColor="#66ccff"
          style={{ fontSize: "1.5em" }}
        />
      );
    case "已完成":
      return (
        <Icon
          type="check-circle"
          theme="twoTone"
          style={{ fontSize: "1.5em" }}
        />
      );
    case "已取消":
      return (
        <Icon
          type="close-circle"
          theme="twoTone"
          twoToneColor="red"
          style={{ fontSize: "1.5em" }}
        />
      );
    default:
  }
};

function OrderInfoCard(props) {
  const { data, whoami, onHandleOrder } = props;
  const {
    name,
    campus,
    createTime,
    phone,
    email,
    model,
    os,
    warranty,
    description,
    attachments,
    status
  } = data;
  return (
    <Card className="order-card">
      <span style={{ fontSize: "1.3em" }}>
        {getStatusIcon(status)}
        {"   "}
        <span style={{ margin: "0 0 5px 0" }}>{status}</span>
      </span>
      <br />
      <Divider dashed className="order-hr" />
      <p>
        <strong>姓名: </strong>
        {name}
      </p>
      <p>
        <strong>校区: </strong>
        {campus}
      </p>
      <p>
        <strong>预约时间: </strong>
        {timeUtil.utcDateToText(createTime)}
      </p>
      <p>
        <strong>电话: </strong>
        {phone}
      </p>
      <p>
        <strong>邮箱: </strong>
        {email}
      </p>
      <p>
        <strong>电脑型号: </strong>
        {model}
      </p>
      <p>
        <strong>操作系统: </strong>
        {os}
      </p>
      <p>
        <strong>保修: </strong>
        {warranty}
      </p>
      <p>
        <strong>问题描述: </strong>
      </p>
      <div className="order-card-desc">
        <ReactMarkdown source={description} />
      </div>
      <br />
      {attachments.length === 0 ? null : (
        <div>
          <p>
            <strong>附件:</strong>
          </p>
          {attachments.map(value => {
            return <Attachment key={value._id} data={value} />;
          })}
        </div>
      )}
      <Divider dashed className="order-hr" />
      <HandleActions
        data={data}
        whoami={whoami}
        onHandleOrder={onHandleOrder}
      />
    </Card>
  );
}

export { OrderInfoCard };
