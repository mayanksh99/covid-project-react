import React, { useState } from "react";
import { Modal, Row, Col, Form, Button, Select, Input } from "antd";
import ProfileDetails from "../../common/ProfileDetails";
import { _notification } from "../../../utils/_helper";
import {
	addPatientReportService,
	dischargePatientService
} from "../../../utils/services";

const { Option } = Select;
const { TextArea } = Input;

const UpdatePatientReport = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [performed, setPerformed] = useState(null);
	const [patientStatus, setPatientStatus] = useState(null);

	const handleStatusChange = value => {
		setPatientStatus(value);
	};

	const onFinish = async values => {
		setIsLoading(true);
		if (patientStatus === "hospitalised") {
			try {
				const data = {
					pid: props.patientData.key,
					testPerformed: values.testPerformed,
					testReport: values.testReport ? values.testReport : "",
					rating: values.rate,
					comment: values.comment
				};

				const res = await addPatientReportService(props.hid, data);
				if (res.error) {
					_notification("error", "Error", res.message);
					setIsLoading(false);
				} else if (res.message === "success") {
					_notification(
						"success",
						"Success",
						"Report update successfully"
					);
					props.handleModal(false);
					form.setFieldsValue({
						testPerformed: null,
						rate: null,
						testReport: null,
						comment: null,
						patientstatus: null,
						type: null
					});
					setPatientStatus(null);
				}
				setIsLoading(false);
			} catch (err) {
				_notification("error", "Error", err.message);
				setIsLoading(false);
			}
		} else {
			try {
				setIsLoading(true);
				const data = {
					pid: props.patientData.key,
					type: values.type
				};
				const response = await dischargePatientService(props.hid, data);
				if (response.error) {
					_notification("error", "Error", response.message);
					setIsLoading(false);
				} else if (
					response.message === "success" &&
					response.error === false
				) {
					_notification(
						"success",
						"Success",
						"Patient is successfully discharged !"
					);
					props.setRefresh(!props.refresh);
					form.setFieldsValue({
						type: null,
						testcheck: null,
						reportresult: null,
						rate: null,
						comment: null,
						patientstatus: null
					});
					setPatientStatus(null);
					props.handleModal(false);
					setIsLoading(false);
				}
			} catch (err) {
				_notification("error", "Error", err.message);
				setIsLoading(false);
			}
		}
	};

	return (
		<div>
			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Patient Report
					</h3>
				}
				visible={props.visible}
				onCancel={() => {
					props.handleModal(!props.visible);
					form.setFieldsValue({
						type: null,
						testcheck: null,
						reportresult: null,
						rate: null,
						comment: null,
						patientstatus: null
					});
					setPatientStatus(null);
				}}
				footer={null}
				width={600}
				style={{ top: 10 }}
			>
				{props.patientData ? (
					<>
						<Row gutter={[16, 16]}>
							<Col xl={12} lg={12} md={12} sm={12} xs={24}>
								<ProfileDetails
									label="Name"
									data={props.patientData.name}
								/>
								<ProfileDetails
									label="Gender"
									data={props.patientData.gender}
								/>
								<ProfileDetails
									label="Relative Phone"
									data={props.patientData.relativePhone}
								/>
								<ProfileDetails
									label="District"
									data={props.patientData.district}
								/>
							</Col>
							<Col xl={12} lg={12} md={12} sm={12} xs={24}>
								<ProfileDetails
									label="Case ID"
									data={props.patientData.caseId}
								/>
								<ProfileDetails
									label="Age"
									data={props.patientData.age}
								/>

								<ProfileDetails
									label="Patient Address"
									data={props.patientData.address}
								/>
							</Col>
						</Row>
						<Form
							form={form}
							layout="vertical"
							name="update_patient"
							className="login-form"
							onFinish={onFinish}
						>
							<Row gutter={[16, 16]}>
								<Col xl={12} lg={12} md={12} sm={12}>
									<Form.Item
										name="patientstatus"
										label="Patient Status"
										rules={[
											{
												required: true,
												message: "Please fill details!"
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
							{patientStatus === null ? null : patientStatus ===
							  "hospitalised" ? (
								<>
									<Row gutter={[16, 16]}>
										<Col xl={12} lg={12} md={12} sm={12}>
											<Form.Item
												name="rate"
												label="Rate the patient"
												rules={[
													{
														required: true,
														message:
															"Please fill details!"
													}
												]}
											>
												<Select placeholder="select">
													<Option value="Undetermined">
														Undetermined
													</Option>
													<Option value="Good">
														Good
													</Option>
													<Option value="Fair">
														Fair
													</Option>
													<Option value="Critical">
														Critical
													</Option>
													<Option value="Serious">
														Serious
													</Option>
												</Select>
											</Form.Item>
										</Col>
									</Row>
									<Row gutter={[16, 16]}>
										<Col xl={12} lg={12} md={12} sm={12}>
											<Form.Item
												name="testPerformed"
												label="Test Performed Today"
												rules={[
													{
														required: true,
														message:
															"Please select!"
													}
												]}
											>
												<Select
													placeholder="select status"
													onChange={e =>
														setPerformed(e)
													}
												>
													<Option value="yes">
														Yes
													</Option>
													<Option value="no">
														No
													</Option>
												</Select>
											</Form.Item>
										</Col>
										{performed === "yes" ? (
											<Col
												xl={12}
												lg={12}
												md={12}
												sm={12}
											>
												<Form.Item
													name="testReport"
													label="Test Result"
													rules={[
														{
															required:
																performed ===
																"yes"
																	? true
																	: false,
															message:
																"Please select!"
														}
													]}
												>
													<Select placeholder="select status">
														<Option value="positive">
															Positive
														</Option>
														<Option value="negative">
															Negative
														</Option>
													</Select>
												</Form.Item>
											</Col>
										) : null}
									</Row>
									<Form.Item
										name="comment"
										label="Doctor's Comment"
										rules={[
											{
												required: true,
												message: "Please input comment!"
											}
										]}
									>
										<TextArea rows={4} />
									</Form.Item>
								</>
							) : (
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
										<Option value="deceased">
											Deceased
										</Option>
										<Option value="recovered">
											Recovered
										</Option>
									</Select>
								</Form.Item>
							)}
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
					</>
				) : null}
			</Modal>
		</div>
	);
};

export default UpdatePatientReport;
