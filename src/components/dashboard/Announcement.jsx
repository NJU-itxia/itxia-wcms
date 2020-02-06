import React from "react";
import { List, Icon, Card, notification, Spin, Modal } from "antd";
import * as api from "../../util/api";
import ReplyList from "../reply";
import * as timeUtil from "../../util/time";
import Attachment from "../attachment";

class Announcement extends React.Component {
  constructor(props) {
    super(props);
    this.toggleReplyList = this.toggleReplyList.bind(this);
    this.handleReply = this.handleReply.bind(this);
  }
  state = {
    loading: true,
    showReply: "",
    data: []
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const data = await api.GET("/announcement?type=后台");
      this.setState({ data, loading: false });
    } catch (error) {
      notification.error({
        message: "获取公告失败",
        description: error.message,
        duration: 0
      });
    }
  }
  handleReply() {
    this.fetchData();
  }

  toggleReplyList = (announcementID = "") => () => {
    this.setState({
      showReply: announcementID
    });
  };
  render() {
    const { showReply, loading, data } = this.state;
    return (
      <Card>
        <h1>公告栏</h1>
        {loading ? (
          <Spin />
        ) : (
          <List
            itemLayout="vertical"
            size="default"
            dataSource={data}
            renderItem={item => (
              <List.Item
                key={item._id}
                actions={[
                  <span key={1}>
                    <Icon type={"like-o"} style={{ marginRight: 8 }} />
                    舒服了
                  </span>,
                  <span key={2} onClick={this.toggleReplyList(item._id)}>
                    <Icon type={"message"} style={{ marginRight: 8 }} />
                    {item.reply.length}
                  </span>
                ]}
              >
                <List.Item.Meta
                  title={item.title}
                  description={`由 ${
                    item.postBy.realName
                  } 发布于 ${timeUtil.utcDateToText(item.createTime)}`}
                />
                {item.content}
                <br />
                {item.attachments.map(value => {
                  return <Attachment key={value._id} data={value} />;
                })}
                <ReplyList
                  visible={showReply === item._id}
                  title={`公告 ${item.title} 的评论区`}
                  onCancel={this.toggleReplyList()}
                  data={item.reply}
                  baseUrl={`/announcement/${item._id}`}
                  onReply={this.handleReply}
                />
              </List.Item>
            )}
          ></List>
        )}
      </Card>
    );
  }
}

export default Announcement;
