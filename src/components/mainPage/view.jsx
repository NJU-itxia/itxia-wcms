import * as actions from "./actions";
import React from "react";
import "./style.css";
import { view as Navigate } from "../navigate/index";
import { connect } from "react-redux";
import { Layout, Alert } from "antd";
import { view as Avatar } from "../avatar/index";
import { view as SelfInfo } from "../selfInfo/index";
import { view as MemberList } from "../memberList/index";
import { view as AddMember } from "../addMember/index";
import config from "../../config/config";

const { Header, Sider, Content, Footer } = Layout;

class MainPage extends React.Component {
  componentDidMount() {
    //先获取个人信息(为了显示名字、头像...)
    this.props.onGetUserInfo();

    if (!this.props.page) {
      //切换到默认页
      this.props.onChangPage("selfInfo");
    }
    //获取个人信息
  }
  render() {
    const content = (() => {

      //验证是否有管理员权限
      const requireAdmin = reactNode => {
        if (this.props.userInfo.data.admin === true) {
          return reactNode;
        } else {
          return (
            <Alert
              message="需要管理员权限"
              description="此页面需要管理员权限才能查看."
              type="warning"
              showIcon
            />
          );
        }
      };
      switch (this.props.page) {
        case "selfInfo":
          return <SelfInfo></SelfInfo>;
        case "memberList":
          return requireAdmin(<MemberList></MemberList>);
        case "addMember":
          return requireAdmin(<AddMember></AddMember>);
        default:
          return null;
      }
    })();
    return (
      <Layout className="mainPage">
        <Header className="header">
          <div className="logo"></div>
          <Avatar className="avatar"></Avatar>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              //console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              //console.log(collapsed, type);
            }}
          >
            <Navigate></Navigate>
          </Sider>
          <Layout>
            <Content style={{ margin: "24px 24px 0",overflowX:"auto",overflowY:"auto" }}>
              <div className="mid">
                <div className="page">
                  {content ? content : <div>功能开发中...</div>}
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              {String(config.etc.footer.text)}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapState = state => {
  let page, userInfo;
  if (state.mainPage) {
    page = state.mainPage.page;
    if (state.mainPage.userInfo) {
      userInfo = state.mainPage.userInfo;
    }
  }
  return {
    page,
    userInfo
  };
};
const mapDispatch = dispatch => ({
  onGetUserInfo: () => {
    dispatch(actions.getUserInfo());
  },
  onChangPage: page => {
    dispatch(actions.changePage(page));
  }
});

export default connect(
  mapState,
  mapDispatch
)(MainPage);
