import React, { useState } from "react";
import * as api from "UTIL/api";
import { Button } from "antd";

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
  if (isLogout) {
    window.location.pathname = ""; //属实nt
    return null;
  }
  return (
    <Button type="danger" onClick={handleLogout} id="logout-btn">
      退出登录
    </Button>
  );
}

export { LogoutButton };
