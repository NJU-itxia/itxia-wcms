import React from "react";
import { Row, Col, Divider, Modal } from "antd";
import OrderInfoCard from "./OrderInfoCard";
import SearchConditionBar from "./SearchConditionBar";
import OrderPagination from "./OrderPagination";
import Loading from "../loading";
import * as api from "../../util/api";
import "./index.css";

export class HandleOrderNew extends React.Component {
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
    const {
      loading,
      data,
      totalCount,
      currentPage,
      pageSize,
      whoami
    } = this.state;
    return (
      <div>
        <SearchConditionBar onConditionChange={this.handleConditionChange} />
        <Divider />
        <OrderPagination
          pageSize={pageSize}
          totalCount={totalCount}
          currentPage={currentPage}
          onChange={this.handlePageChange}
          onShowSizeChange={this.handleShowSizeChange}
        />
        {loading ? (
          <div style={{ margin: "32px" }}>
            <Loading delay={0} />
          </div>
        ) : (
          <Row gutter={[8, 0]} type="flex" justify="center" align="top">
            <Col span={24}>{loading ? <Loading /> : null}</Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={10}>
              {data
                .filter((value, index) => {
                  return index % 2 === 0;
                })
                .map(value => {
                  return (
                    <OrderInfoCard
                      key={value._id}
                      data={value}
                      whoami={whoami}
                      onHandleOrder={this.handleHandleOrder}
                    />
                  );
                })}
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={10}>
              {data
                .filter((value, index) => {
                  return index % 2 === 1;
                })
                .map(value => {
                  return (
                    <OrderInfoCard
                      key={value._id}
                      data={value}
                      whoami={whoami}
                      onHandleOrder={this.handleHandleOrder}
                    />
                  );
                })}
            </Col>
            <Col span={24}>
              <OrderPagination
                pageSize={pageSize}
                totalCount={totalCount}
                currentPage={currentPage}
                onChange={this.handlePageChange}
                onShowSizeChange={this.handleShowSizeChange}
              />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
