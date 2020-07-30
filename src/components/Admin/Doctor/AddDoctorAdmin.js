import React, { useState } from "react";
import { Modal, Form, Input, Button, Radio, InputNumber } from "antd";
import { addDoctorService } from "./../../../utils/services";
import { _notification } from "../../../utils/_helper";

const AddDoctorAdmin = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	// const uploadProps = {
	// 	name: "file",
	// 	action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	// 	headers: {
	// 		authorization: "authorization-text"
	// 	},
	// 	onChange(info) {
	// 		if (info.file.status !== "uploading") {
	// 			console.log(info.file, info.fileList);
	// 		}
	// 		if (info.file.status === "done") {
	// 			message.success(`${info.file.name} file uploaded successfully`);
	// 		} else if (info.file.status === "error") {
	// 			message.error(`${info.file.name} file upload failed.`);
	// 		}
	// 	}
	// };

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("empId", values.empId);
			formData.append("name", values.name);
			formData.append("age", values.age);
			formData.append("gender", values.gender);
			formData.append("contact", values.contact);
			formData.append("address", values.address);
			formData.append("email", values.email);
			formData.append("hospital", values.hospital);
			const res = await addDoctorService(formData);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Doctor added successfully"
				);
				props.setRefresh(!props.refresh);
				props.handleModal(false);
				form.setFieldsValue({
					name: "",
					empId: "",
					age: "",
					gender: "",
					contact: "",
					address: "",
					email: "",
					hospital: ""
				});
			}
			setIsLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
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
				form={form}
				layout="vertical"
				name="doctor_form"
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
					name="empId"
					label="Employee ID"
					rules={[
						{
							required: true,
							message: "Please input id!"
						}
					]}
				>
					<Input
						className="input-field"
						placeholder="Enter id"
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
						className="input-field"
						placeholder="Enter age"
						style={{ width: "100%" }}
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

				{/* <Form.Item name="image" label="Profile Pic">
					<Upload {...uploadProps}>
						<Button>
							<UploadOutlined /> Click to Upload
						</Button>
					</Upload>
				</Form.Item> */}

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
		</Modal>
	);
};

export default AddDoctorAdmin;
