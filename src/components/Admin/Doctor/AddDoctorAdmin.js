import React from "react";
import { Modal, Form, Input, Button, Upload, message, Radio } from "antd";
import {
	// UserOutlined,
	// PhoneOutlined,
	// MailOutlined,
	// MedicineBoxOutlined,
	UploadOutlined
} from "@ant-design/icons";

const AddDoctorAdmin = props => {
	const uploadProps = {
		name: "file",
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		headers: {
			authorization: "authorization-text"
		},
		onChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	return (
		<Modal
			title={
				<h3
					style={{
						textAlign: "center",
						marginBottom: "-3px",
						color: "#fff"
					}}
				>
					Add Doctor
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
						// prefix={<UserOutlined />}
					/>
				</Form.Item>

				<Form.Item
					name="age"
					label="Age"
					rules={[
						{
							required: true,
							message: "Please input age!"
						}
					]}
				>
					<Input
						className="input-field"
						placeholder="Enter age"
						// prefix={<PhoneOutlined />}
					/>
				</Form.Item>

				<Form.Item
					name="gender"
					label="Gender"
					rules={[
						{
							required: true,
							message: "Please select gender!"
						}
					]}
				>
					<Radio.Group>
						<Radio value="female">Female</Radio>
						<Radio value="male">Male</Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item
					name="contact"
					label="Contact No."
					rules={[
						{
							required: true,
							message: "Please input contact no.!"
						}
					]}
				>
					<Input
						className="input-field"
						placeholder="Enter contact no."
						// prefix={<PhoneOutlined />}
					/>
				</Form.Item>

				<Form.Item
					name="address"
					label="Address"
					rules={[
						{
							required: true,
							message: "Please input address!"
						}
					]}
				>
					<Input
						className="input-field"
						placeholder="Enter address"
						// prefix={<MedicineBoxOutlined />}
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
						// prefix={<MailOutlined />}
					/>
				</Form.Item>

				<Form.Item
					name="hospital"
					label="Hospital"
					rules={[
						{
							required: true,
							message: "Please input hospital!"
						}
					]}
				>
					<Input
						className="input-field"
						placeholder="Enter hospital"
						// prefix={<MedicineBoxOutlined />}
					/>
				</Form.Item>

				<Form.Item name="image" label="Profile Pic">
					<Upload {...uploadProps}>
						<Button>
							<UploadOutlined /> Click to Upload
						</Button>
					</Upload>
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
	);
};

export default AddDoctorAdmin;
