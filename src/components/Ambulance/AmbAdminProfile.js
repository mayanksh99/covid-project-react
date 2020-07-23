import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Modal } from "antd";
import "./style.css";
import PageTitle from "../common/PageTitle";

const AmbAdminProfile = () => {
	const [isVisible, setIsVisible] = useState(false);
	const onFinish = values => {
		console.log("form O/P ", values);
	};

	const showModal = () => {
		setIsVisible(!isVisible);
	};

	const handleOk = () => {
		setIsVisible(!isVisible);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className="container">
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
			<PageTitle title="Change Password" style={{ marginTop: "40px" }} />

			<Form name="register" onFinish={onFinish}>
				<Row>
					<Col span={4}>Current Password</Col>
					<Col span={6}>
						<Form.Item
							name="currPassword"
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
				<Button type="primary" htmlType="submit">
					Change Password
				</Button>
			</Form>
			<div style={{ marginTop: "20px" }}>
				<Button type="primary" onClick={showModal}>
					Add Ambulance
				</Button>
			</div>

			<Modal
				title="Patient Details"
				visible={isVisible}
				centered
				onCancel={handleCancel}
				footer={[
					<Button
						key="submit"
						type="primary"
						onClick={handleOk}
						htmlType="submit"
					>
						Submit
					</Button>
				]}
			>
				<Form name="register" onFinish={onFinish}>
					<Row>
						<Col span={8}>Vehicle Number</Col>
						<Col>
							<Form.Item
								name="Vehicle Number"
								rules={[
									{
										required: true,
										message: "Please input this field"
									}
								]}
							>
								<Input className="pwd" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={8}>Driver Name</Col>
						<Col>
							<Form.Item
								name="Driver Name"
								rules={[
									{
										required: true,
										message: "Please input this field"
									}
								]}
							>
								<Input className="pwd" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={8}>Driver Phone</Col>
						<Col>
							<Form.Item
								name="Driver Phone"
								rules={[
									{
										required: true,
										message: "Please input this field"
									}
								]}
							>
								<Input className="pwd" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={8}>Area</Col>
						<Col>
							<Form.Item
								name="Area"
								rules={[
									{
										required: true,
										message: "Please input this field"
									}
								]}
							>
								<Input className="pwd" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</div>
	);
};

export default AmbAdminProfile;
