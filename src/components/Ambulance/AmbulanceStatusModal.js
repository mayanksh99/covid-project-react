import React, { useState } from "react";
import { _notification } from "../../utils/_helper";
import { Modal, Spin, Row, Col, Tag, Select, Button, Form } from "antd";
import { updateAmbulanceStatus } from "../../utils/services";

const { Option } = Select;

const AmbulanceStatusModal = ({
	isVisible,
	handleCancel,
	detail,
	refresh,
	setRefresh
}) => {
	const [form] = Form.useForm();
	const [isSpinning, setIsSpinning] = useState(false);

	const onFinish = async values => {
		setIsSpinning(true);
		try {
			const res = await updateAmbulanceStatus(detail.key, values.status);
			if (res.error) {
				_notification("error", "Error", res.res.message);
				setIsSpinning(false);
			} else if (res.message === "success") {
				setIsSpinning(false);
				handleCancel(false);
				setRefresh(!refresh);
				_notification(
					"success",
					"Success",
					"Status updated successfully"
				);
			}
		} catch (err) {
			setIsSpinning(false);
			_notification("warning", "Error", err.message);
		}
	};

	return (
		<>
			<Modal
				title={
					<h3
						style={{
							color: "#fff",
							marginBottom: "-3px",
							textAlign: "center"
						}}
					>
						Change Status
					</h3>
				}
				width={300}
				visible={isVisible}
				style={{ top: 150 }}
				onCancel={() => handleCancel(false)}
				footer={null}
			>
				<Spin tip="Updating status..." spinning={isSpinning}>
					{detail ? (
						<>
							<Row>
								<Col span={24} className="pl-11">
									Vehicle number
								</Col>
								<Col span={24} className="status-modal-field">
									{detail.vehicleNo}
								</Col>
							</Row>
							<Row>
								<Col span={24} className="pl-11 mt-15">
									Current status
								</Col>
								<Col span={24}>
									{detail.status.map(status => {
										let color = "";
										if (status === "available") {
											color = "green";
										} else if (status === "onDuty") {
											color = "orange";
										} else color = "red";
										return (
											<Tag
												color={color}
												key={status}
												style={{
													width: "100%",
													padding: "2px 4px 2px 11px",
													fontSize: "15px"
												}}
											>
												{status.toUpperCase()}
											</Tag>
										);
									})}
								</Col>
							</Row>
						</>
					) : null}

					<Form
						form={form}
						layout="vertical"
						name="examine-form"
						onFinish={onFinish}
					>
						<Form.Item
							name="status"
							label="new status"
							rules={[
								{
									required: true,
									message: "Please select status!"
								}
							]}
						>
							<Select
								placeholder="Select"
								style={{ width: "100%" }}
							>
								<Option value="available">Available</Option>
								<Option value="onDuty">On Duty</Option>
								<Option value="disabled">Disabled</Option>
								<Option value="removed">Removed</Option>
							</Select>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ float: "right" }}
								block
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</Modal>
		</>
	);
};

export default AmbulanceStatusModal;
