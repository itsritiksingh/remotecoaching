import React, { useEffect, useState } from "react";
import { MeetingList } from "./meetingList";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const ScheduledMeeting = () => {
  const [meeting, setMeeting] = useState();

  useEffect(() => {
    const _id = jwt_decode(JSON.parse(localStorage.getItem("jwt")).ACCESS_TOKEN)
      ._id;
    axios.get(`/user/meeting/${_id}`).then((res) => {
      setMeeting(res.data.meeting);
    });
  }, []);

  return (
    <div>
      <h1
        style={{
          fontSize: "2.25rem",
          fontWeight: "600",
          color: "#242424",
          display: "inline-block",
        }}
      >
        Scheduled
      </h1>
      <br />
      {meeting && <MeetingList data={meeting} type="simplelist" />}
    </div>
  );
};
