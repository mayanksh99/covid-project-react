import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd";
import "./style.css";
import io from "socket.io-client";
import { AuthContext } from "../../contexts/userContext";
import { attendPatientService, EndPoint } from "../../utils/services";
import PatientTable from "./PatientTable";

let socket;
const PatientExamine = () => {
	const Data = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState(false);
	const [patients, setPatients] = useState(null);
	const [count, setCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isBtnLoading, setIsBtnLoading] = useState(false);
	const [patientData, setPatientData] = useState(null);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		socket = io(EndPoint);
		socket.on("PATIENTS_POOL_FOR_DOCTOR", res => {
			setPatients(res.patients);
			setCount(res.remainingPatients);
			setIsLoading(false);
		});
		socket.emit("patientsPoolForDoctor", { token: Data.token });
		return () => {
			socket.off();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [EndPoint]);

	const attendPatient = async data => {
		// setIsBtnLoading(true);
		let res = await attendPatientService(data.key);
		console.log(res);
		setPatientData(data);
		showModal(true);
		setIsBtnLoading(false);
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
					loading={isBtnLoading}
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
		<PatientTable
			pageTitle="Examine Patients"
			statTitle="Number of patients left to examine"
			tableTitle="List of Patients to Examine"
			count={count}
			isLoading={isLoading}
			tableColumns={tableColumns}
			data={data}
			isVisible={isVisible}
			showModal={showModal}
			patientData={patientData}
			refresh={refresh}
			setRefresh={setRefresh}
		/>
	);
};

export default PatientExamine;
