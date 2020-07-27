import React from "react";
import { Modal, Form, Input, Button } from "antd";
import {
	UserOutlined,
	PhoneOutlined,
	MailOutlined,
	LockOutlined,
	PushpinOutlined
} from "@ant-design/icons";

const AddAmbulanceAdmin = props => {
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
						Add Ambulance Administrator
					</h3>
				}
				visible={props.visible}
				onCancel={() => props.handleModal(!props.visible)}
				footer={null}
				width={400}
				style={{ top: 50 }}
			>
				<Form
					layout="vertical"
					name="normal_login"
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
						name="phone"
						label="Phone"
						rules={[
							{
								required: true,
								message: "Please input phone!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter phone"
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
							className="input-field"
							placeholder="Enter pin"
							prefix={<PushpinOutlined />}
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

export default AddAmbulanceAdmin;
