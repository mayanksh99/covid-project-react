import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "./style.css";
import { getUnassignedPatientService } from "./../../utils/services";
import { _notification } from "../../utils/_helper";
import PatientTable from "./PatientTable";

const UnassignedPatients = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [patients, setPatients] = useState(null);
	const [patientData, setPatientData] = useState(null);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getUnassignedPatientService();
				console.log(res);
				setPatients(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);

	const attendPatient = async data => {
		setPatientData(data);
		showModal(true);
	};

	const showModal = value => {
		setIsVisible(value);
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
			render: data => (
				<Button
					type="primary"
					className="login-form-button"
					onClick={() => attendPatient(data)}
				>
					Examine
				</Button>
			)
		}
	];

	const data = patients
		? patients.map((patient, id) => {
				const {
					_id,
					caseId,
					name,
					age,
					address,
					district,
					gender,
					lab,
					phone
				} = patient;
				return {
					index: ++id,
					key: _id,
					caseId,
					name,
					age,
					address,
					district,
					gender,
					lab,
					phone
				};
		  })
		: null;

	return (
		<>
			<div className="Unassigned-Patients">
				<PatientTable
					pageTitle="Unassigned Patients"
					statTitle="Number of unassigned patients"
					tableTitle="List of Unassigned Patients"
					count={patients ? patients.length : 0}
					isLoading={isLoading}
					tableColumns={tableColumns}
					data={data}
					isVisible={isVisible}
					showModal={showModal}
					patientData={patientData}
					refresh={refresh}
					setRefresh={setRefresh}
				/>
			</div>
			{/* <div className="Declined-Patients">
				<PageTitle title=" Declined patients" />
				<Statistic
					title="Number of Declined Patients"
					value={2}
					valueStyle={{
						fontWeight: 900,
						fontSize: "2em",
						color: "#005ea5"
					}}
				/>
				<Table
					size="middle"
					title={() => "List of Declined Patients"}
					showHeader={true}
					closable={true}
					bordered={true}
					columns={tableColumns_two}
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
					<Row className="second-segment  Doctor-comment">
						<Col span={6} className="PatientExamine-heading">
							Doctor's Comment
						</Col>
						<Col span={16}>
							<TextArea rows={4} />
						</Col>
					</Row>
				</Modal>
			</div> */}
		</>
	);
};
export default UnassignedPatients;
