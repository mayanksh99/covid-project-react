import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import PageTitle from "../common/PageTitle";

const AmbAdminProfile = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState("");
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	const beforeUpload = file => {
		const isJpgOrPng =
			file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must smaller than 2MB!");
		}
		return isJpgOrPng && isLt2M;
	};

	const handleChange = info => {
		if (info.file.status === "uploading") {
			setIsLoading(!isLoading);
			return;
		}
		if (info.file.status === "done") {
			getBase64(
				info.file.originFileObj,
				imageUrl => (setImage(imageUrl), setIsLoading(!isLoading))
			);
		}
	};

	const onFinish = values => {
		console.log("form O/P ", values);
	};

	const uploadButton = (
		<div>
			{isLoading ? <LoadingOutlined /> : <PlusOutlined />}
			<div className="ant-upload-text">Upload</div>
		</div>
	);

	return (
		<div>
			<PageTitle title="Profile" />
			<Row>
				<Col span={14}>
					<Row>
						<Col span={8}>Name</Col>
						<Col>Dayanand tiwari</Col>
					</Row>
					<Row>
						<Col span={8}>Email</Col>
						<Col>abc@example.com</Col>
					</Row>
					<Row>
						<Col span={8}>ID</Col>
						<Col>P1</Col>
					</Row>
				</Col>
				<Col>
					<Upload
						name="avatar"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						beforeUpload={beforeUpload}
						onChange={handleChange}
					>
						{image ? (
							<img
								src={image}
								alt="avatar"
								style={{ width: "100%" }}
							/>
						) : (
							uploadButton
						)}
					</Upload>
				</Col>
			</Row>
			<div style={{ marginTop: "50px" }}>
				<PageTitle title="Change Password" />
			</div>

			<Form name="register" onFinish={onFinish}>
				<Row>
					<Col span={4}>Current Password</Col>
					<Col span={6}>
						<Form.Item
							name="currPassword"
							hasFeedback={true}
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
							hasFeedback={true}
							rules={[
								{
									required: true,
									message: "Please enter your new password!"
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (
											!value ||
											getFieldValue("currPassword") !==
												value
										) {
											return Promise.resolve();
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
							hasFeedback={true}
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
		</div>
	);
};

export default AmbAdminProfile;
