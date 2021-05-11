import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {Alert } from "antd"
import "../Signin/signIn.css";

import { Form, Input, Row, Col, Typography, Divider, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  SolutionOutlined
} from "@ant-design/icons";

import { signup } from "../../helper/auth";

const { Title } = Typography;

function SignUp() {
  const [didRedirect, setDidRedirect] = useState(false);
  const onSubmit = (values) => {
    signup(values).then((data) => {
      if (data.status === 200) {
        setDidRedirect(true);
      }else {
        return <Alert closable="true" type="error" description="Wrong credentials" />
      }
    });
  };

  const signupform = () => {
    return (
      <div className="auth-page-container">
        <Row style={{ width: "100%" }} justify="center">
          <Col md={{span:8}}>
            <div className="auth-container">
              <Title>SIGN UP</Title>
              <Divider />
              <Form
                name="signUp"
                className="signup-form"
                onFinish={onSubmit}
                size="large"
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Name!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Name"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <SolutionOutlined className="site-form-item-icon" />
                    }
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
                    Sign Up
                  </Button>
                  <p style={{ fontSize: "1.1rem", marginTop: "5px" }}>
                    Already a User? Click <Link to="/">here</Link> to Sign In.
                  </p>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }
  };
  return (
    <>
      {signupform()}
      {performRedirect()}
    </>
  );
}

export default SignUp;
