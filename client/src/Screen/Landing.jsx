import React from "react";
import { Row, Col } from "antd";
import { ScheduledMeeting } from "../components/ScheduledMeeting/ScheduledMeeting.jsx";
import { NewMeeting } from "../components/newMeeting";
import { Navbar} from "../components/navbar/navbar";

export const Landing = () => {
  return (
    <>

    <Navbar />
    <div className="padding">
      <Row gutter={[24, 24]} justify="space-between">
        <Col lg={{span:10}} md={{span:24}}>
          <NewMeeting />
        </Col>
        <Col lg={{span:10}} md={{span:24}} >
          <ScheduledMeeting /> 
        </Col>
      </Row>
      </div>
    </>
  );
};  
