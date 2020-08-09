import React, { useState } from "react";
import { getRole, _notification } from "../../utils/_helper";
import { Row, Col, Form, Input, Button, Modal, Upload } from "antd";
import { Spin } from "antd";
import { changePassword, addAmbulance } from "../../utils/services";
import PageTitle from "../common/PageTitle";
import AddBulkResponseModal from "../../utils/_helper";
import {
	PushpinOutlined,
	PhoneOutlined,
	UserOutlined,
	NumberOutlined,
	UploadOutlined
} from "@ant-design/icons";
import "./style.css";

const AmbAdminProfile = () => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	const userData = useState(getRole());
	const [form1] = Form.useForm();
	const [form2] = Form.useForm();
	const [isVisible, setIsVisible] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [isAmbAdding, setIsAmbAdding] = useState(false);
	const [isResultsVisible, setIsResultsVisible] = useState(false);
	const [bulkUploadDetails, setBulkUploadDetails] = useState(false);
	const [data, setData] = useState(null);
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
	let i = 1;
	const props = {
		name: "file",
		action: `https://covid-project-gzb.herokuapp.com/api/v1/ambulances/bulk/${userData[0].id}`,
		headers: {
			"x-auth-token": `${AUTH_TOKEN.token}`
		},
		onChange(info) {
			if (info.file.status === "done") {
				if (info.file.response.data.invalidAmbulances.length === 0) {
					_notification(
						"success",
						"Success",
						"All vehicles were added successfully !"
					);
				} else {
					setData(
						info.file.response.data.invalidAmbulances.map(amb => {
							return {
								key: i++,
								vehicleNo: amb.Ambulance,
								reason: amb.error
							};
						})
					);
					setBulkUploadDetails(info.file.response.data);
					_notification(
						"error",
						"Attention !",
						"Ambulance addition failed. Please Check !"
					);
					setIsResultsVisible(true);
				}
			} else if (info.file.status === "error") {
				_notification(
					"error",
					"Error",
					"Upload failed. Please try again later !"
				);
			}
		}
	};

	const add = async values => {
		setIsAmbAdding(true);
		const ambDetails = {
			vehicleNo: values.vehiclenumber,
			pincode: values.areapin,
			name: values.drivername,
			contact: values.driverphone
		};
		try {
			const res = await addAmbulance(ambDetails, userData[0].id);
			if (res.res.error) {
				setIsAmbAdding(false);
				_notification("error", "Error", res.res.message);
			} else if (res.res.message === "success") {
				form2.setFieldsValue({
					vehiclenumber: "",
					drivername: "",
					driverphone: "",
					areapin: ""
				});
				setIsAmbAdding(false);
				setIsVisible(false);
				_notification(
					"success",
					"Success",
					"Ambulance added successfully"
				);
			}
		} catch (err) {
			setIsAmbAdding(false);
			_notification("warning", "Error", err.message);
		}
	};

	const showModal = () => {
		setIsVisible(!isVisible);
	};

	const closeResults = () => {
		setIsResultsVisible(false);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	const tableColumns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Vehicle Number",
			dataIndex: "vehicleNo",
			key: "vehicleNo"
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason"
		}
	];

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
				<div style={{ marginTop: "20px" }}>
					<Button
						type="primary"
						onClick={showModal}
						style={{ width: "15%" }}
					>
						Add Ambulance
					</Button>{" "}
					or add in bulk via{" "}
					<Upload accept=".csv" {...props}>
						<Button>
							<UploadOutlined />
							Upload CSV
						</Button>
					</Upload>
				</div>
			</Spin>
			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Add Ambulance
					</h3>
				}
				visible={isVisible}
				onCancel={handleCancel}
				footer={null}
				width={400}
			>
				<Spin tip="Adding Ambulance..." spinning={isAmbAdding}>
					<Form
						layout="vertical"
						name="normal_login"
						form={form2}
						onFinish={add}
						className="login-form"
						initialValues={{ remember: true }}
					>
						<Form.Item
							name="vehiclenumber"
							label="Vehicle Number"
							rules={[
								{
									required: true,
									message: "Please input vehicle number!"
								}
							]}
						>
							<Input
								placeholder="Enter vehicle number"
								prefix={<NumberOutlined />}
							/>
						</Form.Item>
						<Form.Item
							name="drivername"
							label="Driver Name"
							rules={[
								{
									required: true,
									message: "Please input driver name!"
								}
							]}
						>
							<Input
								placeholder="Enter driver name"
								prefix={<UserOutlined />}
							/>
						</Form.Item>
						<Form.Item
							name="driverphone"
							label="Driver Phone No."
							rules={[
								{
									required: true,
									message: "Please input driver phone no.!"
								}
							]}
						>
							<Input
								placeholder="Enter driver phone no."
								prefix={<PhoneOutlined />}
							/>
						</Form.Item>
						<Form.Item
							name="areapin"
							label="Area Pin"
							rules={[
								{
									required: true,
									message: "Please input area pin!"
								}
							]}
						>
							<Input
								placeholder="Enter area pin"
								prefix={<PushpinOutlined />}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
								block
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</Modal>
			<AddBulkResponseModal
				isResultsVisible={isResultsVisible}
				closeResults={closeResults}
				tableColumns={tableColumns}
				data={data}
				bulkUploadDetails={bulkUploadDetails}
				title={"Invalid Ambulances"}
				whatIsBeingAdded={"Ambulance"}
			/>
		</div>
	);
};

export default AmbAdminProfile;
