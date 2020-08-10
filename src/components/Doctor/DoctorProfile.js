import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Skeleton, Avatar,Modal,Form, Input,Checkbox } from "antd";
import PageTitle from "../common/PageTitle";
import "./style.css";
import { _notification } from "../../utils/_helper";
import { getProfileService,changePassword } from "./../../utils/services";
import { Link } from "react-router-dom";
import { UserOutlined, RightOutlined } from "@ant-design/icons";


const DoctorProfile = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [form] = Form.useForm();
	// const [password, setPassword] = useState(null);

	const showModal = () => {
		setIsVisible(!isVisible);
	};

	const handleOk = () =>{
		setIsVisible(!isVisible);
	};

	const onFinish = async values => {
		// setIsSpinning(true);
		const pwdDetails = {
			oldPassword: values.currPassword,
			newPassword: values.newPassword
		};
		try {
			const res = await changePassword(pwdDetails);
			if (res.res.error) {
				// setIsSpinning(false);
				_notification("error", "Error", res.res.message);
			} else if (res.res.message === "success") {
				form.setFieldsValue({
					currPassword: "",
					newPassword: "",
					conPassword: ""
				});
				// setIsSpinning(false);
				_notification(
					"success",
					"Success",
					"Password Changed Successfully"
				);
			}
		} catch (err) {
			// setIsSpinning(false);
			_notification("warning", "Error", err.message);
		}
	};
	
	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

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

	return (
		<>
			<PageTitle title="Profile" />
			<Skeleton loading={isLoading} active>
				{data ? (
					<Card>
						<div className="DoctorProfile-content">
							<Row className="image-section">
								<div className="DoctorProfile-img">
									{data.image ? (
										<img
											src={data.image}
											alt="profilepic"
										/>
									) : (
										<Avatar
											size={72}
											icon={<UserOutlined />}
										/>
									)}
								</div>
							</Row>
							<div className="Doctor-details">
								<Row className="DoctorProfile-details-one">
									<div className="DoctorProfile-list">
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Name
											</Col>
											<Col md={12} xs={24}>
												{data.name}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Gender
											</Col>
											<Col md={12} xs={24}>
												{data.gender}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Age
											</Col>
											<Col md={12} xs={24}>
												{data.age}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Email
											</Col>
											<Col md={12} xs={24}>
												{data.email}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												ID
											</Col>
											<Col md={12} xs={24}>
												{data.empId}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Phone Number
											</Col>
											<Col md={12} xs={24}>
												+91-{data.contact}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Address
											</Col>
											<Col md={12} xs={24}>
												{data.address}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Hospital
											</Col>
											<Col md={12} xs={24}>
												{data.hospital}
											</Col>
										</Row>

										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												About
											</Col>
											<Col md={12} xs={24}>
												{data.about}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col md={12} xs={24}>
												<Link
													to={`/editprofile/${data._id}`}
												>
													<Button
														type="primary"
														htmlType="submit"
														className="login-form-button DoctorProfile-btn"
													>
														Edit Profile
													</Button>
													
												</Link>
											</Col>
											<Col md={12} xs={24}>
											<Button
														type="primary"
														className="login-form-button DoctorProfile-btn"
														onClick={showModal}
											>
														Change Password
											</Button>
											</Col>
										</Row>
									</div>
								</Row>
							</div>
						</div>
					</Card>
				) : null}
			</Skeleton>
			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Change Password
					</h3>
				}
				visible={isVisible}
				centered
				onCancel={handleCancel}
				width={600}
				footer={null}
			>
				<Form name="register" onFinish={onFinish} form={form}>
					<Row>
						<Col span={12}>Current Password</Col>
						<Col span={12}>
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
								<Input placeholder="Current Password" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={12}>New Password</Col>
						<Col span={12}>
							<Form.Item
								name="newPassword"
								dependencies={["currPassword"]}
								rules={[
									{
										required: true,
										message:
											"Please enter your new password!"
									},
									({ getFieldValue }) => ({
										validator(rule, value) {
											if (
												!value ||
												(getFieldValue(
													"currPassword"
												) !== value &&
													value.length >= 6)
											) {
												return Promise.resolve();
											} else if (
												getFieldValue(
													"currPassword"
												) !== value &&
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
								<Input placeholder="New Password" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={12}>Confirm Password</Col>
						<Col span={12}>
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
								<Input placeholder="Confirm Password" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
					<Col span={18}></Col>
					<Col span={6}>
					<Button
						type="primary"
						htmlType="submit"
						style={{ marginTop: "20px", width: "100%"}}
					>
						Change Password
					</Button>
					</Col>
					</Row>
					
				</Form>
			</Modal>
		</>
	);
};

export default DoctorProfile;
