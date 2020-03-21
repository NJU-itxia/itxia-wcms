import { Result, Button } from "antd";
import React from "react";
import PropTypes from "prop-types";

function NotFound(props) {
  function onBack() {
    window.history.back();
  }

  const {
    status = "good luck",
    title = "Not Found",
    subTitle = "可能还在开发中,或是出错了.",
    icon = <img src="/img/emoji-han.png" alt="404" />,
    extra = (
      <Button type="primary" onClick={onBack}>
        返回
      </Button>
    )
  } = props;

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      icon={icon}
      extra={extra}
    />
  );
}

NotFound.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  icon: PropTypes.node,
  extra: PropTypes.node
};

export { NotFound };
