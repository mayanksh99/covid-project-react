import React, { useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { notification } from "antd";

import "./style.css";
const Login = props => {
	const onFinish = values => {
		console.log("Received values of form: ", values);
		notification.success({
			description: "Log in Successful",
			duration: 2,
			message: "Success"
		});
	};

	const onFinishFailed = values => {
		notification.error({
			description: "Log in Failed",
			duration: 2,
			message: "Error"
		});
	};

	return (
		<div>
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
						<h2 className="login-card-head">
							Log in to your account
						</h2>
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
						>
							<Form.Item
								className="imput-field"
								name="username"
								rules={[
									{
										required: true,
										message: "Please input your Username!"
									}
								]}
							>
								<Input
									prefix={
										<UserOutlined className="site-form-item-icon" />
									}
									placeholder="Username"
								/>
							</Form.Item>
							<Form.Item
								className="imput-field"
								name="password"
								rules={[
									{
										required: true,
										message: "Please input your Password!"
									}
								]}
							>
								<Input.Password
									prefix={
										<LockOutlined className="site-form-item-icon" />
									}
									placeholder="Password"
									iconRender={visible =>
										visible ? (
											<EyeTwoTone />
										) : (
											<EyeInvisibleOutlined />
										)
									}
								/>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									className="login-form-button"
									block
								>
									Log in
								</Button>
							</Form.Item>
							{/* <hr/> */}
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Login;
