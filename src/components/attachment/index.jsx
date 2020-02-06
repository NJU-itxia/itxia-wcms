import React from "react";
import * as config from "../../config";
import "./index.css";
import { Modal, Divider, Icon } from "antd";
const { host, protocol } = config.default.network.api;

export default class Attachment extends React.Component {
  state = {
    showModal: false
  };

  onShowModal = () => {
    this.setState({
      showModal: true
    });
  };

  onHideModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const { md5, mimetype, fileName, size } = this.props.data;
    const { showModal } = this.state;
    const isImage = /image/.test(mimetype);
    const thumbnailUrl = `${protocol}://${host}/upload/${md5}?thumbnail`;
    const downloadUrl = `${protocol}://${host}/upload/${md5}`;
    return (
      <div className="reply-atech">
        {isImage ? (
          <img
            src={thumbnailUrl}
            alt="无法显示图片"
            className="itxia-attachment"
            onClick={this.onShowModal}
          />
        ) : (
          <div className="not-img-atech" onClick={this.onShowModal}>
            <Icon type="file-unknown" className="not-img-icon" />
            <br />
            <span>附件</span>
          </div>
        )}
        <Modal
          visible={showModal}
          title="附件查看"
          onCancel={this.onHideModal}
          okText={
            <a href={downloadUrl} target="_parent">
              下载附件
            </a>
          }
          cancelText="返回"
          centered
        >
          {isImage ? (
            <img src={downloadUrl} alt="无法显示图片" width="100%" />
          ) : (
            <div className="not-img-atech" onClick={this.onShowModal}>
              <Icon type="file-unknown" className="not-img-icon" />
              <br />
              <span>附件</span>
            </div>
          )}
          <Divider />
          <span>{`文件名: ${fileName}`}</span>
          <br />
          <span>{`类  型: ${mimetype}`}</span>
          <br />
          <span>{`大  小: ${Math.floor(size / 1024) + 1} KB`}</span>
        </Modal>
      </div>
    );
  }
}
