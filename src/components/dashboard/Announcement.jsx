import React, { useState, useContext } from "react";
import { List, Icon } from "antd";
import Attachment from "../attachment";
import { ReplyList } from "../reply";
import * as timeUtil from "../../util/time";
import { ReactMarkdown } from "../../util/md2html";
import { UserInfoContext } from "../../context/UserInfo";
import * as api from "../../util/api";

/**
 * 单个公告展示.
 */
export function Announcement(props) {
  const { data, handleUpdate } = props;
  const {
    _id,
    title,
    content,
    attachments,
    createTime,
    postBy,
    likeBy,
    reply
  } = data;

  const [showReply, setShowReply] = useState(false);

  const userInfoContext = useContext(UserInfoContext);

  //是否已点赞
  const isLiked =
    likeBy.findIndex(likedUser => {
      return likedUser._id === userInfoContext._id;
    }) !== -1;

  async function hitLikeButton() {
    try {
      await api.PUT(`/announcement/${_id}/${isLiked ? "unlike" : "like"}`);
      handleUpdate();
    } catch (error) {
      //TODO
    }
  }

  return (
    <List.Item
      actions={[
        <span key="1" onClick={hitLikeButton}>
          <Icon
            type="like"
            theme={isLiked ? "twoTone" : "outlined"}
            style={{ marginRight: 8 }}
          />
          {likeBy.length}
        </span>,
        <span
          key="2"
          onClick={() => {
            setShowReply(true);
          }}
        >
          <Icon type="message" style={{ marginRight: 8 }} />
          {reply.length}
        </span>
      ]}
    >
      <List.Item.Meta
        title={title}
        description={`由 ${postBy.realName} 发布于 ${timeUtil.utcDateToText(
          createTime
        )}`}
      />
      <ReactMarkdown source={content}></ReactMarkdown>
      <br />
      {attachments.map(value => {
        return <Attachment key={value._id} data={value} />;
      })}
      <ReplyList
        visible={showReply}
        title={`公告 ${title} 的评论区`}
        onCancel={() => {
          setShowReply(false);
        }}
        data={reply}
        baseUrl={`/announcement/${_id}`}
        onReply={() => {
          handleUpdate();
        }}
      />
    </List.Item>
  );
}
