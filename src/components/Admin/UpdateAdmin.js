import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { _notification } from "../../utils/_helper";
import { updateAdminService } from "./../../utils/services";

const { Option } = Select;

const UpdateAdmin = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (props.data) {
			form.setFieldsValue({
				name: props.data.name,
				permissions: props.data.permissions
			});
		}
	}, [props.data, form]);

	console.log(props.data);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			let data;
			if (values.permissions.includes("master")) {
				data = {
					name: values.name,
					permissions: ["master"]
				};
			} else {
				data = { ...values };
			}
			const res = await updateAdminService(props.data._id, data);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Admin update successfully"
				);
				form.setFieldsValue({
					name: "",
					permissions: []
				});
				props.setRefresh(!props.refresh);
				props.handleModal(false);
			}
			setIsLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	return (
		<>
			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Update Admin
					</h3>
				}
				visible={props.visible}
				onCancel={() => props.handleModal(false)}
				footer={null}
				width={400}
				style={{ top: 50 }}
			>
				<Form
					form={form}
					layout="vertical"
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
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
			</Modal>
		</>
	);
};

export default UpdateAdmin;
