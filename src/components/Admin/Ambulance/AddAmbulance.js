import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import { _notification } from "../../../utils/_helper";
import { addAmbulanceService } from "../../../utils/services";

const AddAmbulance = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const res = await addAmbulanceService(props.aoid, values);
			if (res.error) {
				_notification("error", "Error", res.message);
				setIsLoading(false);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Ambulance added successfully"
				);
				props.setRefresh(!props.refresh);
				props.handleModal(false);
				form.setFieldsValue({
					name: "",
					contact: "",
					vehicleNo: "",
					pincode: ""
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
						Add Ambulance
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
						name="vehicleNo"
						label="Vehicle No."
						rules={[
							{
								required: true,
								message: "Please input vehicle no.!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter vehicle no."
						/>
					</Form.Item>
					<Form.Item
						name="name"
						label="Driver Name"
						rules={[
							{
								required: true,
								message: "Please input driver name!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter driver name"
						/>
					</Form.Item>
					<Form.Item
						name="contact"
						label="Driver Contact No."
						rules={[
							{
								required: true,
								message: "Please input driver contact no.!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter driver contact no."
						/>
					</Form.Item>
					<Form.Item
						name="pincode"
						label="Pin code"
						rules={[
							{
								required: true,
								message: "Please input pincode!"
							}
						]}
					>
						<InputNumber
							className="input-field"
							placeholder="Enter pincode"
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
		</div>
	);
};

export default AddAmbulance;
