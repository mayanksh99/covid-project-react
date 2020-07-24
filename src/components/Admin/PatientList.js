import React from "react";
import {
	Col,
	Card,
	Form,
	Input,
	Button,
	InputNumber,
	Radio,
	Upload,
	message
} from "antd";
import PageTitle from "./../common/PageTitle";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";

const PatientList = () => {
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
		<>
			<PageTitle title="Add Patient" />
			<br />
			<div className="patient-form-wrapper">
				<Col xl={10} lg={10} md={14} sm={24} xs={24}>
					<Card>
						<p
							style={{
								fontSize: "18px",
								color: "#008DB9",
								fontWeight: 700
							}}
						>
							Patient Form
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
								<InputNumber
									min={1}
									style={{ width: "100%" }}
									className="input-field"
									placeholder="Enter age"
									prefix={<UserOutlined />}
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
								name="phone"
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
									placeholder="Enter number"
									// prefix={<UserOutlined />}
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
									// prefix={<UserOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="district"
								label="District"
								rules={[
									{
										required: true,
										message: "Please input district!"
									}
								]}
							>
								<Input
									className="input-field"
									placeholder="Enter district"
									// prefix={<UserOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="labname"
								label="Lab name"
								rules={[
									{
										required: true,
										message: "Please input lab name!"
									}
								]}
							>
								<Input
									className="input-field"
									placeholder="Enter lab name"
									// prefix={<UserOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="familyContact"
								label="Family's Contact No."
								rules={[
									{
										required: true,
										message: "Please input contact no.!"
									}
								]}
							>
								<Input
									className="input-field"
									placeholder="Enter number"
									// prefix={<UserOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="familyEmail"
								label="Family's Email ID"
								rules={[
									{
										type: "email",
										required: true,
										message: "Please input email id!"
									}
								]}
							>
								<Input
									className="input-field"
									placeholder="Enter email"
									// prefix={<UserOutlined />}
								/>
							</Form.Item>

							<Form.Item name="report" label="Patient Report">
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
					</Card>
				</Col>
			</div>
		</>
	);
};

export default PatientList;
