import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./signIn.css";
import { Form, Input, Row, Col, Typography, Divider, Button,Alert } from "antd";
import { SolutionOutlined, LockOutlined } from "@ant-design/icons";

import { signin } from "../../helper/auth";

const { Title } = Typography;
function SignIn() {
  const onSubmit = (values) => {
    signin(values).catch((data) => {
      // if (data.status !== 200) {
        setAlert(true)
      // }
    });
  };
  const [alert,setAlert] = useState("none");
  return (
    <>
    <div style={{display: alert,position:"absolute",left:0,right:0,top:30,margin:"auto",width:"30%"}}>  <Alert banner="true" closable="true" onClose={() => setAlert(false)} type="error" message="Credential are not correct" /></div>
    <div className="auth-page-container">
      <Row style={{ width: "100%" }} justify="center">
        <Col md={{ span: 8 }}>
          <div className="auth-container">
            <Title>SIGN IN</Title>
            <Divider />
            <Form
              name="login"
              className="login-form"
              onFinish={onSubmit}
              size="large"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  prefix={<SolutionOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  Sign In
                </Button>
                <p style={{ fontSize: "1.1rem", marginTop: "5px" }}>
                  If you are new here, click <Link to="/signup">here</Link> to
                  register.
                </p>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default SignIn;
