import React, { useState,useEffect } from "react";
import { _notification } from "../../utils/_helper";
import { Modal, Spin, Row, Col, Tag, Select, Button, Form, Input } from "antd";
import { updateAmbulance } from "../../utils/services";

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
	useEffect(() => {
		if (detail) {
			form.setFieldsValue({
				status:detail.status[0],
				name: detail.driverName,
				phoneNumber: detail.phoneNumber,
			    pincode:detail.pincode
			});
		}
	}, [detail, form]);
	const onFinish = async values => {
		// console.log(detail);
		setIsSpinning(true);
		try {
			const rawdata = {
				status: values.status,
				name: values.name,
				contact: values.contact,
				pincode: values.pincode
			};
			console.log(rawdata);
			const res = await updateAmbulance(detail.key, rawdata);
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
				width={400}
				visible={isVisible}
				style={{ top: 20 }}
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
						style={{
							padding: "20px 0px 0px 0px"
						}}
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

						<Form.Item
							name="name"
							label="Driver Name"
							rules={[
								{
									required: true,
									message: "Please enter driver name !"
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="phoneNumber"
							label="Driver Phone no"
							rules={[
								{
									required: true,
									message: "Please enter driver phone no !"
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="pincode"
							label="Pincode"
							rules={[
								{
									required: true,
									message: "Please enter pincode !"
								}
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{
									float: "right",
									margin: "20px 0px 0px 0px"
								}}
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
