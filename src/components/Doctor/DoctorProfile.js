import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import PageTitle from "../common/PageTitle";

const AmbAdminProfile = () => {
	const onFinish = values => {
		console.log("form O/P ", values);
	};

	return (
		<div>
			<PageTitle title="Profile" />
			<Row>
				<Col span={3}>Name</Col>
				<Col>Dayanand tiwari</Col>
			</Row>
			<Row>
				<Col span={3}>Email</Col>
				<Col>abc@example.com</Col>
			</Row>
			<Row>
				<Col span={3}>ID</Col>
				<Col>P1</Col>
			</Row>
			<div style={{ marginTop: "50px" }}>
				<PageTitle title="Change Password" />
			</div>

			<Form name="register" onFinish={onFinish}>
				<Row>
					<Col span={4}>Current Password</Col>
					<Col span={6}>
						<Form.Item
							name="currPassword"
							hasFeedback={true}
							rules={[
								{
									required: true,
									message:
										"Please input your current password!"
								}
							]}
						>
							<Input className="pwd" />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={4}>New Password</Col>
					<Col span={6}>
						<Form.Item
							name="newPassword"
							dependencies={["currPassword"]}
							hasFeedback={true}
							rules={[
								{
									required: true,
									message: "Please enter your new password!"
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (
											!value ||
											getFieldValue("currPassword") !==
												value
										) {
											return Promise.resolve();
										}
										return Promise.reject(
											"New and Old password cannot be same"
										);
									}
								})
							]}
						>
							<Input.Password className="pwd" />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={4}>Confirm Password</Col>
					<Col span={6}>
						<Form.Item
							name="conPassword"
							dependencies={["newPassword"]}
							hasFeedback={true}
							rules={[
								{
									required: true,
									message: "Please confirm your password!"
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (
											!value ||
											getFieldValue("newPassword") ===
												value
										) {
											return Promise.resolve();
										}
										return Promise.reject(
											"password that you entered do not match!"
										);
									}
								})
							]}
						>
							<Input.Password className="pwd" />
						</Form.Item>
					</Col>
				</Row>
				<Button
					type="primary"
					htmlType="submit"
					style={{ marginTop: "20px", width: "15%" }}
				>
					Change Password
				</Button>
			</Form>
		</div>
	);
};

export default AmbAdminProfile;
