import React, { useState } from "react";
import * as api from "UTIL/api";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { routePath } from "ROUTE/routePath";

function LogoutButton() {
  const [isLogout, setLogout] = useState(false);
  const handleLogout = () => {
    api
      .GET("/logout")
      .then(() => {
        setLogout(true);
      })
      .catch(error => {});
  };
  const history = useHistory();
  if (isLogout) {
    history.push(routePath.LOGIN);
    return null;
  }
  return (
    <Button type="danger" onClick={handleLogout} id="logout-btn">
      退出登录
    </Button>
  );
}

export { LogoutButton };
