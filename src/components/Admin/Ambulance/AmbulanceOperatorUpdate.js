import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, InputNumber } from "antd";
import { _notification } from "../../../utils/_helper";
import { updateOperatorService } from "../../../utils/services";

const AmbulanceAdminChangePass = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (props.data) {
			form.setFieldsValue({
				name: props.data.name,
				contact: props.data.contact
			});
		}
	}, [props.data, form]);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const res = await updateOperatorService(props.data._id, values);
			if (res.error) {
				_notification("error", "Error", res.message);
				setIsLoading(false);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Profile update successfully"
				);
				props.setRefresh(!props.refresh);
				props.handleModal(false);
				form.setFieldsValue({
					name: "",
					contact: ""
				});
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
						Update Profile
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
					name="operator_form"
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
						name="contact"
						label="Contact No."
						rules={[
							{
								required: true,
								message: "Please input contact no.!"
							}
						]}
					>
						<InputNumber
							className="input-field"
							placeholder="Enter contact no."
							style={{ width: "100%" }}
						/>
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

export default AmbulanceAdminChangePass;
