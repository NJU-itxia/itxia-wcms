import { Table, Badge, Menu, Dropdown, Icon } from "antd";
import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import requestStatus from "../../util/requestStatus";
const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

function NestedTable(props) {
  const expandedRowRender = record => {
    const columns = [
      { title: "单号", dataIndex: "id", key: "id" },
      { title: "申请人", dataIndex: "customer", key: "customer" },
      {
        title: "状态",
        key: "statusRawValue",
        render: appointment => {
          let status, text;
          switch (appointment.statusRawValue) {
            case 1:
              status = "processing";
              text = "处理中";
              break;
            case 2:
              status = "success";
              text = "已完成";
              break;
            default:
              status = "warning";
              text = "未知状态";
          }
          return <Badge status={status} text={text} />;
        }
      },
      { title: "校区", dataIndex: "locationRawValue", key: "locationRawValue" },
      { title: "电脑型号", dataIndex: "deviceModel", key: "deviceModel" },
      {
        title: "问题描述",
        dataIndex: "problemDescription",
        key: "problemDescription"
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <span className="table-operation">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        )
      }
    ];

    const data = [];
    if (props.appointments.status === requestStatus.SUCC) {
      for (const appointment of props.appointments.payload.data.content) {
        if (appointment.handler === record.id) {
          data.unshift({
            key: appointment.id,
            ...appointment
          });
        }
      }
    }

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={true}
        loading={props.appointments.status !== requestStatus.SUCC}
      />
    );
  };

  //外层
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "账号", dataIndex: "account", key: "account" },
    { title: "校区", dataIndex: "location", key: "upgradeNum" },
    { title: "是否管理员", dataIndex: "admin", key: "admin" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "是否接收邮件提醒", dataIndex: "acceptEmail", key: "acceptEmail" },
    { title: "禁用账号", key: "operation", render: () => <a>禁用账号</a> }
  ];

  const data = [];

  switch (props.memberList.status) {
    case "IDLE":
      props.onGetAllMemberList();
      props.onGetAppointments();
      break;
    case "SUCC":
      for (const member of props.memberList.payload.data) {
        data.unshift({
          ...member,
          acceptEmail: member.acceptEmail ? "是" : "否",
          admin: member.admin ? "是" : "否",
          location: member.locationRawValue,
          account: member.loginName,
          email: member.email ? member.email : "无",
          key: member.id
        });
      }
      //获取所有订单
      //TODO 优化性能
      break;
    default:
      break;
  }
  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
      loading={props.memberList.status !== requestStatus.SUCC}
    />
  );
}

const mapState = state => {
  return {
    memberList: state.memberList.memberList,
    appointments: {
      ...state.memberList.appointments,
      filter: {
        id: state.mainPage.userInfo.data.id
      }
    }
  };
};

const mapDispatch = dispatch => ({
  onGetAllMemberList: () => {
    dispatch(actions.getAllMemberInfo());
  },
  onGetAppointments: () => {
    dispatch(actions.getAllAppointment());
  }
});

export default connect(
  mapState,
  mapDispatch
)(NestedTable);
