import React from "react";
import { Form, Button, Result, Row, Col, Icon } from "antd";
import * as api from "../../util/api";
import { config } from "CONFIG";

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
    const url = config.oauth.qq;
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
