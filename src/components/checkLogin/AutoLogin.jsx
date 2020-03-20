import React, { Fragment } from "react";
import { Button, Divider, Popconfirm, Modal } from "antd";
import * as api from "../../util/api";
import whoami from "../../util/whoami";
import routePath from "../../util/routePath";
import { Redirect, useLocation } from "react-router";

/**
 * 实际上并不是自动登录.
 * 而是检查有没有登录.
 */
class AutoLogin extends React.Component {
  state = {
    loading: true,
    isLogin: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.fetchData();
    }, 1000);
  }
  async fetchData() {
    try {
      await whoami.fetchData();
      this.setState({
        isLogin: true
      });
    } catch (error) {
      //要求登录
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, isLogin } = this.state;
    if (loading) {
      return (
        <Modal title="自动登录中..." footer={null}>
          shit
        </Modal>
      );
    }
    if (!isLogin) {
      return <Redirect to={routePath.LOGIN} />;
    } else {
      //已登录,如果还在登录界面,则跳转到主页
      //const location = useLocation();
      //console.log(location); //TODO
      if (window.location.pathname === routePath.LOGIN) {
        return <Redirect to={routePath.HOME} />;
      } else {
        const { children } = this.props.children;
        return <Fragment></Fragment>;
      }
    }
  }
}

export { AutoLogin };
