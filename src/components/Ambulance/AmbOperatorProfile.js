import React, { useState } from "react";
import { getRole, _notification } from "../../utils/_helper";
import { Row, Col, Form, Input, Button } from "antd";
import { Spin } from "antd";
import { changePassword } from "../../utils/services";
import PageTitle from "../common/PageTitle";
import "./style.css";

const AmbAdminProfile = () => {
	const userData = useState(getRole());
	const [form1] = Form.useForm();
	const [isSpinning, setIsSpinning] = useState(false);
	const onFinish = async values => {
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
				form1.setFieldsValue({
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
		<div>
			<Spin tip="In processing..." spinning={isSpinning} size="large">
				<PageTitle title="Profile" />
				<Row>
					<Col span={3}>Name</Col>
					<Col>{userData ? userData[0].name : null}</Col>
				</Row>
				<Row>
					<Col span={3}>Email</Col>
					<Col>{userData ? userData[0].email : null}</Col>
				</Row>
				<Row>
					<Col span={3}>ID</Col>
					<Col>{userData ? userData[0].id : null}</Col>
				</Row>
				<div style={{ marginTop: "50px" }}>
					<PageTitle title="Change Password" />
				</div>
				<Form name="register" onFinish={onFinish} form={form1}>
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
								<Input className="pwd" />
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
								<Input.Password className="pwd" />
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
								<Input.Password className="pwd" />
							</Form.Item>
						</Col>
					</Row>
					<Button
						type="primary"
						htmlType="submit"
						style={{ marginTop: "20px", width: "15%" }}
					>
						Change Password
					</Button>
				</Form>
			</Spin>
		</div>
	);
};

export default AmbAdminProfile;
