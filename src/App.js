import React from "react";

/**
 * antd的样式.
 * 放在import前面，避免覆盖自己写的style.
 * */
import "antd/dist/antd.css";

import { MainRouter } from "ROUTE/MainRouter";
import "./App.css";

function App() {
  return <MainRouter />;
}

export { App };
