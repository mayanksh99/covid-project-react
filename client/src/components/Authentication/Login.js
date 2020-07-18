import React, { useState } from "react";
import { Row, Col, Card, Input, Button, Form } from "antd";
import styled from "styled-components";
import logo from "../../utils/assets/images/doctor5.jpg";
import { _notification } from "./../../utils/_helper";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const SideSeen = styled.div`
  height: 100vh;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
`;

const GradDiv = styled.div`
  height: 100vh;
  background: linear-gradient(
    0deg,
    #fe7676 16.55%,
    rgba(196, 196, 196, 0.2) 99.9%
  );
`;

const SideText = styled.h2`
  color: white;
  font-weight: bold;
  font-size: 38px;
  text-align: center;
  padding-top: 600px;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const EditCard = styled(Card)`
  width: 350px;
  background-color: #f1f1f1 !important;
  .ant-card-head-title {
  }
`;

const Heading = styled.div`
  font-weight: 700 !important;
  color: #fe7676;

  font-size: 28px;
  text-align: center;
`;

const EditInput = styled(Input)`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid;
  background-color: #f1f1f1;
  input {
    background-color: #f1f1f1;
  }
`;

const EditInputPass = styled(Input.Password)`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid;
  background-color: #f1f1f1;
  input {
    background-color: #f1f1f1;
  }
`;

const EditButton = styled(Button)`
  background-color: #fe7676;
  border: none;
  &:hover {
    background-color: #fe7676;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  }
  &:focus {
    background-color: #fe7676;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  }
`;

const Login = (props) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    setIsLoading(true);
    _notification("success", "Success", "Sign In successfully");
    setIsLoading(false);
  };

  const onFinishFailed = (values) => {
    setIsLoading(true);
    _notification("error", "Error", "Something went wrong");
    setIsLoading(false);
  };

  return (
    <div>
      <Row>
        <Col span={10}>
          <SideSeen>
            <GradDiv>
              <SideText>
                Welcome <br /> Corona Warriors
              </SideText>
            </GradDiv>
          </SideSeen>
        </Col>
        <Col span={14}>
          <LoginWrapper>
            <Heading>Sign In</Heading>
            <EditCard>
              <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                name="basic"
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <EditInput
                    prefix={<MailOutlined style={{ fontSize: "16px" }} />}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <EditInputPass
                    prefix={<LockOutlined style={{ fontSize: "16px" }} />}
                  />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <EditButton
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isLoading}
                  >
                    Sign In
                  </EditButton>
                </Form.Item>
              </Form>
            </EditCard>
          </LoginWrapper>
        </Col>
      </Row>
    </div>
  );
};

// const LoginForm = Form.create({ name: "login_form" })(Login);

export default Login;
