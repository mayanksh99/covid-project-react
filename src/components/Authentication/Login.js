import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";
import PageTitle from "./../common/PageTitle";
import { loginService } from "../../utils/services";
import { _notification } from "../../utils/_helper";
import { DispatchContext } from "../../contexts/userContext";
import jwt from "jwt-decode";

const { Option } = Select;

const Login = props => {
	const [form] = Form.useForm();
	const Dispatch = useContext(DispatchContext);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("token"));
		if (token) {
			if (token.token !== "") {
				props.history.push("/");
			}
		}
	}, [props.history]);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const data = { email: values.email, password: values.password };
			const res = await loginService(values.role, data);
			if (res.error) {
				_notification("error", "Error", res.message);
				form.setFieldsValue({
					password: ""
				});
			} else if (res.res.message === "success") {
				Dispatch({
					type: "IN",
					token: res.token
				});
				_notification("success", "Success", "Logged In");
				form.setFieldsValue({
					email: "",
					password: ""
				});
				const decode = jwt(res.token);
				setTimeout(() => {
					if (decode.role === "admin") {
						props.history.push("/admins/patients");
					} else if (decode.role === "doctor") {
						props.history.push("/doctors/patients/examine");
					} else if (decode.role === "hospital") {
						props.history.push("/hospitals/patients/assign-bed");
					} else if (decode.role === "ambulanceoperator") {
						props.history.push(
							"/ambulance-operators/ambulances/assign"
						);
					}
				}, 200);
			}
			setIsLoading(false);
		} catch (err) {
			form.setFieldsValue({
				password: ""
			});
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	const onFinishFailed = values => {
		setIsLoading(true);
		_notification("error", "Error", "Something went wrong");
		setIsLoading(false);
	};

	return (
		<div>
			<Row>
				<Col span={10}>
					<div className="login-poster">
						<div className="login-grad">
							<img
								src="./assets/images/covid.png"
								alt="logo"
								width="240"
								style={{ marginLeft: "180px" }}
							/>
						</div>
					</div>
				</Col>
				<Col span={14}>
					<div className="login-card-container">
						<PageTitle title="Log in to your account" />

						<div className="login-input-form">
							<Form
								form={form}
								name="normal_login"
								className="login-form"
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
							>
								<Form.Item
									name="role"
									rules={[
										{
											required: true,
											message: "Please select your role!"
										}
									]}
								>
									{/* <div className="login-select-role"> */}
									<Select
										placeholder="Select role"
										style={{ width: "100%" }}
									>
										<Option value="doctor">Doctor</Option>
										<Option value="hospital">
											Hospital
										</Option>
										<Option value="ambulanceoperator">
											Ambulance
										</Option>
										<Option value="admin">Admin</Option>
									</Select>
									{/* </div> */}
								</Form.Item>
								<Form.Item
									name="email"
									rules={[
										{
											type: "email",
											required: true,
											message: "Please input your email!"
										}
									]}
								>
									<Input
										className="login-input-field mt-10"
										prefix={<UserOutlined />}
										placeholder="Email"
									/>
								</Form.Item>
								<Form.Item
									name="password"
									rules={[
										{
											required: true,
											message:
												"Please input your Password!"
										}
									]}
								>
									<Input.Password
										className="login-input-field mt-10"
										prefix={<LockOutlined />}
										placeholder="Password"
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
										Log in
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Login;
