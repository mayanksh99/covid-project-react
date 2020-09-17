import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd";
import "./style.css";
import io from "socket.io-client";
import { AuthContext } from "../../contexts/userContext";
import { attendPatientService, EndPoint } from "../../utils/services";
import PatientTable from "./PatientTable";
import PatientHistory from "../common/PatientHistory";
import { Link } from "react-router-dom";

let socket;
const PatientExamine = () => {
	const Data = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState(false);
	const [patients, setPatients] = useState(null);
	const [count, setCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalLoading, setIsModalLoading] = useState(false);
	const [isBtnLoading, setIsBtnLoading] = useState(false);
	const [patientData, setPatientData] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [
		patientHistoryModalvisible,
		setPatientHistoryModalvisible
	] = useState(false);
	const [pid, setPid] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		socket = io(EndPoint, { transports: ["websocket", "polling"] });
		socket.on("PATIENTS_POOL_FOR_DOCTOR", res => {
			setPatients(res.patients);
			setCount(res.remainingPatients);
			setIsLoading(false);
		});
		socket.emit("patientsPoolForDoctor", { token: Data.token });
		return () => {
			socket.off();
		};
	}, [Data.token]);

	const attendPatient = async data => {
		setIsBtnLoading(true);
		setIsModalLoading(true);
		showModal(true);
		try {
			let res = await attendPatientService(data.key);
			if (res.error) {
				showModal(false);
			} else if (res.message === "success") {
				setPatientData(data);
			}
			setIsModalLoading(false);
		} catch (error) {
			if (error.error) {
				showModal(false);
			}
		}
		setIsBtnLoading(false);
	};

	const showModal = value => {
		setIsVisible(value);
	};

	const togglePatientHistoryModal = (val, id) => {
		setPid(id);
		setPatientHistoryModalvisible(val);
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
			key: "name",
			render: name => (
				<Link
					to="#"
					onClick={() => togglePatientHistoryModal(true, name[1])}
				>
					{name[0]}
				</Link>
			)
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
					name: [name, _id],
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
				parent="Examine"
				modalLoading={isModalLoading}
			/>
			<PatientHistory
				patientHistoryModalvisible={patientHistoryModalvisible}
				togglePatientHistoryModal={togglePatientHistoryModal}
				pid={pid}
			/>
		</>
	);
};

export default PatientExamine;
