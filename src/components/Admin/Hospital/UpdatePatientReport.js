import React, { useState } from "react";
import { Modal, Row, Col, Form, Button, Select, Rate, Input } from "antd";
import ProfileDetails from "../../common/ProfileDetails";
import { _notification } from "../../../utils/_helper";
import { addPatientReportService } from "../../../utils/services";

const { Option } = Select;
const { TextArea } = Input;
const rate = ["Undetermined", "Good", "Fair", "Serious", "Critical"];

const UpdatePatientReport = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [performed, setPerformed] = useState(null);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const data = {
				pid: props.patientData.key,
				testPerformed: values.testPerformed,
				testReport: values.testReport,
				rating: rate[values.rating],
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
					testPerformed: "",
					rating: "",
					testReport: "",
					comment: ""
				});
			}
			setIsLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
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
				onCancel={() => props.handleModal(!props.visible)}
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
										name="rating"
										label="Rate the patient"
										rules={[
											{
												required: true,
												message: "Please select rating!"
											}
										]}
									>
										<Rate tooltips={rate} />
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
												message: "Please select!"
											}
										]}
									>
										<Select
											placeholder="select status"
											onChange={e => setPerformed(e)}
										>
											<Option value="yes">Yes</Option>
											<Option value="no">No</Option>
										</Select>
									</Form.Item>
								</Col>
								{performed === "yes" ? (
									<Col xl={12} lg={12} md={12} sm={12}>
										<Form.Item
											name="testReport"
											label="Test Result"
											rules={[
												{
													required:
														performed === "yes"
															? true
															: false,
													message: "Please select!"
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
