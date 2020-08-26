import React, { useState } from "react";
import {
	Modal,
	Row,
	Col,
	Tag,
	Checkbox,
	Input,
	Form,
	Button,
	Spin,
	Divider
} from "antd";

import moment from "moment";
import { declinedPatientService } from "../../utils/services";
import { _notification } from "../../utils/_helper";
import Map from "./Map";

const AmbulanceDutiesModal = props => {
	const { form } = Form.useForm;
	const { TextArea } = Input;
	const [check, setCheck] = useState(null);
	const [showMap, setShowMap] = useState(false);
	const [spin, setSpin] = useState(false);
	console.log(props.data);
	const onChange = e => {
		setCheck(e.target.checked);
	};

	const handleMap = e => {
		setShowMap(true);
	};

	const handleFinish = async values => {
		setSpin(true);
		try {
			const res = await declinedPatientService(
				props.data[0].ambulance._id,
				{
					comments: values.declinedComment
						? values.declinedComment
						: null
				}
			);
			if (res.error === false && res.message === "success") {
				_notification(
					"success",
					"Success",
					"Status updated successfully"
				);
				setCheck(false);
				setSpin(false);
				props.setIsVisible(false);
				props.setRefresh(!props.refresh);
			}
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};
	let index = props.data ? props.data.length + 1 : null;

	const ambulanceStatus = props.data ? (
		<Divider
			style={{
				fontSize: "25px"
			}}
			orientation="left"
		>
			Status :{" "}
			<Tag
				style={{ fontSize: "16px" }}
				color={
					props.data
						? props.data[0].ambulance.status === "available"
							? "green"
							: props.data[0].ambulance.status === "onDuty"
							? "orange"
							: "red"
						: null
				}
			>
				{props.data
					? props.data[0].ambulance.status.toUpperCase()
					: null}
			</Tag>
		</Divider>
	) : null;

	const tripDetails = props.data
		? props.data.map(duty => (
				<div key={--index} style={{ marginLeft: "2%" }}>
					<Divider
						style={{
							paddingBottom: "10px",
							fontWeight: "800",
							fontSize: "20px"
						}}
					>
						Journey : {index}
					</Divider>
					<Row
						style={{
							fontSize: "14px"
						}}
					>
						<Col span={4}>Alloted At :</Col>
						<Col span={20}>
							{moment(duty.allotedAt).format(
								"Do MMMM YYYY, h:mm:ss a"
							)}
						</Col>

						{duty.completedAt ? (
							<>
								<Col span={4}>Completed At :</Col>
								<Col span={20}>
									{moment(duty.completedAt).format(
										"Do MMMM YYYY, h:mm:ss a"
									)}
								</Col>
							</>
						) : null}
					</Row>
					<Row style={{ fontSize: "18px" }}>
						Vehicle Number : {duty.ambulance.vehicleNo}
					</Row>
					<div>
						<Row>
							<Col span={13} style={{ fontSize: "18px" }}>
								Driver Name : {duty.ambulance.driver.name}
							</Col>
							<Col span={11} style={{ fontSize: "18px" }}>
								Driver Contact : {duty.ambulance.driver.contact}
							</Col>
						</Row>
						<Row style={{ paddingBottom: "8px" }}>
							<Col
								span={13}
								style={{
									fontWeight: "700",
									fontSize: "18px",
									paddingBottom: "10px"
								}}
							>
								Patient{" "}
								{duty.status === "completed"
									? "carried"
									: duty.status === "declined"
									? "alloted"
									: "carrying"}{" "}
								:
							</Col>
							<Col
								span={11}
								style={{
									fontWeight: "700",
									fontSize: "18px",
									paddingBottom: "10px"
								}}
							>
								Destination Hospital :
							</Col>
							<Col span={13}>Name : {duty.patient.name}</Col>
							<Col span={11}>Name : {duty.hospital.name}</Col>
							<Col span={13}>
								Address : {duty.patient.address}
							</Col>
							<Col span={11}>
								Address : {duty.hospital.address}
							</Col>
							<Col span={13}>Gender : {duty.patient.gender}</Col>
							<Col span={11}>
								Category : {duty.hospital.category}
							</Col>
							<Col span={13}>Contact : {duty.patient.phone}</Col>
							<Col span={11}>
								Contact : {duty.hospital.contact}
							</Col>
						</Row>
						<Form
							form={form}
							onFinish={handleFinish}
							name={`ambulanceDetails${index}`}
							layout="vertical"
						>
							{duty.status === "onDuty" ? (
								<Form.Item name={`checkBox${index}`}>
									<Checkbox
										onChange={onChange}
										checked={check}
									>
										Declined to come ?
									</Checkbox>
								</Form.Item>
							) : null}

							{check && index === props.data.length ? (
								<>
									<Form.Item
										name="declinedComment"
										label="Add a comment"
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
						<Row style={{ paddingBottom: "40px" }}>
							Journey Status :{" "}
							<Tag
								color={
									duty.status === "completed"
										? "green"
										: duty.status === "onDuty"
										? "orange"
										: "red"
								}
							>
								{duty.status.toUpperCase()}
							</Tag>{" "}
						</Row>
					</div>
					<Button type="primary" onClick={handleMap}>
						Show route
					</Button>
					{showMap && index === props.data.length ? (
						<Modal
							closable={true}
							visible={showMap}
							footer={false}
							style={{ top: "35px" }}
							width={1300}
							bodyStyle={{ height: "630px" }}
							onCancel={() => setShowMap(false)}
						>
							<Map data={props.data} />
						</Modal>
					) : null}
				</div>
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
				width={700}
				visible={props.isVisible}
				onCancel={() => {
					props.setIsVisible(false);
					setCheck(false);
				}}
			>
				<Spin tip="Loading..." spinning={spin}>
					{ambulanceStatus}
					{tripDetails}
				</Spin>
			</Modal>
		</div>
	);
};

export default AmbulanceDutiesModal;
