import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Modal } from "antd";
import "./style.css";
import PageTitle from "../common/PageTitle";
import {
	PushpinOutlined,
	PhoneOutlined,
	UserOutlined,
	NumberOutlined
} from "@ant-design/icons";

const AmbAdminProfile = () => {
	const [isVisible, setIsVisible] = useState(false);
	const onFinish = values => {
		console.log("form O/P ", values);
	};

	const showModal = () => {
		setIsVisible(!isVisible);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
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
			<div style={{ marginTop: "20px" }}>
				<Button
					type="primary"
					onClick={showModal}
					style={{ width: "15%" }}
				>
					Add Ambulance
				</Button>
			</div>

			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Add Ambulance
					</h3>
				}
				visible={isVisible}
				onCancel={handleCancel}
				footer={null}
				width={400}
			>
				<Form
					layout="vertical"
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
				>
					<Form.Item
						name="vehiclenumber"
						label="Vehicle Number"
						rules={[
							{
								required: true,
								message: "Please input vehicle number!"
							}
						]}
					>
						<Input
							placeholder="Enter vehicle number"
							prefix={<NumberOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="drivername"
						label="Driver Name"
						rules={[
							{
								required: true,
								message: "Please input driver name!"
							}
						]}
					>
						<Input
							placeholder="Enter driver name"
							prefix={<UserOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="driverphone"
						label="Driver Phone No."
						rules={[
							{
								required: true,
								message: "Please input driver phone no.!"
							}
						]}
					>
						<Input
							placeholder="Enter driver phone no."
							prefix={<PhoneOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="areapin"
						label="Area Pin"
						rules={[
							{
								required: true,
								message: "Please input area pin!"
							}
						]}
					>
						<Input
							placeholder="Enter area pin"
							prefix={<PushpinOutlined />}
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							block
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default AmbAdminProfile;
