import React from "react";
import { Layout, BackTop } from "antd";
import { Navigate } from "../navigate";
import { Footer as MyFooter } from "../footer";
import { HomeRouter } from "../../route";
import "./home.css";

const { Header, Content, Footer } = Layout;

function Home() {
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

export { Home };
