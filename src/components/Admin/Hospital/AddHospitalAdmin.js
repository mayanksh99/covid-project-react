import React from "react";
import { Modal, Row, Col, Form, Button, Input } from "antd";
import {
	UserOutlined,
	PhoneOutlined,
	PushpinOutlined,
	MailOutlined,
	LockOutlined
} from "@ant-design/icons";

const AddHospitalAdmin = props => {
	return (
		<div>
			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Add Hospital
					</h3>
				}
				visible={props.visible}
				onCancel={() => props.handleModal(!props.visible)}
				footer={null}
				width={400}
				style={{ top: 10 }}
			>
				<Form
					layout="vertical"
					name="update_patient"
					className="login-form"
					initialValues={{ remember: true }}
				>
					<Form.Item
						name="name"
						label="Hospital Name"
						rules={[
							{
								required: true,
								message: "Please input name!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter name"
							prefix={<UserOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "Please input email!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter email"
							prefix={<MailOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please input password!"
							}
						]}
					>
						<Input.Password
							className="input-field"
							placeholder="Enter password"
							prefix={<LockOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						label="Re-Password"
						rules={[
							{
								required: true,
								message: "Please input password!"
							}
						]}
					>
						<Input.Password
							className="input-field"
							placeholder="Enter Re-password"
							prefix={<LockOutlined />}
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

export default AddHospitalAdmin;
