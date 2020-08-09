import React, { useState, useEffect } from "react";
import { Modal, Spin, Row, Col, Select, Button, Form, Input } from "antd";
import { getRole, _notification } from "../../utils/_helper";
import {
	updateAmb,
	getAllAvailableAmbulanceUnder,
	allotAmbulanceForPatient
} from "../../utils/services";

const { Option } = Select;

const AssignAmbulanceModal = props => {
	const [form] = Form.useForm();
	const [userData] = useState(getRole());
	const [options, setOptions] = useState(null);
	const [assignSpin, setAssignSpin] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [availableAmbulance, setAvailableAmbulance] = useState(null);
	const [driverDetails, setDriverDetails] = useState(null);

	useEffect(() => {
		setAssignSpin(true);
		(async () => {
			try {
				const res = await getAllAvailableAmbulanceUnder(userData.id);
				setAvailableAmbulance(res.data.ambulances);
				setAssignSpin(false);
			} catch (err) {
				setAssignSpin(false);
				_notification("warning", "Error", err.message);
			}
		})();
	}, [userData, props.refresh]);

	useEffect(() => {
		setOptions(
			availableAmbulance
				? availableAmbulance.map(ambulance => (
						<Option value={ambulance._id} key={ambulance._id}>
							{ambulance.vehicleNo}
						</Option>
				  ))
				: null
		);
	}, [availableAmbulance]);

	const handleChange = value => {
		setSelectedId(value);
		const details = availableAmbulance
			? availableAmbulance.filter(amb => amb._id === value)
			: null;
		setDriverDetails(details);
		form.setFieldsValue({
			driverNo: details[0].driver.contact,
			driverName: details[0].driver.name
		});
	};

	const onFinish = async values => {
		setAssignSpin(true);
		try {
			const updatedData = {
				name: values.driverName,
				contact: values.driverNo
			};
			await updateAmb(driverDetails[0]._id, updatedData);
			const res = await allotAmbulanceForPatient(
				selectedId,
				props.modalData.key
			);
			if (res.message === "success" && res.error === false) {
				setAssignSpin(false);
				setSelectedId(null);
				form.setFieldsValue({
					vehicleNo: null
				});
				props.setRefresh(!props.refresh);
				props.handleCancel(false);
				_notification(
					"success",
					"Success",
					"Ambulance assigned successfully !"
				);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
			setAssignSpin(false);
		}
	};

	return (
		<>
			<Modal
				title={
					<h3 style={{ color: "#fff", marginBottom: "-3px" }}>
						Patient Details
					</h3>
				}
				destroyOnClose={true}
				visible={props.isVisible}
				onCancel={() => {
					props.handleCancel(false);
					form.setFieldsValue({
						vehicleNo: null
					});
					setSelectedId(null);
				}}
				width={800}
				centered
				footer={null}
			>
				<Spin tip="Processing Details..." spinning={assignSpin}>
					{props.modalData ? (
						<>
							<Row>
								<Col span={4}>Name</Col>
								<Col span={6}>{props.modalData.name}</Col>
								<Col span={6}>ID</Col>
								<Col span={8}>{props.modalData.caseid}</Col>
							</Row>
							<Row>
								<Col span={4}>Gender</Col>
								<Col span={6}>{props.modalData.gender}</Col>
								<Col span={6}>Age</Col>
								<Col span={8}>{props.modalData.age} yrs</Col>
							</Row>
							<Row>
								<Col span={4}>Phone</Col>
								<Col span={6}>{props.modalData.phone}</Col>
								<Col span={6}>Hospital Address</Col>
								<Col span={8}>
									{props.modalData.hospitalName},{" "}
									{props.modalData.hospitalAddress}
								</Col>
							</Row>
							<Row>
								<Col span={4}>District</Col>
								<Col span={6}>{props.modalData.district}</Col>
								<Col span={6}>Patient Address</Col>
								<Col span={8}>{props.modalData.address}</Col>
							</Row>
							<Form
								form={form}
								// layout="vertical"
								name="examine-form"
								onFinish={onFinish}
							>
								<Col span={12}>
									<Form.Item
										name="vehicleNo"
										label="Assign Ambulance"
										rules={[
											{
												required: true,
												message:
													"Please select vehicle no.!"
											}
										]}
									>
										<Select
											placeholder="choose plate"
											onChange={handleChange}
											style={{ width: "160px" }}
										>
											{options}
										</Select>
									</Form.Item>
									{selectedId ? (
										<>
											<Form.Item
												name="driverName"
												label="Driver's name"
												rules={[
													{
														required: true,
														message:
															"Please input driver's name!"
													}
												]}
											>
												<Input
													className="input-field"
													placeholder="Enter name"
												/>
											</Form.Item>

											<Form.Item
												name="driverNo"
												label="Driver's No."
												rules={[
													{
														required: true,
														message:
															"Please input vehicle no.!"
													}
												]}
											>
												<Input
													className="input-field"
													placeholder="Enter name"
												/>
											</Form.Item>
										</>
									) : null}
								</Col>

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

export default AssignAmbulanceModal;
