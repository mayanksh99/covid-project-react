import React from "react";
import { Card, Form, Input, Select, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddAdmin = () => {
	return (
		<div>
			<Card>
				<p
					style={{
						fontSize: "18px",
						color: "#008DB9",
						fontWeight: 700
					}}
				>
					Add Admin
				</p>
				<Form
					layout="vertical"
					name="update_patient"
					className="login-form"
					initialValues={{ remember: true }}
				>
					<Form.Item
						name="name"
						label="Name"
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
						name="role"
						label="Role"
						rules={[
							{
								required: true,
								message: "Please select role!"
							}
						]}
					>
						<Select
							placeholder="Select role"
							// className="input-field"
							prefix={<MailOutlined />}
						>
							<Option value="Master">Master</Option>
							<Option value="Doctor">Doctor</Option>
							<Option value="Hospital">Hospital</Option>
							<Option value="Ambulance">Ambulance</Option>
						</Select>
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
			</Card>
		</div>
	);
};

export default AddAdmin;
