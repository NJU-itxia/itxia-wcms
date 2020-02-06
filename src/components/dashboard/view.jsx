import { Radio, Row, Col, Spin, Card, Statistic, Icon, Divider } from "antd";
import React from "react";
import "./index.css";
import Announcement from "./Announcement";
import OrderTotal from "./OrderTotal";

export default class DashBoard extends React.Component {
  state = {
    loading: true,
    data: null
  };

  fetchData() {
    //TODO
    //mock data
    setTimeout(() => {
      this.setState({
        loading: false,
        data: {
          order: {
            total: {
              等待处理: 74,
              正在处理: 15,
              已完成: 9876
            },
            backlog: {
              仙林: 25,
              鼓楼: 12
            }
          },
          announcement: [
            {
              href: "http://ant.design",
              title: `ant design part`,
              avatar:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
              description:
                "Ant Design, a design language for background applications, is refined by Ant UED Team.",
              content:
                "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
            }
          ]
        }
      });
    }, 500);
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.loading) {
      return <Spin></Spin>;
    }
    const text = (
      <Card>
        <Statistic
          title="积压的预约单"
          value={15}
          precision={0}
          valueStyle={{ color: "red" }}
          prefix={<Icon type="arrow-up" />}
        />
        <Radio.Group
          value={"全部"}
          defaultValue="全部"
          onChange={this.handleSizeChange}
        >
          <Radio.Button value="全部">全部</Radio.Button>
          <Radio.Button value="仙林">仙林</Radio.Button>
          <Radio.Button value="鼓楼">鼓楼</Radio.Button>
        </Radio.Group>
      </Card>
    );
    return (
      <div id="dash-container">
        <Row gutter={[16, 16]} justify="start">
          <Col xs={24} lg={15}>
            <Announcement />
            <Divider />
          </Col>
          <Col xs={24} lg={9}>
            <OrderTotal data={this.state.data.order.total} />
            <Divider />
          </Col>
        </Row>
      </div>
    );
  }
}
