import React, { useState } from "react";
import { Modal, Spin, Row, Col, Form, Select, Button, Input } from "antd";
import {
	dischargePatientService,
	addReportService
} from "../../utils/services";
import { getRole } from "../../utils/_helper";
import { _notification } from "./../../utils/_helper";

const { Option } = Select;
const { TextArea } = Input;

const PatientReport = ({
	rowData,
	refresh,
	setRefresh,
	isVisible,
	handleModal
}) => {
	const [form] = Form.useForm();
	const [userData] = useState(getRole());
	const [testcheck, settestcheck] = useState(null);
	const [patientStatus, setPatientStatus] = useState(null);
	const [modalSpin, setModalSpin] = useState(false);

	const handleCancel = () => {
		handleModal(false);
		form.setFieldsValue({
			testcheck: null,
			reportresult: null,
			rate: null,
			comment: null,
			type: null,
			patientstatus: null
		});
		setPatientStatus(null);
	};

	const handleStatusChange = value => {
		setPatientStatus(value);
	};

	const handleChange = val => {
		settestcheck(val);
	};

	const showTestPerformed =
		patientStatus === null || patientStatus === "discharged" ? null : (
			<Form.Item
				name="testcheck"
				initialValue="no"
				label="Test Performed Today:"
				rules={[
					{
						required: true,
						message: "Please fill details!"
					}
				]}
			>
				<Select onChange={handleChange}>
					<Option value="no">No</Option>
					<Option value="yes">Yes</Option>
				</Select>
			</Form.Item>
		);

	const showReportResult =
		patientStatus === "discharged" ||
		patientStatus === null ? null : testcheck === null ||
		  testcheck === "no" ? null : (
			<Form.Item
				name="reportresult"
				initialValue="positive"
				label="Report Result:"
				rules={[
					{
						required: true,
						message: "Please fill details!"
					}
				]}
			>
				<Select placeholder="select">
					<Option value="negative">negative</Option>
					<Option value="positive">positive</Option>
				</Select>
			</Form.Item>
		);

	const showPatientRating =
		patientStatus === null ? null : patientStatus === "discharged" ? (
			<Form.Item
				name="type"
				label="Status of Patient"
				rules={[
					{
						required: true,
						message: "Please fill details!"
					}
				]}
			>
				<Select placeholder="select">
					<Option value="deceased">Deceased</Option>
					<Option value="recovered">Recovered</Option>
				</Select>
			</Form.Item>
		) : (
			<Form.Item
				name="rate"
				label="Rate the patient"
				rules={[
					{
						required: true,
						message: "Please fill details!"
					}
				]}
			>
				<Select placeholder="select">
					<Option value="Undetermined">Undetermined</Option>
					<Option value="Good">Good</Option>
					<Option value="Fair">Fair</Option>
					<Option value="Critical">Critical</Option>
					<Option value="Serious">Serious</Option>
				</Select>
			</Form.Item>
		);

	const showDoctorComment =
		patientStatus === null || patientStatus === "discharged" ? null : (
			<Form.Item
				name="comment"
				label="Doctor's Comment"
				rules={[
					{
						required: true,
						message: "Please fill details!"
					}
				]}
			>
				<TextArea rows={4} />
			</Form.Item>
		);

	const onFinish = async values => {
		console.log(values);
		if (values.patientstatus === "discharged") {
			try {
				setModalSpin(true);
				const rawdata = {
					pid: rowData.key,
					type: values.type
				};
				const response = await dischargePatientService(
					userData.id,
					rawdata
				);
				if (response.error) {
					_notification("error", "Error", response.message);
					setModalSpin(false);
				} else if (
					response.message === "success" &&
					response.error === false
				) {
					_notification(
						"success",
						"Success",
						"Patient is successfully discharged !"
					);
					setRefresh(!refresh);
					setModalSpin(false);
					handleModal(false);
					form.setFieldsValue({
						testcheck: null,
						reportresult: null,
						rate: null,
						comment: null,
						type: null,
						patientstatus: null
					});
					setPatientStatus(null);
				}
				console.log(response);
			} catch (err) {
				_notification("error", "Error", err.message);
				setModalSpin(false);
			}
		} else if (values.patientstatus === "hospitalised") {
			try {
				setModalSpin(true);
				const rawdata = {
					pid: rowData.key,
					testPerformed: values.testcheck,
					testReport: values.reportresult ? values.reportresult : "",
					rating: values.rate,
					comment: values.comment
				};
				const res = await addReportService(userData.id, rawdata);
				if (res.error) {
					_notification("error", "Error", res.message);
					setModalSpin(false);
				} else if (res.message === "success") {
					_notification(
						"success",
						"Success",
						"Report updated successfully"
					);
					setRefresh(!refresh);
					setModalSpin(false);
					handleModal(false);
					form.setFieldsValue({
						testcheck: null,
						reportresult: null,
						rate: null,
						comment: null,
						type: null,
						patientstatus: null
					});
					setPatientStatus(null);
				}
			} catch (err) {
				_notification("error", "Error", err.message);
				setModalSpin(false);
			}
		}
	};

	return (
		<>
			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Patient Details
					</h3>
				}
				visible={isVisible}
				destroyOnClose={true}
				centered
				onCancel={handleCancel}
				width={800}
				footer={null}
			>
				<Spin spinning={modalSpin} tip="Processing...">
					{rowData ? (
						<>
							<Row>
								<Col span={4}>Name</Col>
								<Col span={7}>{rowData.name}</Col>
								<Col span={5}>ID</Col>
								<Col span={8}>{rowData.caseId}</Col>
							</Row>
							<Row>
								<Col span={4}>Gender</Col>
								<Col span={7}>{rowData.gender}</Col>
								<Col span={5}>Age</Col>
								<Col span={8}>{rowData.age}</Col>
							</Row>
							<Row>
								<Col span={4}>Ph. Number</Col>
								<Col span={7}> {`+91-${rowData.phone}`}</Col>
								<Col span={5}>District</Col>
								<Col span={8}>{rowData.district}</Col>
							</Row>
							<Row>
								<Col span={4}>E-mail</Col>
								<Col span={7}> {rowData.email}</Col>
								<Col span={5}>Patient Address</Col>
								<Col span={8}>{rowData.address}</Col>
							</Row>
							<Form
								form={form}
								name="update_patient_report"
								className="login-form"
								onFinish={onFinish}
							>
								<Row>
									<Col xl={12} lg={12} md={12} sm={12}>
										<Form.Item
											name="patientstatus"
											label="Patient Status"
											rules={[
												{
													required: true,
													message:
														"Please fill details!"
												}
											]}
										>
											<Select
												placeholder="select status"
												onChange={handleStatusChange}
											>
												<Option value="hospitalised">
													Hospitalised
												</Option>
												<Option value="discharged">
													Discharged
												</Option>
											</Select>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={[16, 16]}>
									<Col xl={12} lg={12} md={12} sm={12}>
										{showTestPerformed}
									</Col>
									<Col xl={12} lg={12} md={12} sm={12}>
										{showReportResult}
									</Col>
								</Row>
								{showPatientRating}
								{showDoctorComment}
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										className="login-form-button"
									>
										Submit
									</Button>
								</Form.Item>
							</Form>
						</>
					) : null}
				</Spin>
			</Modal>
		</>
	);
};

export default PatientReport;
