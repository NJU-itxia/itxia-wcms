import { Result, Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();
  function onBack() {
    history.goBack();
  }
  return (
    <Result
      status="good luck"
      title="Not Found"
      subTitle="可能还在开发中,或是出错了."
      icon={<img src="/img/emoji-han.png" alt="404" />}
      extra={
        <Button type="primary" onClick={onBack}>
          返回
        </Button>
      }
    />
  );
}

export { NotFound };
