import React, { useState, useEffect } from "react";
import { Table, Card, Tag, Row, Col, Input, Select } from "antd";
import { getPatientsService } from "../../utils/services";
import { _notification } from "./../../utils/_helper";
import { Link } from "react-router-dom";
import PatientHistory from "../common/PatientHistory";

const { Option } = Select;

const Patients = ({ refresh }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [patients, setPatients] = useState(null);
	const [search, setSearch] = useState(null);
	const [level, setLevel] = useState(null);
	const [status, setStatus] = useState("diagnosed");
	const [
		patientHistoryModalvisible,
		setPatientHistoryModalvisible
	] = useState(false);
	const [pid, setPid] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				let params = {
					status,
					level,
					search
				};
				const res = await getPatientsService(params);
				setPatients(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [status, level, search, refresh]);

	const handleQuery = val => {
		setSearch(val);
	};

	const handleLevel = val => {
		setLevel(val);
	};

	const handleStatus = async val => {
		setStatus(val);
	};

	const togglePatientHistoryModal = (val, id) => {
		setPid(id);
		setPatientHistoryModalvisible(val);
	};

	const columns = [
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
			title: "Age",
			dataIndex: "age",
			key: "age"
		},
		{
			title: "Gender",
			dataIndex: "gender",
			key: "gender"
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: status => (
				<Tag color="green">
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Tag>
			)
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address"
		}
	];

	const data = patients
		? patients.map((patient, i) => {
				const {
					_id,
					name,
					email,
					gender,
					phone,
					status,
					caseId,
					age,
					address
				} = patient;
				return {
					index: ++i,
					key: _id,
					name: [name, _id],
					email,
					gender,
					phone,
					caseId,
					status,
					age,
					address
				};
		  })
		: null;

	return (
		<>
			<Row>
				<Col xl={8} lg={12} md={24} sm={24} xs={24}>
					<Input.Search
						className="input-field"
						type="text"
						style={{ marginBottom: 12 }}
						placeholder="Search"
						allowClear
						onSearch={value => handleQuery(value)}
					/>
				</Col>
				<Col xl={16} lg={12} md={24} sm={24} xs={24}>
					<div className="wrapper">
						<div style={{ marginRight: "10px" }}>
							<Select
								placeholder="Select level"
								onChange={handleLevel}
								allowClear
								className="input-field"
							>
								<Option value="l1">L1</Option>
								<Option value="l2">L2</Option>
								<Option value="l3">L3</Option>
							</Select>
						</div>
						<div style={{ float: "right" }}>
							<Select
								placeholder="Select status"
								onChange={handleStatus}
								className="input-field"
								allowClear
								defaultValue={status}
							>
								<Option value="diagnosed">Diagnosed</Option>
								<Option value="levelAlloted">
									Level Alloted
								</Option>
								<Option value="hospitalAlloted">
									Hospital Alloted
								</Option>
								<Option value="ambulanceAlloted">
									Ambulance Alloted
								</Option>
								<Option value="hospitalised">
									Hospitalised
								</Option>
								<Option value="recovered">Recovered</Option>
								<Option value="deceased">Deceased</Option>
								<Option value="declined">Declined</Option>
							</Select>
						</div>
					</div>
				</Col>
			</Row>
			<Card>
				<p
					style={{
						fontSize: "18px",
						color: "#008DB9",
						fontWeight: 700
					}}
				>
					List of Patients
				</p>
				<div
					style={{
						padding: 0,
						width: "100%",
						overflowX: "auto"
					}}
				>
					<Table
						columns={columns}
						dataSource={data}
						pagination={{ position: ["bottomLeft"] }}
						loading={isLoading}
					/>
				</div>
			</Card>
			<PatientHistory
				patientHistoryModalvisible={patientHistoryModalvisible}
				togglePatientHistoryModal={togglePatientHistoryModal}
				pid={pid}
			/>
		</>
	);
};

export default Patients;
