import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";
import PageTitle from "./../common/PageTitle";
import { loginService } from "../../utils/services";
import { _notification } from "../../utils/_helper";
import { DispatchContext } from "../../contexts/userContext";

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				setTimeout(() => {
					props.history.push("/");
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
							<h2 className="login-poster-text">
								Welcome <br /> Corona Warriors
							</h2>
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
										className="input-field mt-10"
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
										className="input-field mt-10"
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
