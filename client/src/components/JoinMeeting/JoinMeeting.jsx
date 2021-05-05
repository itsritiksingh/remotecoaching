import React, { useState } from "react";
import axios from "axios";
import { Input } from "antd";
import { MeetingList } from "./MeetingList";
const { Search } = Input;

export const JoinMeeting = () => {
  const [loading, setSearchLoading] = useState(false);
  const [meeting, setMeeting] = useState();
  function onSearch(value) {
    setSearchLoading(true);
    axios
      .get(`/meeting`, {
        params: {
          search: "name",
          q: value,
          populate: "startedBy",
        },
      })
      .then((res) => {
        setSearchLoading(false);
        setMeeting(res.data);
      });
  }

  return (
    <>
      <h1
        style={{
          fontSize: "2.25rem",
          fontWeight: "600",
          color: "#242424",
          display: "inline-block",
        }}
      >
        Join
      </h1>
      <div className="40width" style={{ width: "70%" }}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          loading={loading}
          enterButton
        />
      </div>
      <br />
      <br />
      {meeting && <MeetingList data={meeting} type="searchlist" />}
    </>
  );
};
