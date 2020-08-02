import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Skeleton, Select } from "antd";
import { _notification } from "../../../utils/_helper";
import { updateAmbulanceService } from "../../../utils/services";

const { Option } = Select;

const AmbulanceUpdate = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isBtnLoading, setIsBtnLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		if (props.data) {
			form.setFieldsValue({
				name: props.data.name,
				contact: props.data.contact,
				status: props.data.status,
				pincode: props.data.pincode
			});
			setIsLoading(false);
		}
	}, [props.data, form]);

	const onFinish = async values => {
		setIsBtnLoading(true);
		try {
			const res = await updateAmbulanceService(props.data.key, values);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Ambulance update successfully"
				);
				props.setRefresh(!props.refresh);
				props.handleModal(false);
				form.setFieldsValue({
					name: "",
					contact: "",
					status: "",
					pincode: ""
				});
			}
			setIsBtnLoading(false);
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
						Update Ambulance
					</h3>
				}
				visible={props.visible}
				onCancel={() => props.handleModal(!props.visible)}
				footer={null}
				width={400}
				style={{ top: 50 }}
			>
				<Skeleton loading={isLoading} active>
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
							label="Driver Phone No."
							rules={[
								{
									required: true,
									message: "Please input driver phone no.!"
								}
							]}
						>
							<Input
								className="input-field"
								placeholder="Enter driver phone no."
							/>
						</Form.Item>

						<Form.Item
							name="pincode"
							label="Pincode"
							rules={[
								{
									required: true,
									message: "Please input pincode!"
								}
							]}
						>
							<Input
								className="input-field"
								placeholder="Enter pincode"
							/>
						</Form.Item>

						<Form.Item
							name="status"
							label="Status"
							rules={[
								{
									required: true,
									message: "Please select status!"
								}
							]}
						>
							<Select placeholder="select status">
								<Option value="available">Avaliable</Option>
								<Option value="onDuty">On Duty</Option>
								<Option value="disabled">Disabled</Option>
							</Select>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
								block
								loading={isBtnLoading}
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Skeleton>
			</Modal>
		</>
	);
};

export default AmbulanceUpdate;
