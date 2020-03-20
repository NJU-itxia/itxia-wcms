import React, { useState, useEffect } from "react";
import { List, Card, notification, Spin } from "antd";
import * as api from "../../util/api";
import { Announcement } from "./Announcement";

function AnnouncementList() {
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const data = await api.GET("/announcement?type=后台");
      setData(data);
    } catch (error) {
      notification.error({
        message: "获取公告失败",
        description: error.message,
        duration: 0
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleUpdate() {
    fetchData();
  }

  return (
    <Card>
      <h1>公告栏</h1>
      {!!!data ? (
        <Spin />
      ) : (
        <List
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={data => (
            <Announcement
              id={data._id}
              data={data}
              handleUpdate={handleUpdate}
            />
          )}
        ></List>
      )}
    </Card>
  );
}

export { AnnouncementList };
