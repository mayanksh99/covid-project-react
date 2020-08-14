import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Skeleton } from "antd";
import PageTitle from "../common/PageTitle";
import { getProfileService, updateProfileService } from "../../utils/services";
import { _notification } from "../../utils/_helper";

const { TextArea } = Input;
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 }
	}
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
};
const DoctorEditProfile = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isBtnLoading, setIsBtnLoading] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getProfileService();
				setData(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	useEffect(() => {
		if (data) {
			let { name, age, empId, about, contact, address, hospital } = data;
			form.setFieldsValue({
				name,
				empId,
				age,
				address,
				about,
				contact,
				hospital
			});
		}
	}, [data, form]);

	const onFinish = async values => {
		setIsBtnLoading(true);
		try {
			const formData = new FormData();
			formData.append("empId", values.empId);
			formData.append("name", values.name);
			formData.append("age", values.age);
			formData.append("contact", values.contact);
			formData.append("address", values.address);
			formData.append("hospital", values.hospital);
			formData.append("about", values.about);
			const res = await updateProfileService(
				props.match.params.id,
				formData
			);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Profile update successfully"
				);
				props.history.push("/doctors/profile");
			}
			setIsBtnLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	return (
		<>
			<PageTitle title=" Edit Profile" />
			<div className="DoctorEditProfile-container">
				<Skeleton loading={isLoading} active>
					<Form
						{...formItemLayout}
						form={form}
						name="Edit profile"
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

						{/* <Form.Item
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
						</Form.Item> */}

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

						<Form.Item name="about" label="About me">
							<TextArea rows={4} />
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
						<Form.Item {...tailFormItemLayout}>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button "
								block
								loading={isBtnLoading}
							>
								Save
							</Button>
						</Form.Item>
					</Form>
				</Skeleton>
			</div>
		</>
	);
};
export default DoctorEditProfile;
