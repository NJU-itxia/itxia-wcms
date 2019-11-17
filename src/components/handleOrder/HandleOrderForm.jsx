import React from "react";
import { Table, Icon, Tag } from "antd";
import * as timeUtil from "../../util/time";
import "./style.css";
import HandleOrderAction from "./HandleOrderAction";
import ExpandedRow from "./ExpandedRow";

export default class HandleOrderForm extends React.Component {
  //生成表的列信息
  generateColumns() {
    return [
      {
        title: "姓名",
        dataIndex: "customerName",
        key: "name"
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
        },
        filters: [
          {
            text: "仙林",
            value: 1
          },
          {
            text: "鼓楼",
            value: 2
          }
        ],
        filterMultiple: true,
        onFilter: (filterValue, record) => filterValue === record.campus
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
              return <Tag color="orange">过保</Tag>;
            default:
              return <span>未知错误</span>;
          }
        },
        filters: [
          {
            text: "不清楚",
            value: 0
          },
          {
            text: "在保",
            value: 1
          },
          {
            text: "过保",
            value: 2
          }
        ],
        filterMultiple: true,
        onFilter: (filterValue, record) => filterValue === record.warranty
      },
      {
        title: "标签",
        dataIndex: "tags",
        key: "tags",
        render: tags => (
          <div>
            {tags
              ? tags.map(value => <Tag key={value.id}>{value.tagName}</Tag>)
              : ""}
          </div>
        ),
        filters: this.props.tagList.map(value => ({
          text: value.tagName,
          value: value.id
        })),
        filterMultiple: true,
        onFilter: (filterTagID, record) => {
          const { tags } = record;
          if (tags && Array.isArray(tags)) {
            for (const tag of tags) {
              if (tag.id === filterTagID) {
                return true;
              }
            }
          }
          return false;
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
                  <Icon
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="red"
                  />
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
        render: (text, record) => {
          return (
            <HandleOrderAction
              {...record}
              onActionDone={this.props.onRequireUpdate}
            ></HandleOrderAction>
          );
        }
      }
    ];
  }
  render() {
    return (
      <Table
        loading={this.props.loading}
        bordered={this.props.bordered}
        expandedRowRender={ExpandedRow}
        columns={this.generateColumns()}
        dataSource={this.props.data.map(value => ({
          key: value.id,
          ...value
        }))}
      />
    );
  }
}
