import React, { useState, useEffect } from "react";
import { Modal, Skeleton, Form, Input, Button, Radio, InputNumber } from "antd";
import { _notification } from "../../../utils/_helper";
import { updateHospitalService } from "../../../utils/services";

const UpdateProfile = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isBtnLoading, setIsBtnLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		if (props.details) {
			form.setFieldsValue({
				name: props.details.name,
				totalBeds: props.details.totalBeds,
				address: props.details.address,
				contact: props.details.contact,
				category: props.details.category
			});
			setIsLoading(false);
		}
	}, [props.details, form]);

	const onFinish = async values => {
		setIsBtnLoading(true);
		try {
			const res = await updateHospitalService(props.details._id, values);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Hospital update successfully"
				);
				props.setRefresh(!props.refresh);
				props.handleModal(false);
				form.setFieldsValue({
					name: "",
					contact: "",
					address: "",
					totalBeds: "",
					category: ""
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
						Update Hospital
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
							name="category"
							label="Category"
							rules={[
								{
									required: true,
									message: "Please select category!"
								}
							]}
						>
							<Radio.Group>
								<Radio value="l1">L1</Radio>
								<Radio value="l2">L2</Radio>
								<Radio value="l3">L3</Radio>
							</Radio.Group>
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
								style={{ width: "100%" }}
								className="input-field"
								placeholder="Enter contact no."
							/>
						</Form.Item>
						<Form.Item
							name="totalBeds"
							label="Total Beds"
							rules={[
								{
									required: true,
									message: "Please input total beds!"
								}
							]}
						>
							<InputNumber
								style={{ width: "100%" }}
								className="input-field"
								placeholder="Enter beds"
							/>
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

export default UpdateProfile;
