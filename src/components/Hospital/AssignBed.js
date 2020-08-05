import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Statistic, Row, Col, Button, Input, Modal, Form } from "antd";
import PageTitle from "../common/PageTitle";
import {
	getPatientDetails,
	assignPatientBed,
	searchPatients
} from "../../utils/services";
import { _notification, getRole } from "../../utils/_helper";

const AssignBed = () => {
	const userData = useState(getRole());
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [Patients, setPatients] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [rowData, setrowData] = useState(null);
	const [number, setNumber] = useState("");
	const [form] = Form.useForm();
	// const [isSpinning, setIsSpinning] = useState(false);
	// const [assignSpin, setAssignSpin] = useState(false);
	//const EndPoint = "https://covid-project-gzb.herokuapp.com";
	useEffect(() => {
		(async () => {
			// setIsSpinning(true);
			setIsLoading(true);
			try {
				const res = await getPatientDetails(userData[0].id);
				setNumber(res.data.totalResults);
				setPatients(res.data.patients);
				setIsLoading(false);
				// setIsSpinning(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh, userData]);

	const showModal = () => {
		setIsVisible(!isVisible);
	};

	const handleOk = () => {
		setIsVisible(!isVisible);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	const onFinish = async values => {
		// setIsSpinning(true);
		setIsLoading(true);
		console.log(values);
		try {
			const rawdata = {
				pid: rowData.key,
				bed: values.bed
			};
			console.log(rawdata);
			const res = await assignPatientBed(userData[0].id, rawdata);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Bed assigned successfully"
				);
				setRefresh(!refresh);

				form.setFieldsValue({
					bed: ""
				});
			}
			setIsLoading(false);
			// setIsSpinning(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
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
					email: patient.email
				};
		  })
		: null;
	//console.log(patient.history);
	//console.log(data);
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},

		{
			title: "Severity",
			dataIndex: "severity",
			key: "severity"
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
			render: () => (
				<Button type="primary" onClick={showModal}>
					Assign Bed
				</Button>
			)
		}
	];

	return (
		<div style={{ padding: "10px 30px" }}>
			{/* <Spin tip="Attending Patient..." spinning={isSpinning}> */}
			<PageTitle title="Assign Beds" />

			<Row>
				<Col span={8}>
					<Statistic
						title="Number of Beds available"
						value={45}
						suffix={`/${100}`}
						valueStyle={{ color: "#008db9" }}
					/>
				</Col>

				<Col span={8}>
					<Statistic
						title="Total Unattended Patients"
						value={number}
						valueStyle={{ color: "#008db9" }}
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
				size="middle"
				loading={isLoading}
				title={() => "List of Patients to Assign Bed"}
				columns={columns}
				bordered={true}
				dataSource={data}
				pagination={{ position: ["none", "bottomCenter"] }}
				onRow={(record, rowIndex) => {
					return {
						onClick: event => {
							setrowData(record);
							console.log(record);
						}
					};
				}}
			/>
			{/* </Spin> */}

			<Modal
				title="Patient Details"
				visible={isVisible}
				centered
				onCancel={handleCancel}
				width={800}
				footer={[
					<Button
						key="submit"
						type="primary"
						onClick={(handleOk, onFinish)}
					>
						Submit
					</Button>
				]}
			>
				{/* /* <Spin tip="Assigning Ambulance..." spinning={assignSpin}>  */}
				{rowData ? (
					<>
						<Row>
							<Col span={4}>Name</Col>
							<Col span={6}>{rowData.name}</Col>
							<Col span={6}>ID</Col>
							<Col span={8}>{rowData.key}</Col>
						</Row>
						<Row>
							<Col span={4}>Gender</Col>
							<Col span={6}>{rowData.gender}</Col>
							<Col span={6}>Age</Col>
							<Col span={8}>{rowData.age}</Col>
						</Row>
						<Row>
							<Col span={4}>Relative Ph.</Col>
							<Col span={6}>{`+91-${rowData.phone}`}</Col>
							<Col span={6}>Severity</Col>
							<Col span={8}>{rowData.severity}</Col>
						</Row>
						<Row>
							<Col span={4}>District</Col>
							<Col span={6}>{rowData.district}</Col>
							<Col span={6}>Patient Address</Col>
							<Col span={8}>{rowData.address}</Col>
						</Row>
						<Form form={form} name="assign-bed" onFinish={onFinish}>
							<Row>
								<Form.Item
									name="bed"
									label="Enter Room/Bed no:"
								>
									<Col span={16}>
										<Input placeholder="room/bed no" />
									</Col>
								</Form.Item>
							</Row>
						</Form>
					</>
				) : null}
				{/* </Spin> */}
			</Modal>
		</div>
	);
};

export default AssignBed;
