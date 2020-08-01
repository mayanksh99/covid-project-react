import React, { useState } from "react";
import { Modal, Button, Row, Col, Select, Input, Form, Checkbox } from "antd";
import { assignLevelService } from "../../utils/services";
import { _notification } from "../../utils/_helper";

const { TextArea } = Input;
const { Option } = Select;

const AttendPatient = ({
	isVisible,
	showModal,
	patientData,
	refresh,
	setRefresh
}) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [check, setCheck] = useState(false);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const data = {
				level: values.level,
				comment: values.comment,
				isDeclined: check
			};
			const res = await assignLevelService(patientData.key, data);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Patient examine successfully"
				);
				setRefresh(!refresh);
				showModal(false);
				form.setFieldsValue({
					level: "",
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
				centered
				onCancel={() => showModal(!isVisible)}
				width={800}
				footer={null}
			>
				{patientData ? (
					<>
						<Row>
							<Col span={4} className="PatientExamine-heading">
								Name
							</Col>
							<Col span={6}>{patientData.name}</Col>
							<Col span={6} className="PatientExamine-heading">
								ID
							</Col>
							<Col span={8}>{patientData.caseId}</Col>
						</Row>
						<Row>
							<Col span={4} className="PatientExamine-heading">
								Gender
							</Col>
							<Col span={6}>{patientData.gender}</Col>
							<Col span={6} className="PatientExamine-heading">
								Age
							</Col>
							<Col span={8}>{patientData.age} years</Col>
						</Row>
						<Row>
							<Col span={4} className="PatientExamine-heading">
								Phone
							</Col>
							<Col span={6}>+91-{patientData.phone}</Col>
							<Col span={6} className="PatientExamine-heading">
								Lab Name
							</Col>
							<Col span={8}>{patientData.lab}</Col>
						</Row>
						<Row>
							<Col span={4} className="PatientExamine-heading">
								District
							</Col>
							<Col span={6}>{patientData.district}</Col>
							<Col span={6} className="PatientExamine-heading">
								Patient Address
							</Col>
							<Col span={8}>{patientData.address}</Col>
						</Row>
					</>
				) : null}
				<Form
					form={form}
					// layout="vertical"
					name="examine-form"
					onFinish={onFinish}
				>
					<Row gutter={[16, 16]}>
						<Col xl={12} lg={12} md={12} sm={24} xs={24}>
							<Form.Item
								name="level"
								label="Severity Level"
								rules={[
									{
										required: true,
										message: "Please input case id!"
									}
								]}
							>
								<Select placeholder="select level">
									<Option value="L1">L1</Option>
									<Option value="L2">L2</Option>
									<Option value="L3">L3</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col xl={12} lg={12} md={12} sm={24} xs={24}>
							<Form.Item
								name="isDeclined"
								// label="Declined to come?"
							>
								<Checkbox
									checked={check}
									onChange={() => setCheck(!check)}
								>
									Declined to come?
								</Checkbox>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item name="comment" label="Doctor's Comment">
						<TextArea rows={4} />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							style={{ float: "right" }}
							loading={isLoading}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default AttendPatient;
