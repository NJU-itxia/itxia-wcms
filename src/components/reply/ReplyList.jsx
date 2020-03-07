import { List, Divider, Modal } from "antd";
import React from "react";
import ReplyEditor from "./ReplyEditor";
import * as timeUtil from "../../util/time";
import Attachment from "../attachment";

export function ReplyList(props) {
    const { visible, title, onCancel, data, baseUrl, onReply } = props;
    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={onCancel}
        footer={null}
        centered
      >
        <List
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={item => (
            <List.Item key={item._id}>
              <List.Item.Meta
                description={`由 ${
                  item.postBy.realName
                } 发布于 ${timeUtil.utcDateToText(item.createTime)}`}
              />
              <div className="reply-text">
                <p>{item.content}</p>
              </div>
              {item.attachments.map(value => {
                return (
                  <Attachment
                    data={value}
                    key={value._id}
                    className="reply-atech"
                  />
                );
              })}
            </List.Item>
          )}
        ></List>
        <Divider />
        <h3>回复评论</h3>
        <ReplyEditor baseUrl={baseUrl} onReply={onReply} />
      </Modal>
    );
  }