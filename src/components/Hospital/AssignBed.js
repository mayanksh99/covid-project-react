import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Row, Col, Button, Input } from "antd";
import PageTitle from "../common/PageTitle";
import {
	getPatientDetails,
	searchPatients,
	getProfileService
} from "../../utils/services";
import { _notification, getRole } from "../../utils/_helper";
import PatientDetail from "./PatientDetail";
import PageStats from "./../common/PageStats";

const AssignBed = () => {
	const userData = useState(getRole());
	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [Patients, setPatients] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [number, setNumber] = useState(0);
	const [modalData, setModalData] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getPatientDetails(userData[0].id);
				setNumber(res.data.totalResults);
				setPatients(res.data.patients);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getProfileService();
				setProfile(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

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
			const res = await searchPatients(userData[0].id, params);
			setPatients(res.data.patients);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
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
			key: "name"
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
							!data.history.hasOwnProperty("ambulanceAlloted")
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
					name: patient.name,
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
				{profile ? (
					<Col span={8}>
						<PageStats
							title="Number of Beds available"
							value={profile.availableBeds}
							suffix={`/${profile.totalBeds}`}
						/>
					</Col>
				) : null}

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
			/>
		</div>
	);
};

export default AssignBed;
