import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import { OrderPagination } from "./OrderPagination";
import { Loading } from "COMPONENTS/loading";
import { OrderInfoCard } from "./OrderInfoCard";
import { NotFound } from "COMPONENTS/notFound";

function OrderList(props) {
  const {
    loading,
    data,
    paginationInfo,
    onPaginationChange,
    onHandleOrder
  } = props;

  //加载中
  if (loading) {
    return <Loading delay={0} />;
  }

  //数据为空
  if (data.length === 0) {
    //TODO 显示没数据
    return <NotFound />;
  }

  //分页组件
  const { pageSize, totalCount, currentPage } = paginationInfo;
  const orderPagination = (
    <OrderPagination
      pageSize={pageSize}
      totalCount={totalCount}
      currentPage={currentPage}
      onChange={onPaginationChange}
    />
  );

  //渲染
  return (
    <Row gutter={[8, 0]} type="flex" justify="center" align="top">
      <Col span={24}>{orderPagination}</Col>
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
                onHandleOrder={onHandleOrder}
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
                onHandleOrder={onHandleOrder}
              />
            );
          })}
      </Col>
      <Col span={24}>{orderPagination}</Col>
    </Row>
  );
}

OrderList.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array,
  paginationInfo: PropTypes.object.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
  onHandleOrder: PropTypes.func.isRequired
};

export { OrderList };
