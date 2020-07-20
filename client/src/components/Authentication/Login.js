import React, { useState } from "react";
import { Row, Col } from "antd";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Card } from "antd";
import "./style.css";
import { _notification } from "./../../utils/_helper";
const Login = props => {
	const onFinish = values => {
		console.log("Received values of form: ", values);
		_notification("success", "Success", "Login Successfully");
	};

	const onFinishFailed = values => {
		_notification("error", "Error", "Error occured");
	};

	return (
		<>
			<Row>
				<Col span={10}>
					<div className="login-poster">
						<div className="login-grad">
							<h2 className="login-poster-text">
								Welcome <br /> Corona Warriors
							</h2>
						</div>
					</div>
				</Col>
				<Col span={14}>
					<div className="login-card-container">
						<Card
							className="login-form-card"
							title="Log In to your account"
						>
							<Form
								name="normal_login"
								className="login-form"
								initialValues={{ remember: true }}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
							>
								<Form.Item
									name="email"
									rules={[
										{
											type: "email",
											required: true,
											message: "Please input your email!"
										}
									]}
								>
									<Input
										prefix={<UserOutlined />}
										placeholder="Username"
									/>
								</Form.Item>
								<Form.Item
									name="password"
									rules={[
										{
											required: true,
											message:
												"Please input your Password!"
										}
									]}
								>
									<Input.Password
										prefix={<LockOutlined />}
										placeholder="Password"
									/>
								</Form.Item>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										block
									>
										Log in
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Login;
