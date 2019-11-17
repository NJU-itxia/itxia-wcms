import React from "react";
import { Table, Icon, Divider, Tag, Input, Collapse } from "antd";
import * as timeUtil from "../../util/time";
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
              disabled
              value={record.description}
              autoSize={true}
              className="orderDescription"
            />
          </div>
        </Panel>
        <Panel header="附件" key="attachments">
          {record.attachments
            ? record.attachments.map(attachment => {
                return (
                  <AttachmentContainer
                    key={attachment.id}
                    originUrl={getImageUrl(attachment.sha256sum)}
                    thumbnailUrl={getImageUrl(attachment.sha256sum, true)}
                    fileName={attachment.fileName}
                  />
                );
              })
            : ""}
        </Panel>
        <Panel header="接单历史记录" key="history">
          <OrderHistoryTimeline history={record.history}></OrderHistoryTimeline>
        </Panel>
      </Collapse>
    </div>
  );
}
