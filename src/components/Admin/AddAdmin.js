import React, { useState } from "react";
import { Card, Form, Input, Select, Button } from "antd";
import { _notification } from "../../utils/_helper";
import { addAdminService } from "../../utils/services";

const { Option } = Select;

const AddAdmin = ({ refresh, setRefresh }) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			let data;
			if (values.permissions.includes("master")) {
				data = {
					name: values.name,
					email: values.email,
					contact: values.contact,
					permissions: ["master"]
				};
			} else {
				data = { ...values };
			}
			const res = await addAdminService(data);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification("success", "Success", "Admin added successfully");
				form.setFieldsValue({
					name: "",
					email: "",
					contact: "",
					permissions: []
				});
				setRefresh(!refresh);
			}
			setIsLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

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
					form={form}
					layout="vertical"
					name="add_admin"
					onFinish={onFinish}
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
							// prefix={<UserOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								type: "email",
								required: true,
								message: "Please input email!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter email"
							// prefix={<MailOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="contact"
						label="Contact No."
						rules={[
							{
								message: "Please input contact no.!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter contact number"
							// prefix={<UserOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="permissions"
						label="Permissions"
						rules={[
							{
								required: true,
								message: "Please select permission!"
							}
						]}
					>
						<Select placeholder="Select permission" mode="multiple">
							<Option value="master">Master</Option>
							<Option value="doctor">Doctor</Option>
							<Option value="hospital">Hospital</Option>
							<Option value="ambulance">Ambulance</Option>
						</Select>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							block
							loading={isLoading}
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
