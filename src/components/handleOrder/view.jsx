import { Switch, Form, notification } from "antd";
import React from "react";
import * as api from "../../util/api";
import HandleOrderForm from "./HandleOrderForm";

const data = [];

class HandleOrder extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }
  state = {
    bordered: false,
    loading: false,
    pagination: { current: 1 },
    size: "default",
    title: () => "预约单列表",
    showHeader: true,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    campus: 0,
    data,
    tagList: []
  };

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    this.fetchTablePageCount();
    this.fetchTags();
  }

  fetchTablePageCount() {
    api
      .get(`/order/count`)
      .on("succ", payload => {
        this.setState({
          pagination: { ...this.state.pagination, total: payload }
        });
        this.fetchTableData();
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

  fetchTableData(page) {
    if (!!!page) {
      page = 1;
    }
    this.setState({
      loading: true
    });
    api
      .get(`/order?page=${page - 1}`) //api的页码从0开始数
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

  fetchTags() {
    //获取标签信息
    api.get("/tag").on("succ", payload => {
      this.setState({
        tagList: payload
      });
    });
    //TODO 处理获取标签失败
  }

  handleToggle = enable => {
    this.setState({ bordered: enable });
  };

  handleCampusChange = e => {
    this.setState({ campus: e.target.value });
  };

  handleShowFinishChange = enable => {
    this.setState({ showFinish: enable });
  };

  handlePageChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetchTableData(pagination.current);
  };

  render() {
    const { state } = this;
    return (
      <div style={{ overflow: "auto" }}>
        <Form layout="inline" style={{ marginBottom: 16 }} scroll={{ x: true }}>
          <Form.Item label="显示边框">
            <Switch checked={state.bordered} onChange={this.handleToggle} />
          </Form.Item>
        </Form>
        <HandleOrderForm
          loading={this.state.loading}
          bordered={this.state.bordered}
          data={this.state.data}
          pagination={this.state.pagination}
          tagList={this.state.tagList}
          onRequireUpdate={this.updateData}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default HandleOrder;
