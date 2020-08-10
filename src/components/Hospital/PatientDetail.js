import React, { useState } from "react";
import { Modal, Button, Spin, Row, Form, Col, Input } from "antd";
import { getRole, _notification } from "../../utils/_helper";
import { assignPatientBed } from "../../utils/services";

const PatientDetail = ({
	isVisible,
	handleCancel,
	detail,
	refresh,
	setRefresh
}) => {
	const [userData] = useState(getRole());
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const data = {
				pid: detail.key,
				bed: values.bed
			};
			const res = await assignPatientBed(userData.id, data);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				setRefresh(!refresh);
				_notification(
					"success",
					"Success",
					"Bed assigned successfully !"
				);
				handleCancel(false);
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
				destroyOnClose={true}
				onCancel={() => handleCancel(false)}
				width={800}
				footer={null}
			>
				<Spin tip="Assigning Bed..." spinning={isLoading}>
					{detail ? (
						<>
							<Row>
								<Col span={4}>Name</Col>
								<Col span={6}>{detail.name}</Col>
								<Col span={6}>ID</Col>
								<Col span={8}>{detail.caseId}</Col>
							</Row>
							<Row>
								<Col span={4}>Gender</Col>
								<Col span={6}>{detail.gender}</Col>
								<Col span={6}>Age</Col>
								<Col span={8}>{detail.age}</Col>
							</Row>
							<Row>
								<Col span={4}>Relative Ph.</Col>
								<Col span={6}>{`+91-${detail.phone}`}</Col>
								<Col span={6}>Severity</Col>
								<Col span={8}>
									{detail.severity.toUpperCase()}
								</Col>
							</Row>
							<Row>
								<Col span={4}>District</Col>
								<Col span={6}>{detail.district}</Col>
								<Col span={6}>Patient Address</Col>
								<Col span={8}>{detail.address}</Col>
							</Row>
							<Form
								form={form}
								name="assign-bed"
								onFinish={onFinish}
							>
								<Form.Item
									name="bed"
									label="Enter Bed no:"
									rules={[
										{
											required: true,
											message: "Please input bed no.!"
										}
									]}
								>
									<Col span={12}>
										<Input placeholder="Enter bed no." />
									</Col>
								</Form.Item>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										// className="login-form-button"
										style={{ float: "right" }}
										// loading={isLoading}
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

export default PatientDetail;
