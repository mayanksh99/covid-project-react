import React, { useState, useEffect, useContext } from "react";
import { Input, Statistic, Button, Modal, Row, Col, Select, Table } from "antd";
import PageTitle from "../common/PageTitle";
import "./style.css";
import io from "socket.io-client";
import { AuthContext } from "../../contexts/userContext";

const { TextArea } = Input;
const { Option } = Select;
let socket;
const PatientExamine = () => {
	const Data = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState(false);
	const [patients, setPatients] = useState(null);
	const [count, setCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const EndPoint = "https://covid-project-gzb.herokuapp.com";

	useEffect(() => {
		setIsLoading(true);
		socket = io(EndPoint);
		socket.on("PATIENTS_POOL_FOR_DOCTOR", res => {
			console.log(res);
			setPatients(res.patients);
			setCount(res.remainingPatients);
			setIsLoading(false);
		});
		socket.emit("patientsPoolForDoctor", { token: Data.token });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [EndPoint]);

	const showModal = () => {
		setIsVisible(!isVisible);
	};
	const handleOk = () => {
		setIsVisible(!isVisible);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};
	const tableColumns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Patient ID",
			dataIndex: "caseId",
			key: "caseId"
		},
		{
			title: "Patient Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Patient Age",
			dataIndex: "age",
			key: "age"
		},
		{
			title: "Examine Patient",
			key: "action",
			render: id => (
				<Button
					type="primary"
					className="login-form-button"
					onClick={showModal}
				>
					Examine
				</Button>
			)
		}
	];

	const data = patients
		? patients.map((patient, id) => {
				const { _id, caseId, name, age } = patient;
				return {
					index: ++id,
					key: _id,
					caseId,
					name,
					age,
					action: _id
				};
		  })
		: null;

	return (
		<>
			<PageTitle title="Examine Patients" />
			<Statistic
				title="Number of patients left to examine"
				value={count}
				valueStyle={{
					fontWeight: 900,
					fontSize: "2em",
					color: "#005ea5"
				}}
			/>
			<Table
				size="middle"
				title={() => "List of Patients to Examine"}
				showHeader={true}
				loading={isLoading}
				bordered={false}
				columns={tableColumns}
				dataSource={data}
				pagination={{ position: ["none", "bottomCenter"] }}
			/>

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
				onCancel={handleCancel}
				width={800}
				footer={[
					<Button key="submit" type="primary" onClick={handleOk}>
						Submit
					</Button>
				]}
			>
				<Row>
					<Col span={4} className="PatientExamine-heading">
						Name
					</Col>
					<Col span={6}>Govind Nagar</Col>
					<Col span={6} className="PatientExamine-heading">
						ID
					</Col>
					<Col span={8}>P1</Col>
				</Row>
				<Row>
					<Col span={4} className="PatientExamine-heading">
						Gender
					</Col>
					<Col span={6}>Male</Col>
					<Col span={6} className="PatientExamine-heading">
						Age
					</Col>
					<Col span={8}>47 years</Col>
				</Row>
				<Row>
					<Col span={4} className="PatientExamine-heading">
						Phone
					</Col>
					<Col span={6}>+91-xxxxxxxxxx</Col>
					<Col span={6} className="PatientExamine-heading">
						Lab Name
					</Col>
					<Col span={8}>IMS BHU</Col>
				</Row>
				<Row>
					<Col span={4} className="PatientExamine-heading">
						District
					</Col>
					<Col span={6}>Ghaziabad</Col>
					<Col span={6} className="PatientExamine-heading">
						Patient Address
					</Col>
					<Col span={8}>178/38 Modinagar Ghaziabad</Col>
				</Row>
				<Row>
					<Col sm={4} xs={24} className="PatientExamine-heading">
						Severity Level
					</Col>
					<Col sm={6} xs={24}>
						<Select
							defaultValue="select level"
							// onChange={handleChange}
						>
							<Option value="L1">L1</Option>
							<Option value="L2">L2</Option>
							<Option value="L3">L3</Option>
						</Select>
					</Col>

					<Col sm={6} xs={24} className="PatientExamine-heading">
						Select Hospital
					</Col>
					<Col sm={8} xs={24}>
						<Select
							defaultValue="select Hospital"
							// onChange={handleChange}
						>
							<Option value="IMS BHU">IMS BHU</Option>
							<Option value="IMS BHU">IMS BHU</Option>
							<Option value="IMS BHU">IMS BHU</Option>
						</Select>
					</Col>
				</Row>
				<Row className="second-segment Doctor-comment">
					<Col span={6} className="PatientExamine-heading">
						Doctor's Comment
					</Col>
					<Col span={16}>
						<TextArea rows={4} />
					</Col>
				</Row>
			</Modal>
		</>
	);
};

export default PatientExamine;
