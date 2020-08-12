import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Input } from "antd";
import { _notification, getRole } from "../../utils/_helper";
import PageTitle from "../common/PageTitle";
import PageStats from "./../common/PageStats";
import {
	getadmittedPatientsService,
	searchAdmittedPatientsService
} from "../../utils/services";
import PatientReport from "./PatientReport";

const UpdateDailyReport = () => {
	const [userData] = useState(getRole());
	const [isVisible, setIsVisible] = useState(false);
	const [rowData, setrowData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [patients, setpatients] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [number, setNumber] = useState("");

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getadmittedPatientsService(userData.id);
				setNumber(res.data.totalResults);
				setpatients(res.data.patients);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
			setIsLoading(false);
		})();
	}, [userData, refresh]);

	const showModal = value => {
		setIsVisible(value);
	};

	const handleQuery = async val => {
		setIsLoading(true);
		try {
			let params = { search: val };
			const res = await searchAdmittedPatientsService(
				userData.id,
				params
			);
			setpatients(res.data.patients);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const data = patients
		? patients.map((patient, i) => {
				const {
					_id,
					name,
					gender,
					age,
					phone,
					address,
					district,
					caseId,
					email
				} = patient;
				return {
					index: ++i,
					key: _id,
					name,
					gender,
					age,
					phone,
					address,
					district,
					caseId,
					email
				};
		  })
		: null;

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "ID",
			dataIndex: "caseId",
			key: "id"
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
			title: "Update Report",
			key: "updatereport",
			dataIndex: "update",
			render: () => (
				<Button type="primary" onClick={() => showModal(true)}>
					Update Report
				</Button>
			)
		}
	];
	return (
		<div style={{ padding: "10px 30px" }}>
			<PageTitle title="Update Report" />
			<Row>
				<Col span={8}>
					<PageStats
						title="Number of Patients Admitted"
						value={number}
					/>
				</Col>
				<Col span={8}>
					<Input.Search
						className="input-field"
						type="text"
						style={{ width: 200, marginBottom: 12 }}
						placeholder="Search patient"
						allowClear
						onSearch={value => handleQuery(value)}
					/>
				</Col>
			</Row>

			<Table
				loading={isLoading}
				title={() => "List of Patients"}
				columns={columns}
				bordered={false}
				dataSource={data}
				pagination={{ position: ["bottomCenter"] }}
				onRow={record => {
					return {
						onClick: () => {
							setrowData(record);
						}
					};
				}}
			/>
			<PatientReport
				rowData={rowData}
				refresh={refresh}
				setRefresh={setRefresh}
				isVisible={isVisible}
				handleModal={showModal}
			/>
		</div>
	);
};

export default UpdateDailyReport;
