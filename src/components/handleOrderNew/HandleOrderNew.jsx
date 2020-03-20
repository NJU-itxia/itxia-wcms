import React from "react";
import { Divider, Modal } from "antd";
import { SearchConditionBar } from "./SearchConditionBar";
import * as api from "UTIL/api";
import { OrderList } from "./OrderList";
import "./index.css";

class HandleOrderNew extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleShowSizeChange = this.handleShowSizeChange.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.handleHandleOrder = this.handleHandleOrder.bind(this);
  }

  state = {
    loading: true,
    currentPage: 1,
    totalCount: 0,
    pageSize: 20,
    conditionQuery: "&status=等待处理,正在处理",
    data: null,
    whoami: null
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({
      loading: true
    });
    try {
      const { currentPage, pageSize, conditionQuery } = this.state;
      const totalCount = await api.GET(`/order/count?${conditionQuery}`);
      const data = await api.GET(
        `/order?page=${currentPage - 1}&limit=${pageSize}${conditionQuery}`
      );
      const whoami = await api.GET("/whoami");
      this.setState({
        loading: false,
        data,
        whoami,
        totalCount
      });
    } catch (error) {
      Modal.error({
        title: "查询预约单失败",
        content: error.message,
        centered: true
      });
    }
  }

  handlePageChange(page, pageSize) {
    this.setState(
      {
        currentPage: page,
        pageSize
      },
      () => {
        this.fetchData();
      }
    );
  }

  handleShowSizeChange(currentPage, pageSize) {
    this.setState(
      {
        currentPage,
        pageSize
      },
      () => {
        this.fetchData();
      }
    );
  }

  handleConditionChange(queryString) {
    this.setState(
      {
        conditionQuery: queryString,
        currentPage: 1 //每次改变条件都把页码重置为1
      },
      () => {
        this.fetchData();
      }
    );
  }

  handleHandleOrder() {
    this.fetchData();
  }

  render() {
    const { loading, data, totalCount, currentPage, pageSize } = this.state;
    return (
      <div>
        <SearchConditionBar onConditionChange={this.handleConditionChange} />
        <Divider />
        <OrderList
          loading={loading}
          data={data}
          paginationInfo={{ pageSize, totalCount, currentPage }}
          onHandleOrder={this.handleHandleOrder}
          onPageChange={this.handlePageChange}
          onShowSizeChange={this.handleShowSizeChange}
        />
      </div>
    );
  }
}

export { HandleOrderNew };
