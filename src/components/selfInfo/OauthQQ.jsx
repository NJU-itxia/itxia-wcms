import React from "react";
import { Form, Button, Result } from "antd";
import * as api from "../../util/api";

class PasswordReset extends React.Component {
  state = {
    loading: true,
    isBind: false
  };
  componentDidMount() {
    this.checkBind();
  }
  checkBind() {
    api
      .get("/oauth/link/qq")
      .on("succ", () => {
        this.setState({ loading: false, isBind: true });
      })
      .on("fail", () => {
        this.setState({
          loading: false,
          isBind: false
        });
      });
  }
  render() {
    const url =
      "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101842907&redirect_uri=https%3A%2F%2Fapi.itxia.cn%2Foauth%2Fqq&scope=get_user_info";
    return (
      <div id="oauth-state">
        {this.state.isBind ? (
          <Result
            status="success"
            title="已绑定"
            subTitle="你可以使用QQ登录后台系统"
          />
        ) : (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button loading={this.state.loading} type="primary">
              授权QQ登录
            </Button>
          </a>
        )}
      </div>
    );
  }
}

export default Form.create()(PasswordReset);
