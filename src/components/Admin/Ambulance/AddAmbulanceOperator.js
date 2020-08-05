import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { _notification } from "../../../utils/_helper";
import { addAmbOperatorService } from "../../../utils/services";

const AddAmbulanceAdmin = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const res = await addAmbOperatorService(values);
			if (res.error) {
				_notification("error", "Error", res.message);
				setIsLoading(false);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Operator added successfully"
				);
				props.setRefresh(!props.refresh);
				props.handleModal(false);
				form.setFieldsValue({
					name: "",
					contact: "",
					email: ""
				});
			}
			setIsLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

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
						Add Ambulance Operator
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
						/>
					</Form.Item>
					{/* <Form.Item
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
					</Form.Item> */}
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
		</div>
	);
};

export default AddAmbulanceAdmin;
