import React from "react";
import { Card } from "antd";
import FromOldAccount from "./FromOldAccount";
import "./index.css";
export function Recovery() {
  return (
    <div id="recovery-container">
      <Card title="恢复老账号" className="recovery-form">
        <FromOldAccount />
      </Card>
    </div>
  );
}
