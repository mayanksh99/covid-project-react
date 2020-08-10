import React, { useState, useEffect } from "react";
import { Table, Card, Tag, Row, Col, Input, Select } from "antd";
import { getPatientsService } from "../../utils/services";
import { _notification } from "./../../utils/_helper";

const { Option } = Select;

const Patients = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [patients, setPatients] = useState(null);
	const [search, setSearch] = useState(null);
	const [level, setLevel] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getPatientsService();
				console.log(res);
				setPatients(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	const handleQuery = async val => {
		setIsLoading(true);
		setSearch(val);
		try {
			let params = {
				search: val,
				level
			};
			const res = await getPatientsService(params);
			setPatients(res.data);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const handleLevel = async val => {
		setIsLoading(true);
		setLevel(val);
		try {
			let params = { level: val, search };
			const res = await getPatientsService(params);
			setPatients(res.data);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const columns = [
		{
			title: "Case ID",
			dataIndex: "caseId",
			key: "caseId"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
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
			render: status => <Tag color="green">{status}</Tag>
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
					name,
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
				<Col span={12}>
					<Input.Search
						className="input-field"
						type="text"
						style={{ width: 200, marginBottom: 12 }}
						placeholder="Search"
						allowClear
						onSearch={value => handleQuery(value)}
					/>
				</Col>
				<Col span={12}>
					<div style={{ float: "right" }}>
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
						pagination={{ position: ["bottomCenter"] }}
						loading={isLoading}
					/>
				</div>
			</Card>
		</>
	);
};

export default Patients;
