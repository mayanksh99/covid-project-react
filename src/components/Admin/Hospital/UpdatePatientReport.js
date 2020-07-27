import React from "react";
import { Modal, Row, Col, Form, Button, Select, Rate, Input } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const UpdatePatientReport = props => {
	const [form] = Form.useForm();

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
				<Row gutter={[16, 16]}>
					<Col xl={12} lg={12} md={12} sm={12} xs={24}>
						<p>
							<span className="profile-data-label">Name</span>
							<br />
							<span className="profile-data">ITS Hospital</span>
						</p>
						<p>
							<span className="profile-data-label">Gender</span>
							<br />
							<span className="profile-data">Male</span>
						</p>
						<p>
							<span className="profile-data-label">
								Relative phone
							</span>
							<br />
							<span className="profile-data">+91-9652314253</span>
						</p>
						<p>
							<span className="profile-data-label">District</span>
							<br />
							<span className="profile-data">Ghaziabad</span>
						</p>
					</Col>
					<Col xl={12} lg={12} md={12} sm={12} xs={24}>
						<p>
							<span className="profile-data-label">ID</span>
							<br />
							<span className="profile-data">P454815</span>
						</p>
						<p>
							<span className="profile-data-label">Age</span>
							<br />
							<span className="profile-data">40</span>
						</p>
						<p>
							<span className="profile-data-label">Severity</span>
							<br />
							<span className="profile-data">L2</span>
						</p>
						<p>
							<span className="profile-data-label">
								Patient Address
							</span>
							<br />
							<span className="profile-data">
								256, Awas Vikas, Ghaziabad
							</span>
						</p>
					</Col>
				</Row>
				<Form
					form={form}
					layout="vertical"
					name="update_patient"
					className="login-form"
					initialValues={{ remember: true }}
				>
					<Row gutter={[16, 16]}>
						<Col xl={12} lg={12} md={12} sm={12}>
							<Form.Item
								name="patientStatus"
								label="Patient Status"
							>
								<Select placeholder="select status">
									<Option value="available">Available</Option>
									<Option value="on-duty">On duty</Option>
									<Option value="disable">Disable</Option>
									<Option value="remove">Remove</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col xl={12} lg={12} md={12} sm={12}>
							<Form.Item name="rate" label="Rate the patient">
								<Rate />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col xl={12} lg={12} md={12} sm={12}>
							<Form.Item
								name="testPerformedToday"
								label="Test Performed Today"
							>
								<Select placeholder="select status">
									<Option value="yes">Yes</Option>
									<Option value="no">No</Option>
								</Select>
							</Form.Item>
						</Col>

						<Col xl={12} lg={12} md={12} sm={12}>
							<Form.Item name="reportResult" label="Test Result">
								<Select placeholder="select status">
									<Option value="positive">Positive</Option>
									<Option value="negative">Negative</Option>
								</Select>
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
							block
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default UpdatePatientReport;
