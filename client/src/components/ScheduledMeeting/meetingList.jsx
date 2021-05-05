import React, { useEffect } from "react";
import { List, message } from "antd";
import day from "dayjs";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);

export const MeetingList = ({ data }) => {
  function createButton(item) {
    let buffer = [];
    if (new day(item.start) < new Date()) {
      buffer.push(<Link to={`/conf/${item._id}`}>Join</Link>);
    }

    return buffer;
  }

  return (
    <>
      <List
        style={{ width: "100%" }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={createButton(item)}>
            <List.Item.Meta
              title={item.name}
              description={
                new day(item.start) > new Date()
                  ? day(item.start).fromNow()
                  : ""
              }
            />
            {item.startedBy.name}
          </List.Item>
        )}
      ></List>
    </>
  );
};
