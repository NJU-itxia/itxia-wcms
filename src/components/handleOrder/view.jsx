import {
  Table,
  Icon,
  Switch,
  Radio,
  Form,
  Divider,
  Tag,
  notification
} from "antd";
import React from "react";
import * as timeUtil from "../../util/time";
import TextArea from "antd/lib/input/TextArea";
import * as api from "../../util/api";

const columns = [
  {
    title: "姓名",
    dataIndex: "customerName",
    key: "name"
  },
  {
    title: "电话",
    dataIndex: "customerPhone",
    key: "phone"
  },
  {
    title: "电脑型号",
    dataIndex: "model",
    key: "model"
  },
  {
    title: "保修",
    dataIndex: "warranty",
    key: "warranty",
    render: warranty => {
      switch (warranty) {
        case 0:
          return <Tag color="gray">不清楚</Tag>;
        case 1:
          return <Tag color="red">在保</Tag>;
        case 2:
          return <Tag color="blue">过保</Tag>;
        default:
          return <span>未知错误</span>;
      }
    }
  },
  {
    title: "校区",
    dataIndex: "campus",
    key: "campus",
    render: campus => {
      switch (campus) {
        case 1:
          return <Tag color="orange">仙林</Tag>;
        case 2:
          return <Tag color="cyan">鼓楼</Tag>;
        default:
          return <span>未知错误</span>;
      }
    }
  },
  {
    title: "预约时间",
    dataIndex: "time",
    key: "time",
    render: time => {
      return <span>{timeUtil.unixToText(time)}</span>;
    }
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: status => {
      switch (status) {
        case 0:
          return (
            <span>
              <Icon type="smile" theme="twoTone" />
              &nbsp;等待接单
            </span>
          );
        case 1:
          return (
            <span>
              <Icon type="clock-circle" theme="twoTone" spin />
              &nbsp;处理中
            </span>
          );
        case 2:
          return (
            <span>
              <Icon
                type="check-circle"
                theme="twoTone"
                twoToneColor="#52c41a"
              />
              &nbsp;已完成
            </span>
          );
        case 3:
          return (
            <span>
              <Icon type="close-circle" theme="twoTone" twoToneColor="red" />
              &nbsp;已取消
            </span>
          );
        case 4:
          return (
            <span>
              <Icon type="delete" theme="twoTone" twoToneColor="red" />
              &nbsp;已废弃
            </span>
          );
        default:
          return <span>未知错误</span>;
      }
    }
  },
  {
    title: "我来处理",
    key: "action",
    render: (text, record) => (
      <span>
        <a>接单</a>
        <Divider type="vertical" />
        <a>废弃</a>
      </span>
    )
  }
];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    id: 16 + i,
    customerName: "someone",
    customerPhone: "10086",
    customerQQ: "886",
    model: "MiBook Pro 😁",
    warranty: Math.floor(Math.random() * 3),
    campus: Math.floor(Math.random() * 2) + 1,
    description: "没事",
    status: Math.floor(Math.random() * 4),
    summary: null,
    time: 1573282420,
    history: [],
    handlerID: 0,
    handlerName: null
  });
}

const expandedRowRender = record => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "40%" }}>
        描述:<TextArea disabled value={record.description}></TextArea>
      </div>
      <span>ok</span>
    </div>
  );
};

const title = () => "Here is title";
const showHeader = true;
const footer = () => "Here is footer";
const scroll = { y: 240 };
const pagination = { position: "bottom" };

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    bordered: false,
    loading: false,
    pagination,
    size: "default",
    expandedRowRender,
    title: undefined,
    showHeader,
    footer,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    campus: 0,
    data
  };

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    this.setState({
      loading: true
    });
    api
      .get("/order")
      .on("succ", payload => {
        this.setState({
          loading: false,
          data: payload
        });
      })
      .on("fail", data => {
        notification.error({
          message: "返回值错误",
          description: data.errorMessage,
          duration: 0
        });
      })
      .on("error", e => {
        notification.error({
          message: "网络请求失败",
          description: e.toString(),
          duration: 0
        });
      });
  }

  handleToggle = prop => enable => {
    this.setState({ [prop]: enable });
  };

  handleCampusChange = e => {
    this.setState({ campus: e.target.value });
  };

  handleShowFinishChange = enable => {
    this.setState({ showFinish: enable });
  };

  render() {
    const { state } = this;
    return (
      <div style={{ overflow: "auto" }}>
        <Form layout="inline" style={{ marginBottom: 16 }} scroll={{ x: true }}>
          <Form.Item label="显示边框">
            <Switch
              checked={state.bordered}
              onChange={this.handleToggle("bordered")}
            />
          </Form.Item>
          <Form.Item label="显示已完成">
            <Switch
              checked={!!state.showFinish}
              onChange={this.handleShowFinishChange}
            />
          </Form.Item>
          <Form.Item label="校区">
            <Radio.Group
              value={state.campus}
              onChange={this.handleCampusChange}
            >
              <Radio.Button value={0}>全部</Radio.Button>
              <Radio.Button value={1}>仙林</Radio.Button>
              <Radio.Button value={2}>鼓楼</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Table
          {...this.state}
          columns={columns.map(item => ({ ...item, ellipsis: state.ellipsis }))}
          dataSource={this.state.data}
        />
      </div>
    );
  }
}

export default Demo;
