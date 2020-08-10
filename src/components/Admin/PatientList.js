import React, { useState } from "react";
import {
	Col,
	Card,
	Form,
	Input,
	Button,
	InputNumber,
	Radio,
	Upload,
	// message,
	DatePicker,
	Row
} from "antd";
import PageTitle from "./../common/PageTitle";
import { UploadOutlined } from "@ant-design/icons";
import { _notification } from "../../utils/_helper";
import { addPatientService, BASE_URL } from "../../utils/services";
import { ADD_BULK_PATIENTS } from "../../utils/routes";
import AddBulkResponseModal from "../../utils/_helper";

const PatientList = () => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	const [form] = Form.useForm();
	const dateFormat = "DD/MM/YYYY";
	const [isLoading, setIsLoading] = useState(false);
	const [bulkUploadDetails, setBulkUploadDetails] = useState(false);
	const [isResultsVisible, setIsResultsVisible] = useState(false);
	const [data, setData] = useState(null);
	const [report, setReport] = useState(null);
	// const [fileList, setFileList] = useState(null);
	// const uploadProps = {
	// 	name: "file",
	// 	action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	// 	headers: {
	// 		authorization: "authorization-text"
	// 	},
	// 	onChange(info) {
	// if (info.file.status !== "uploading") {
	// 	console.log(info.file, info.fileList);
	// }
	// if (info.file.status === "done") {
	// 	message.success(`${info.file.name} file uploaded successfully`);
	// } else if (info.file.status === "error") {
	// 	message.error(`${info.file.name} file upload failed.`);
	// }
	// 		if (info.file.status === "done") {
	// 			message.success(`${info.file.name} file uploaded successfully`);
	// 		} else if (info.file.status === "error") {
	// 			message.error(`${info.file.name} file upload failed.`);
	// 		}
	// 		setFileList(info.fileList);
	// 	},
	// 	onRemove(info) {
	// 		form.setFieldsValue({
	// 			report: undefined
	// 		});
	// 	}
	// };

	const props = {
		name: "file",
		action: `${BASE_URL}${ADD_BULK_PATIENTS}`,
		headers: {
			"x-auth-token": `${AUTH_TOKEN.token}`
		},
		onChange(info) {
			if (info.file.status === "done") {
				console.log(info.file.response);
				if (info.file.response.data.invalidPatients.length === 0) {
					_notification(
						"success",
						"Success",
						"All patients were added successfully !"
					);
				} else {
					setData(
						info.file.response.data.invalidPatients.map(h => {
							return {
								key: h.index + 1,
								hospital: h.hospital,
								reason: h.error
							};
						})
					);
					setBulkUploadDetails(info.file.response.data);
					_notification(
						"error",
						"Attention !",
						"Patient addition failed. Please Check !"
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

	const onFinish = async values => {
		setIsLoading(true);
		try {
			let sampleCollected = values.sampleCollected.format("DD/MM/YYYY");
			let sampleResult = values.sampleResult.format("DD/MM/YYYY");
			const formData = new FormData();
			formData.append("caseId", values.caseId);
			formData.append("name", values.name);
			formData.append("age", values.age);
			formData.append("gender", values.gender);
			formData.append("phone", values.phone);
			formData.append("address", values.address);
			formData.append("email", values.email);
			formData.append("relativePhone", values.relativePhone);
			formData.append("relativeEmail", values.relativeEmail);
			formData.append("sampleCollected", sampleCollected);
			formData.append("sampleResult", sampleResult);
			if (report) {
				formData.append("report", report);
			}
			const res = await addPatientService(formData);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Patient added successfully"
				);
				form.setFieldsValue({
					name: "",
					caseId: "",
					age: "",
					gender: "",
					phone: "",
					address: "",
					email: "",
					relativePhone: "",
					relativeEmail: "",
					sampleCollected: "",
					sampleResult: "",
					report: ""
				});
			}
			setIsLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	const handleReport = e => {
		setReport(e.target.files[0]);
	};

	const closeResults = () => {
		setIsResultsVisible(false);
	};

	const addPatientTableColumns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Patient Name",
			dataIndex: "patient",
			key: "patient"
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason"
		}
	];

	return (
		<>
			<PageTitle title="Add Patient" />
			<br />
			<div className="patient-form-wrapper">
				<Col xl={10} lg={10} md={14} sm={24} xs={24}>
					<Card>
						<p
							style={{
								fontSize: "18px",
								color: "#008DB9",
								fontWeight: 700
							}}
						>
							Patient Form
						</p>
						<Form
							form={form}
							layout="vertical"
							name="patient-form"
							className="login-form"
							onFinish={onFinish}
						>
							<Form.Item
								name="caseId"
								label="Case ID"
								rules={[
									{
										required: true,
										message: "Please input case id!"
									}
								]}
							>
								<Input
									className="input-field"
									placeholder="Enter case id"
									// prefix={<UserOutlined />}
								/>
							</Form.Item>
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
									// prefix={<UserOutlined />}
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
									min={1}
									style={{ width: "100%" }}
									className="input-field"
									placeholder="Enter age"
									// prefix={<UserOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="gender"
								label="Gender"
								rules={[
									{
										required: true,
										message: "Please select gender!"
									}
								]}
							>
								<Radio.Group>
									<Radio value="female">Female</Radio>
									<Radio value="male">Male</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item
								name="phone"
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
									placeholder="Enter number"
									// prefix={<UserOutlined />}
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
									// prefix={<UserOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="email"
								label="Email ID"
								rules={[
									{
										type: "email",
										// required: true,
										message: "Please input email!"
									}
								]}
							>
								<Input
									className="input-field"
									placeholder="Enter email"
									// prefix={<UserOutlined />}
								/>
							</Form.Item>

							<Form.Item
								name="relativePhone"
								label="Family's Contact No."
								rules={[
									{
										required: true,
										message: "Please input contact no.!"
									}
								]}
							>
								<Input
									className="input-field"
									placeholder="Enter number"
									// prefix={<UserOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="relativeEmail"
								label="Family's Email ID"
								rules={[
									{
										type: "email",
										// required: true,
										message: "Please input email id!"
									}
								]}
							>
								<Input
									className="input-field"
									placeholder="Enter email"
									// prefix={<UserOutlined />}
								/>
							</Form.Item>

							<Row gutter={[16, 16]}>
								<Col span={12}>
									<Form.Item
										name="sampleCollected"
										label="Sample Collected Date"
										rules={[
											{
												required: true,
												message:
													"Please input sample collected  date!"
											}
										]}
									>
										<DatePicker
											format={dateFormat}
											style={{ width: "100%" }}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="sampleResult"
										label="Sample Result Date"
										rules={[
											{
												required: true,
												message:
													"Please input sample result  date!"
											}
										]}
									>
										<DatePicker
											format={dateFormat}
											style={{ width: "100%" }}
										/>
									</Form.Item>
								</Col>
							</Row>

							<Form.Item name="report" label="Patient Report">
								{/* <Upload {...uploadProps} fileList={fileList}>
									<Button>
										<UploadOutlined /> Click to Upload
									</Button>
								</Upload> */}
								<Input type="file" onChange={handleReport} />
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

						<Upload accept=".csv" {...props}>
							<Button>
								<UploadOutlined />
								Upload CSV
							</Button>
						</Upload>
					</Card>
				</Col>
				<AddBulkResponseModal
					isResultsVisible={isResultsVisible}
					closeResults={closeResults}
					tableColumns={addPatientTableColumns}
					data={data}
					bulkUploadDetails={bulkUploadDetails}
					title={"Invalid Patients"}
					whatIsBeingAdded={"Patient"}
				/>
			</div>
		</>
	);
};

export default PatientList;
