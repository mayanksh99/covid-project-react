import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Table, Statistic, Row, Col, Select, Spin } from "antd";
import io from "socket.io-client";
import { getRole } from "./../../utils/_helper";
import { EditOutlined } from "@ant-design/icons";
import PageTitle from "../common/PageTitle";
import { _notification } from "../../utils/_helper";
import { AuthContext } from "../../contexts/userContext";
import {
	getAllAvailableAmbulanceUnder,
	getAllAmbulanceUnder,
	startAttentPatientForAmbulance,
	allotAmbulanceForPatient
} from "../../utils/services";
import "./style.css";

const AssignAmbulance = () => {
	// let socket;
	const userData = useState(getRole());
	const Data = useContext(AuthContext);
	const [patient, setPatient] = useState(null);
	const [availableAmbulance, setAvailableAmbulance] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const { Option } = Select;
	const [isVisible, setIsVisible] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [ambulance, setAmbulance] = useState(null);
	const [selectedId, setSelectedId] = useState("");
	const [totalAmbulance, setTotalAmbulance] = useState("");
	const [options, setOptions] = useState(null);
	const [assignSpin, setAssignSpin] = useState(false);

	const handleChange = value => {
		setSelectedId(value);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	const EndPoint = "https://covid-project-gzb.herokuapp.com";
	useEffect(() => {
		setIsLoading(true);
		let socket = io(EndPoint);
		socket.on("PATIENTS_POOL_FOR_AMBULANCE", res => {
			setPatient(res.patients);
			setIsLoading(false);
		});
		socket.emit("patientsPoolForAmbulance", { token: Data.token });
	}, [EndPoint]);

	const handleOk = () => {
		setAssignSpin(true);
		(async () => {
			try {
				const res = await allotAmbulanceForPatient(
					selectedId,
					rowData.key
				);
				if (res.message === "success" && res.error === false) {
					setAssignSpin(false);
					setIsVisible(!isVisible);
					_notification(
						"success",
						"Success",
						"Ambulance was assigned successfully !"
					);
				}
			} catch (err) {
				setAssignSpin(false);
				_notification("error", "Error", err.message);
			}
		})();
	};

	const showModal = async () => {
		setIsSpinning(true);
		try {
			const res = await startAttentPatientForAmbulance(rowData.key);
			if (res.message === "success" && res.error === false) {
				setIsSpinning(false);
				setIsVisible(!isVisible);
			}
		} catch (err) {
			setIsSpinning(false);
			_notification("warning", "Error", err.message);
		}
	};

	const data = patient
		? patient.map((patient, i) => {
				return {
					index: ++i,
					key: patient._id,
					name: patient.name,
					gender: patient.gender,
					address: patient.address,
					hospitalAddress: patient.hospitalAddress,
					phone: patient.phone,
					caseid: patient.caseId,
					age: patient.age,
					district: patient.district,
					hospitalName: patient.hospitalName
				};
		  })
		: null;

	const tableColumns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Gender",
			dataIndex: "gender",
			key: "Gender"
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address"
		},
		{
			title: "Action",
			key: "assign",
			render: () => (
				<Button type="primary" onClick={showModal}>
					Assign ambulance
				</Button>
			)
		}
	];

	useEffect(() => {
		(async () => {
			try {
				const res = await getAllAmbulanceUnder(userData[0].id);
				setTotalAmbulance(res.res.data.totalResults);
			} catch (err) {
				setIsLoading(false);
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const res = await getAllAvailableAmbulanceUnder(userData[0].id);
				setAmbulance(res.res.data.ambulances);
				setAvailableAmbulance(res.res.data.totalResults);
			} catch (err) {
				setIsLoading(false);
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	useEffect(() => {
		setOptions(
			ambulance
				? ambulance.map(amb => (
						<Option value={amb._id} key={amb._id}>
							{amb.vehicleNo}
						</Option>
				  ))
				: null
		);
	}, [ambulance]);

	return (
		<div className="container">
			<Spin tip="Attending Patient..." spinning={isSpinning}>
				<PageTitle title="Assign Ambulance" />
				<Statistic
					title="Number of ambulance available"
					value={availableAmbulance}
					suffix={`/${totalAmbulance}`}
					valueStyle={{ color: "#008db9" }}
				/>
				<Table
					size="middle"
					loading={isLoading}
					title={() => "List of patients to assign ambulance"}
					showHeader={true}
					closable={true}
					bordered={true}
					columns={tableColumns}
					dataSource={data}
					pagination={{ position: ["none", "bottomCenter"] }}
					onRow={(record, rowIndex) => {
						return {
							onClick: event => {
								setRowData(record);
							}
						};
					}}
				/>
			</Spin>
			<Modal
				title={
					<h3 style={{ color: "#fff", marginBottom: "-3px" }}>
						Patient Details
					</h3>
				}
				visible={isVisible}
				onCancel={handleCancel}
				width={800}
				centered
				footer={null}
			>
				<Spin tip="Assigning Ambulance..." spinning={assignSpin}>
					<Row>
						<Col span={4}>Name</Col>
						<Col span={6}>{rowData ? rowData.name : null}</Col>
						<Col span={6}>ID</Col>
						<Col span={8}>{rowData ? rowData.caseid : null}</Col>
					</Row>
					<Row>
						<Col span={4}>Gender</Col>
						<Col span={6}>{rowData ? rowData.gender : null}</Col>
						<Col span={6}>Age</Col>
						<Col span={8}>{rowData ? rowData.age : null} yrs</Col>
					</Row>
					<Row>
						<Col span={4}>Phone</Col>
						<Col span={6}>{rowData ? rowData.phone : null}</Col>
						<Col span={6}>Hospital Address</Col>
						<Col span={8}>
							{rowData ? rowData.hospitalName : null},{" "}
							{rowData ? rowData.hospitalAddress : null}
						</Col>
					</Row>
					<Row>
						<Col span={4}>District</Col>
						<Col span={6}>{rowData ? rowData.district : null}</Col>
						<Col span={6}>Patient Address</Col>
						<Col span={8}>{rowData ? rowData.address : null}</Col>
					</Row>
					<Row className="second-segment">
						<Col span={6}>Assign Ambulance</Col>
						<Col span={16}>
							<Select
								defaultValue="choose plate"
								onChange={handleChange}
								style={{ width: "160px" }}
							>
								{options}
							</Select>
						</Col>
					</Row>
					<Row>
						<Col span={6}>Driver Name</Col>
						<Col className="ml-11">
							Dayanand Tiwari
							<EditOutlined
								className="ml-11"
								style={{ cursor: "pointer" }}
							/>
						</Col>
					</Row>
					<Row>
						<Col span={6}>Driver Phone</Col>
						<Col className="ml-11">
							+91-xxxxxxxxxx
							<EditOutlined
								className="ml-11"
								style={{ cursor: "pointer" }}
							/>
						</Col>
					</Row>
					<Row
						style={{
							marginTop: "25px",
							width: "100%",
							justifyContent: "flex-end"
						}}
					>
						<Button
							key="submit"
							type="primary"
							htmlType="submit"
							onClick={handleOk}
							style={{ width: "25%", marginRight: "15px" }}
						>
							Submit
						</Button>
					</Row>
				</Spin>
			</Modal>
		</div>
	);
};

export default AssignAmbulance;
