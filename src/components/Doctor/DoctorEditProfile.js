import React from "react";
import { Upload, Form, Input, Select, Checkbox, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PageTitle from "../common/PageTitle";

const { Option } = Select;
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
const DoctorEditProfile = () => {
	const [form] = Form.useForm();
	const onFinish = values => {
		console.log("Received values of form: ", values);
	};
	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select style={{ width: 70 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		</Form.Item>
	);
	return (
		<div>
			<PageTitle title=" Edit Profile" />
			<div className="DoctorEditProfile-container">
				<Form
					{...formItemLayout}
					form={form}
					name="Edit profile"
					onFinish={onFinish}
					scrollToFirstError
					className="DoctorEditProfile-Form"
				>
					<Form.Item
						name="email"
						label="E-mail"
						rules={[
							{
								type: "email",
								message: "The input is not valid E-mail!"
							},
							{
								required: true,
								message: "Please input your E-mail!"
							}
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="phone"
						label="Phone Number"
						rules={[
							{
								required: true,
								message: "Please input your phone number!"
							}
						]}
					>
						<Input
							addonBefore={prefixSelector}
							style={{ width: "100%" }}
						/>
					</Form.Item>
					<Form.Item label="Residence">
						<Input />
					</Form.Item>

					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please input your password!"
							}
						]}
						hasFeedback
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="confirm"
						label="Confirm Password"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Please confirm your password!"
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (
										!value ||
										getFieldValue("password") === value
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										"The two passwords that you entered do not match!"
									);
								}
							})
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item name="upload" label="Upload Photo">
						<Upload
							name="logo"
							action="/upload.do"
							listType="picture"
						>
							<Button>
								<UploadOutlined /> Click to upload
							</Button>
						</Upload>
					</Form.Item>
					<Form.Item
						name="agreement"
						valuePropName="checked"
						rules={[
							{
								validator: (_, value) =>
									value
										? Promise.resolve()
										: Promise.reject(
												"confirm all details to continue"
										  )
							}
						]}
						{...tailFormItemLayout}
					>
						<Checkbox>confirm changes</Checkbox>
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button DoctorEditProfile-btn"
						>
							Save
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
export default DoctorEditProfile;
