import React, { useState, useEffect } from "react";
import { Modal, Skeleton, Form, Input, InputNumber, Button } from "antd";
import { _notification } from "../../../utils/_helper";
import { updateDoctorService } from "../../../utils/services";

const { TextArea } = Input;

const UpdateDoctorProfile = ({
	visible,
	handleModal,
	detail,
	loading,
	did,
	refresh,
	setRefresh
}) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (detail) {
			let { name, age, about, contact, address, hospital } = detail;
			form.setFieldsValue({
				name,
				age,
				address,
				about,
				contact,
				hospital
			});
		}
	}, [detail, form]);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("name", values.name);
			formData.append("age", values.age);
			formData.append("contact", values.contact);
			formData.append("address", values.address);
			formData.append("hospital", values.hospital);
			formData.append("about", values.about);
			const res = await updateDoctorService(did, formData);
			if (res.error) {
				_notification("error", "Error", res.message);
				setIsLoading(false);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Profile update successfully"
				);
			}
			setRefresh(!refresh);
			handleModal(false);
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
						Update Doctor
					</h3>
				}
				visible={visible}
				onCancel={() => handleModal(!visible)}
				footer={null}
				width={400}
				style={{ top: 50 }}
			>
				<Skeleton loading={loading} active>
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
								style={{ width: "100%" }}
								className="input-field"
								placeholder="Enter age"
							/>
						</Form.Item>

						<Form.Item name="about" label="About me">
							<TextArea rows={4} />
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
				</Skeleton>
			</Modal>
		</>
	);
};

export default UpdateDoctorProfile;
