import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Button,
	Skeleton,
	Modal,
	Form,
	Input,
	Spin,
	Select
} from "antd";
import PageTitle from "../common/PageTitle";
import { _notification, getRole } from "../../utils/_helper";
import {
	getProfileService,
	updateHospitalProfileService,
	changePassword
} from "./../../utils/services";

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
const HospitalProfile = () => {
	const [userData] = useState(getRole());
	const [form1] = Form.useForm();
	const [form2] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isBtnLoading, setIsBtnLoading] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const { Option } = Select;
	const showModal = () => {
		setIsVisible(true);
	};
	const handleCancel = () => {
		setIsVisible(false);
	};
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getProfileService();
				//console.log(res);
				setData(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	useEffect(() => {
		if (data) {
			console.log(data);
			let { name, totalBeds, category, address, contact } = data;
			form1.setFieldsValue({
				name,
				totalBeds,
				category,
				address,
				contact
			});
		}
	}, [data, form1]);

	const onFinishprofile = async values => {
		console.log(values);
		setIsBtnLoading(true);
		try {
			const rawData = {
				name: values.name,
				category: values.category,
				address: values.address,
				contact: values.contact,
				totalBeds: values.totalBeds
			};
			const res = await updateHospitalProfileService(
				userData.id,
				rawData
			);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Profile update successfully"
				);
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
				handleCancel();
			}
			setIsBtnLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	const onFinishPass = async values => {
		setIsSpinning(true);
		const pwdDetails = {
			oldPassword: values.currPassword,
			newPassword: values.newPassword
		};
		try {
			const res = await changePassword(pwdDetails);
			if (res.res.error) {
				setIsSpinning(false);
				_notification("error", "Error", res.res.message);
			} else if (res.res.message === "success") {
				setIsSpinning(false);
				form2.setFieldsValue({
					currPassword: "",
					newPassword: "",
					conPassword: ""
				});
				setIsSpinning(false);
				_notification(
					"success",
					"Success",
					"Password Changed Successfully"
				);
			}
		} catch (err) {
			setIsSpinning(false);
			_notification("warning", "Error", err.message);
		}
	};

	return (
		<Spin tip="In processing..." spinning={isSpinning} size="large">
			<PageTitle title="Profile" />
			<Skeleton loading={isLoading} active>
				{data ? (
					<div className="HospitalProfile-container">
						<Row>
							<Col md={6} xs={12}>
								Name
							</Col>
							<Col md={6} xs={12}>
								{data.name}
							</Col>
							<Col md={6} xs={12}>
								Total Beds
							</Col>
							<Col md={6} xs={12}>
								{data.totalBeds}
							</Col>
						</Row>
						<Row>
							<Col md={6} xs={12}>
								Category
							</Col>
							<Col md={6} xs={12}>
								{data.category}
							</Col>
							<Col md={6} xs={12}>
								Available Beds
							</Col>
							<Col md={6} xs={12}>
								{data.availableBeds}
							</Col>
						</Row>
						<Row>
							<Col md={6} xs={12}>
								Address
							</Col>
							<Col md={6} xs={12}>
								{data.address}
							</Col>
							<Col md={6} xs={12}>
								Occupied Beds
							</Col>
							<Col md={6} xs={12}>
								{data.occupiedBeds}
							</Col>
						</Row>
						<Row>
							<Col md={6} xs={12}>
								Phone Number
							</Col>
							<Col md={6} xs={12}>
								+91-{data.contact}
							</Col>
							<Col md={6} xs={12}>
								Reserved Beds
							</Col>
							<Col md={6} xs={12}>
								{data.reservedBeds}
							</Col>
						</Row>
						<Row>
							<Col md={6} xs={12}>
								Email
							</Col>
							<Col md={6} xs={12}>
								{data.email}
							</Col>
						</Row>
						<br />
						<Row>
							<Col md={12} xs={24}>
								<Button type="primary" onClick={showModal}>
									Edit Profile
								</Button>
							</Col>
						</Row>
					</div>
				) : null}
			</Skeleton>
			<br />

			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Edit Profile
					</h3>
				}
				visible={isVisible}
				destroyOnClose={true}
				onCancel={handleCancel}
				width={350}
				footer={null}
			>
				<div>
					<Skeleton loading={isLoading} active>
						<Form
							{...formItemLayout}
							form={form1}
							name="Edit profile"
							onFinish={onFinishprofile}
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
								<Input />
							</Form.Item>
							<Form.Item
								name="category"
								label="Category"
								rules={[
									{
										required: true,
										message: "Please select level"
									}
								]}
							>
								<Select>
									<Option value="l1">l1</Option>
									<Option value="l2">l2</Option>
									<Option value="l3">l3</Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="address"
								label="Address"
								rules={[
									{
										required: true,
										message: "Please input the address!"
									}
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="contact"
								label="Contact"
								rules={[
									{
										required: true,
										message: "Please input contact details!"
									}
								]}
							>
								<Input />
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
								<Input />
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
			</Modal>

			<PageTitle title="Change Password" />
			<Form name="register" onFinish={onFinishPass} form={form2}>
				<Row>
					<Col span={4}>Current Password</Col>
					<Col span={6}>
						<Form.Item
							name="currPassword"
							rules={[
								{
									required: true,
									message:
										"Please input your current password!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={4}>New Password</Col>
					<Col span={6}>
						<Form.Item
							name="newPassword"
							dependencies={["currPassword"]}
							rules={[
								{
									required: true,
									message: "Please enter your new password!"
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (
											!value ||
											(getFieldValue("currPassword") !==
												value &&
												value.length >= 6)
										) {
											return Promise.resolve();
										} else if (
											getFieldValue("currPassword") !==
												value &&
											value.length < 6
										) {
											return Promise.reject(
												"Password must be atleast 6 digits long !"
											);
										}
										return Promise.reject(
											"New and Old password cannot be same"
										);
									}
								})
							]}
						>
							<Input.Password />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={4}>Confirm Password</Col>
					<Col span={6}>
						<Form.Item
							name="conPassword"
							dependencies={["newPassword"]}
							rules={[
								{
									required: true,
									message: "Please confirm your password!"
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (
											!value ||
											getFieldValue("newPassword") ===
												value
										) {
											return Promise.resolve();
										}
										return Promise.reject(
											"password that you entered do not match!"
										);
									}
								})
							]}
						>
							<Input.Password />
						</Form.Item>
					</Col>
				</Row>
				<Button type="primary" htmlType="submit">
					Change Password
				</Button>
			</Form>
		</Spin>
	);
};
export default HospitalProfile;
