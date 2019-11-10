import { Table, Form } from "antd";
import React from "react";
import * as timeUtil from "../../util/time";
import * as api from "../../util/api";

const columns = [
  {
    title: "标签ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "标签名称",
    dataIndex: "tagName",
    key: "tagName"
  },
  {
    title: "引用次数",
    dataIndex: "useCount",
    key: "useCount"
  },
  {
    title: "添加时间",
    dataIndex: "addTime",
    key: "addTime",
    render: unixTime => {
      const time = timeUtil.unixToText(unixTime);
      return <span>{time}</span>;
    }
  },
  {
    title: "添加人",
    dataIndex: "addByMemberName",
    key: "addByMemberName"
  }
];

class TagManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null
    };
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    this.setState({
      loading: true,
      data: null
    });
    api
      .get("/tag")
      .on("succ", payload => {
        this.setState({
          loading: false,
          data: payload
        });
      })
      .on("fail", () => {
        //TODO
      })
      .on("error", e => {
        //TODO
      });
  }

  render() {
    const { state } = this;
    return (
      <div style={{ overflow: "auto" }}>
        <Form layout="inline" style={{ marginBottom: 16 }} scroll={{ x: true }}>
          <Button
            type="primary"
            onClick={this.reload}
            disabled={false}
            loading={this.loading}
          >
            刷新
          </Button>
        </Form>
        <Table
          columns={columns.map(item => ({ ...item }))}
          dataSource={data}
          loading={this.loading}
        />
      </div>
    );
  }
}

export default TagManage;
