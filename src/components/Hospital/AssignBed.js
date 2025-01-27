import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Row, Col, Button, Input } from "antd";
import PageTitle from "../common/PageTitle";
import { getPatientDetails, searchPatients } from "../../utils/services";
import { _notification, getRole } from "../../utils/_helper";
import PatientDetail from "./PatientDetail";
import PageStats from "./../common/PageStats";
import PatientHistory from "../common/PatientHistory";
import { Link } from "react-router-dom";

const AssignBed = () => {
	const [userData] = useState(getRole());
	const [isLoading, setIsLoading] = useState(false);
	const [Patients, setPatients] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [number, setNumber] = useState(0);
	const [modalData, setModalData] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [
		patientHistoryModalvisible,
		setPatientHistoryModalvisible
	] = useState(false);
	const [pid, setPid] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getPatientDetails(userData.id);
				setNumber(res.data.totalResults);
				setPatients(res.data.patients);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [userData, refresh]);

	const handleModal = data => {
		setModalData(data);
		setIsVisible(true);
	};

	const handleCancel = value => {
		setIsVisible(value);
	};

	const handleQuery = async val => {
		setIsLoading(true);
		try {
			let params = { search: val };
			const res = await searchPatients(userData.id, params);
			setPatients(res.data.patients);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const togglePatientHistoryModal = (val, id) => {
		setPid(id);
		setPatientHistoryModalvisible(val);
	};

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "ID",
			dataIndex: "caseId",
			key: "caseId"
		},
		{
			title: "Name",
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
			title: "Gender",
			dataIndex: "gender",
			key: "gender"
		},

		{
			title: "Age",
			dataIndex: "age",
			key: "age"
		},

		{
			title: "Assign Bed",
			key: "assign bed",
			render: data => (
				<>
					<Button
						type="primary"
						onClick={() => handleModal(data)}
						disabled={
							!data.history.hasOwnProperty("ambulanceAlloted") ||
							(data.history.ambulanceAlloted &&
								data.history.ambulanceAlloted.ambulance == null)
						}
					>
						Assign Bed
					</Button>
				</>
			)
		}
	];

	const data = Patients
		? Patients.map((patient, i) => {
				return {
					index: ++i,
					key: patient._id,
					name: [patient.name, patient._id],
					gender: patient.gender,
					age: patient.age,
					severity: patient.history.levelAlloted.level,
					phone: patient.phone,
					address: patient.address,
					district: patient.district,
					caseId: patient.caseId,
					email: patient.email,
					history: patient.history
				};
		  })
		: null;

	return (
		<div style={{ padding: "10px 30px" }}>
			<PageTitle title="Assign Beds" />
			<Row>
				<Col span={8}>
					<PageStats
						title="Total Unattended Patients"
						value={number}
					/>
				</Col>

				<Col span={8}>
					<Input.Search
						type="text"
						style={{ width: 200 }}
						placeholder="Search-patients"
						allowClear
						onSearch={value => handleQuery(value)}
					/>
				</Col>
			</Row>

			<Table
				loading={isLoading}
				title={() => "List of Patients to Assign Bed"}
				columns={columns}
				bordered={false}
				dataSource={data}
				pagination={{ position: ["bottomCenter"] }}
			/>
			<PatientDetail
				isVisible={isVisible}
				handleCancel={handleCancel}
				detail={modalData}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
			<PatientHistory
				patientHistoryModalvisible={patientHistoryModalvisible}
				togglePatientHistoryModal={togglePatientHistoryModal}
				pid={pid}
			/>
		</div>
	);
};

export default AssignBed;
