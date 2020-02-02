import { Table, Tag, Icon } from "antd";
import React from "react";
import Action from "./Action";

export default class MemberListTable extends React.Component {
  //数据表格格式
  getColumns() {
    return [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "姓名", dataIndex: "realName", key: "realName" },
      { title: "登录名", dataIndex: "loginName", key: "loginName" },
      {
        title: "校区",
        dataIndex: "campus",
        key: "campus",
        render: campus => {
          switch (campus) {
            case "仙林":
              return <Tag color="cyan">仙林</Tag>;
            case "鼓楼":
              return <Tag color="orange">鼓楼</Tag>;
            default:
              return "未知";
          }
        },
        filters: [
          {
            text: "仙林",
            value: "仙林"
          },
          {
            text: "鼓楼",
            value: "鼓楼"
          }
        ],
        filterMultiple: false,
        onFilter: (filterValue, record) => filterValue === record.campus
      },
      {
        title: "身份",
        dataIndex: "role",
        key: "role",
        render: role => {
          switch (role) {
            case "超级用户":
              return <Tag color="gray">游客</Tag>;
            case "普通成员":
              return <Tag color="cyan">普通成员</Tag>;
            case "管理员":
              return <Tag color="orange">管理员</Tag>;
            default:
              return "未知";
          }
        },
        filters: [
          {
            text: "普通成员",
            value: "普通成员"
          },
          {
            text: "管理员",
            value: "管理员"
          }
        ],
        filterMultiple: false,
        onFilter: (filterValue, record) => filterValue === record.role
      },
      {
        title: "账号状态",
        dataIndex: "disable",
        key: "status",
        render: disable => {
          switch (disable) {
            case true:
              return (
                <span>
                  <Icon
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="red"
                  />
                  &nbsp;已禁用
                </span>
              );
            case false:
              return (
                <span>
                  <Icon
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                  />
                  &nbsp;正常
                </span>
              );
            default:
              return "未知";
          }
        },
        filters: [
          {
            text: "禁用",
            value: true
          },
          {
            text: "正常",
            value: false
          }
        ],
        filterMultiple: false,
        onFilter: (filterValue, record) => filterValue === record.status
      },
      {
        title: "操作",
        render: record => {
          return (
            <Action
              record={record}
              onActionDone={this.props.onActionDone}
            ></Action>
          );
        }
      }
    ];
  }

  render() {
    return (
      <Table
        columns={this.getColumns()}
        dataSource={this.props.data.map(value => ({
          key: value._id,
          ...value
        }))}
        loading={this.props.loading}
      />
    );
  }
}
