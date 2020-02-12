import React, { useState } from "react";
import * as api from "../../util/api";
import { Button } from "antd";

export default function Logout() {
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
    <Button type="danger" onClick={handleLogout}>
      退出登录
    </Button>
  );
}