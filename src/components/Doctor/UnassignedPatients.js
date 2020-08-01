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
			parent="Unassigned"
		/>
	);
};
export default UnassignedPatients;