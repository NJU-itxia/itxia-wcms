import React from "react";
import { Form, Button, Result, Row, Col, Icon } from "antd";
import * as api from "../../util/api";

class OAuthQQForm extends React.Component {
  state = {
    loading: true,
    isBind: false,
    message: null
  };
  componentDidMount() {
    this.checkBind();
  }
  async checkBind() {
    try {
      await api.GET("/oauth/link/qq");
      this.setState({
        isBind: true
      });
    } catch (error) {
      this.setState({ message: error.message });
    }
    this.setState({
      loading: false
    });
  }

  openOAuthWindow() {
    const url =
      "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101842907&redirect_uri=https%3A%2F%2Fapi.itxia.cn%2Foauth%2Fqq&scope=get_user_info";
    window.open(url, "_blank");
  }

  render() {
    return (
      <div id="oauth-state">
        {this.state.isBind ? (
          <Result
            status="success"
            title="已绑定QQ登录"
            subTitle="可以使用QQ验证登录后台系统."
          />
        ) : (
          <div>
            <Row>
              <Col span={8} offset={9}>
                <Icon type="close-circle" theme="twoTone" twoToneColor="red" />
                <span>{this.state.message}</span>
                <br></br>
                <br></br>
                <Button
                  loading={this.state.loading}
                  type="primary"
                  onClick={this.openOAuthWindow}
                >
                  授权QQ登录
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const OAuthQQ = Form.create()(OAuthQQForm);

export { OAuthQQ };
