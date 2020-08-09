import React, { useState } from "react";
import {
	Modal,
	Button,
	Row,
	Col,
	Select,
	Input,
	Form,
	Checkbox,
	Skeleton
} from "antd";
import { assignLevelService } from "../../utils/services";
import { _notification } from "../../utils/_helper";

const { TextArea } = Input;
const { Option } = Select;

const AttendPatient = ({
	isVisible,
	showModal,
	patientData,
	refresh,
	setRefresh,
	parent,
	modalLoading
}) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [check, setCheck] = useState(false);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			let data;
			if (Array.isArray(values.level)) {
				data = {
					comment: values.comment,
					isDeclined: check
				};
			} else {
				data = {
					level: values.level,
					comment: values.comment,
					isDeclined: check
				};
			}
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

	const handleCheck = e => {
		setCheck(e.target.checked);
		if (e.target.checked) {
			form.setFieldsValue({
				level: []
			});
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
				<Skeleton loading={modalLoading} active>
					{patientData ? (
						<>
							<Row>
								<Col
									span={4}
									className="PatientExamine-heading"
								>
									Name
								</Col>
								<Col span={6}>{patientData.name}</Col>
								<Col
									span={6}
									className="PatientExamine-heading"
								>
									ID
								</Col>
								<Col span={8}>{patientData.caseId}</Col>
							</Row>
							<Row>
								<Col
									span={4}
									className="PatientExamine-heading"
								>
									Gender
								</Col>
								<Col span={6}>{patientData.gender}</Col>
								<Col
									span={6}
									className="PatientExamine-heading"
								>
									Age
								</Col>
								<Col span={8}>{patientData.age} years</Col>
							</Row>
							<Row>
								<Col
									span={4}
									className="PatientExamine-heading"
								>
									Phone
								</Col>
								<Col span={6}>+91-{patientData.phone}</Col>
								<Col
									span={6}
									className="PatientExamine-heading"
								>
									Lab Name
								</Col>
								<Col span={8}>{patientData.lab}</Col>
							</Row>
							<Row>
								<Col
									span={4}
									className="PatientExamine-heading"
								>
									District
								</Col>
								<Col span={6}>{patientData.district}</Col>
								<Col
									span={6}
									className="PatientExamine-heading"
								>
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
											required: !check,
											message: "Please fill details !"
										}
									]}
								>
									<Select
										placeholder="select level"
										disabled={check}
									>
										<Option value="l1">L1</Option>
										<Option value="l2">L2</Option>
										<Option value="l3">L3</Option>
									</Select>
								</Form.Item>
							</Col>
							{parent !== "Declined" ? (
								<Col xl={12} lg={12} md={12} sm={24} xs={24}>
									<Form.Item
										name="isDeclined"
										// label="Declined to come?"
									>
										<Checkbox
											checked={check}
											onChange={e => handleCheck(e)}
										>
											Declined to come?
										</Checkbox>
									</Form.Item>
								</Col>
							) : null}
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
				</Skeleton>
			</Modal>
		</>
	);
};

export default AttendPatient;
