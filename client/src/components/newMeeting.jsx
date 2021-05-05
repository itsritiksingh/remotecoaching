import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { AddRoom } from "../components/addRoom";
import { AddMeeting } from "../components/addMeeting";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { JoinMeeting } from "./JoinMeeting/JoinMeeting";

export const NewMeeting = () => {
  const [roomVisible, setRoomVisible] = useState();
  const [meetingVisible, setMeetingVisible] = useState();

  const onCreate = (values) => {
    axios.post("/meeting", values).then(() => {
      window.location.reload();
    });
  };

  const onMeetingCreate = (values) => {
    values.startedBy = jwt_decode(
      JSON.parse(localStorage.getItem("jwt")).ACCESS_TOKEN
    )._id;
    values.start = new Date();
    axios.post("/meeting", values).then((ques) => {
      window.location = "/conf/" + ques.data._id;
    });
    setMeetingVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          onClick={() => {
            setRoomVisible(true);
          }}
          style={{ backgroundColor: "1A57F3" }}
        >
          Schedule Meeting
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={() => {
            setMeetingVisible(true);
          }}
          style={{ backgroundColor: "1A57F3" }}
        >
          Start Meeting
        </Button>
      </Menu.Item>
    </Menu>
  );

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
        Make free unlimited video call all over the world
      </h1>
      <br />
      <AddRoom
        visible={roomVisible}
        onCreate={onCreate}
        onCancel={() => {
          setRoomVisible(false);
        }}
      />
      <AddMeeting
        visible={meetingVisible}
        onCreate={onMeetingCreate}
        onCancel={() => {
          setMeetingVisible(false);
        }}
      />

      <Dropdown overlay={menu} placement="topLeft">
        <Button style={{backgroundColor:"rgb(144, 49, 231)",color:"whitesmoke"}}>new meeting</Button>
      </Dropdown>
      <br/>
        <br/>
      <div
        className="or"
        style={{ backgroundColor: "C4C4C4", borderRadius: "50%" }}
      >
        OR
      </div>
        
      <JoinMeeting />
    </>
  );
};
