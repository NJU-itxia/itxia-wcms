import React from "react";
import { Input, Collapse, Alert } from "antd";
import config from "../../config/config";
import OrderHistoryTimeline from "./OrderHistoryTimeline";
import AttachmentContainer from "./AttachmentContainer";
import "./style.css";

export default function render(record) {
  const getImageUrl = (sha256sum, isThumbnail) => {
    const url =
      config.network.api.protocol +
      "://" +
      config.network.api.host +
      "/upload/" +
      sha256sum;
    if (isThumbnail) {
      return url + "/thumbnail";
    }
    return url;
  };

  const { Panel } = Collapse;
  return (
    <div>
      <Collapse defaultActiveKey={["description", "attachments"]}>
        <Panel header="问题描述" key="description">
          <div style={{ maxWidth: "60em" }}>
            <Input.TextArea
              value={record.description}
              autoSize={true}
              className="orderDescription"
            />
          </div>
        </Panel>
        <Panel header="附件" key="attachments">
          {Array.isArray(record.attachments)
            ? record.attachments.length === 0
              ? "无附件."
              : record.attachments.map(attachment => {
                  return (
                    <AttachmentContainer
                      key={attachment.id}
                      originUrl={getImageUrl(attachment.sha256sum)}
                      thumbnailUrl={getImageUrl(attachment.sha256sum, true)}
                      fileName={attachment.fileName}
                    />
                  );
                })
            : null}
        </Panel>
        <Panel header="联系方式" key="contact">
          <Alert message="正在考虑把联系方式做成：只有管理员，或接单之后才能查看. (保护隐私)" />
        </Panel>
        <Panel header="接单历史记录" key="history">
          <OrderHistoryTimeline history={record.history}></OrderHistoryTimeline>
        </Panel>
      </Collapse>
    </div>
  );
}
