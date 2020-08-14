import React, { useState } from "react";
import { Modal, Row, Col, Tag, Checkbox, Input, Form, Button } from "antd";

const AmbulanceDutiesModal = props => {
	const { form } = Form.useForm;
	const { TextArea } = Input;
	const [check, setCheck] = useState(null);

	const onChange = e => {
		setCheck(e.target.checked);
	};

	const handleFinish = values => {
		console.log(values);
	};

	let index = props.modalData ? props.modalData.length : null;

	const tripDetails = props.modalData
		? props.modalData.reverse().map(duty => (
				<>
					<Row>
						Current Ambulance Status :{" "}
						<Tag
							color={
								duty.ambulance.status === "available"
									? "green"
									: duty.ambulance.status === "onDuty"
									? "orange"
									: "red"
							}
						>
							{duty.ambulance.status.toUpperCase()}
						</Tag>
					</Row>
					<Row>Journey {index--}</Row>
					<Row>Vehicle Number : {duty.ambulance.vehicleNo}</Row>
					<div>
						<Row>
							<Col span={12}>
								Driver Name : {duty.ambulance.driver.name}
							</Col>
							<Col span={12}>
								Driver Contact : {duty.ambulance.driver.contact}
							</Col>
						</Row>
						<Row>
							{/* <Col span={12}>
								<Row>
									Patient{" "}
									{duty.status === "completed"
										? "carried"
										: "carrying"}{" "}
									:
								</Row>
								<Row>Name : {duty.patient.name}</Row>
								<Row>Address : {duty.patient.address}</Row>
								<Row>Gender : {duty.patient.gender}</Row>
								<Row>Contact : {duty.patient.phone}</Row>
							</Col>
							<Col span={12}>
								<Row>Destination Hospital :</Row>
								<Row>Name : {duty.hospital.name}</Row>
								<Row>Address : {duty.hospital.address}</Row>
								<Row>Category : {duty.hospital.category}</Row>
								<Row>Contact : {duty.hospital.contact}</Row>
							</Col> */}
							<Col span={12}>
								Patient{" "}
								{duty.status === "completed"
									? "carried"
									: "carrying"}{" "}
								:
							</Col>
							<Col span={12}>Destination Hospital :</Col>
							<Col span={12}>Name : {duty.patient.name}</Col>
							<Col span={12}>Name : {duty.hospital.name}</Col>
							<Col span={12}>
								Address : {duty.patient.address}
							</Col>
							<Col span={12}>
								Address : {duty.hospital.address}
							</Col>
							<Col span={12}>Gender : {duty.patient.gender}</Col>
							<Col span={12}>
								Category : {duty.hospital.category}
							</Col>
							<Col span={12}>Contact : {duty.patient.phone}</Col>
							<Col span={12}>
								Contact : {duty.hospital.contact}
							</Col>
						</Row>
						<Form
							form={form}
							onFinish={handleFinish}
							name="ambulanceDetails"
							layout="vertical"
						>
							{duty.status === "onDuty" ? (
								<Form.Item>
									<Checkbox
										onChange={onChange}
										checked={check}
									>
										Declined to come ?
									</Checkbox>
								</Form.Item>
							) : null}

							{check ? (
								<>
									<Form.Item
										name="declinedComment"
										label="Add a comment"
										rules={[
											{
												required: true,
												message:
													"Please write comment !"
											}
										]}
									>
										<TextArea placeholder="Write here" />
									</Form.Item>
									<Form.Item>
										<Button
											type="primary"
											htmlType="submit"
											style={{ float: "right" }}
										>
											Submit
										</Button>
									</Form.Item>
								</>
							) : null}
						</Form>
						<Row>
							Journey Status :{" "}
							<Tag
								color={
									duty.status === "completed"
										? "green"
										: "orange"
								}
							>
								{duty.status.toUpperCase()}
							</Tag>{" "}
						</Row>
					</div>
				</>
		  ))
		: null;

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
						Ambulance Details !
					</h3>
				}
				footer={false}
				centered={true}
				width={650}
				visible={props.isVisible}
				onCancel={() => {
					props.setIsVisible(false);
					// form.setFieldsValue({
					// 	declinedComment: null
					// });
					setCheck(false);
				}}
			>
				{tripDetails}
			</Modal>
		</div>
	);
};

export default AmbulanceDutiesModal;
