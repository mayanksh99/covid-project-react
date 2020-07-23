import React from "react";
import { Form, Button, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";

const AmbulanceAdminChangePass = () => {
	return (
		<div>
			<Form
				layout="vertical"
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
			>
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
					<Input
						placeholder="Enter password"
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
		</div>
	);
};

export default AmbulanceAdminChangePass;
