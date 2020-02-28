import { Layout, BackTop } from "antd";
import React from "react";
import { Navigate } from "../navigate";
import "./home.css";
import { HomeRouter } from "../../route";
import { view as MyFooter } from "../footer";
const { Header, Content, Footer } = Layout;

export function Home() {
  return (
    <Layout id="home">
      <Header id="home-header">
        <span id="home-header-text">NJU IT侠后台管理系统</span>
        <div id="home-header-navi">
          <Navigate />
        </div>
      </Header>
      <Content id="home-content">
        <HomeRouter />
        <BackTop />
      </Content>
      <Footer>
        <MyFooter />
      </Footer>
    </Layout>
  );
}
