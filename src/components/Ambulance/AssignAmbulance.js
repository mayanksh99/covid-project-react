import React, { useState, useEffect, useContext } from "react";
import {
	Button,
	Modal,
	Table,
	Statistic,
	Row,
	Col,
	Select,
	Spin,
	Typography
} from "antd";
import io from "socket.io-client";
import { getRole } from "./../../utils/_helper";
import PageTitle from "../common/PageTitle";
import { _notification } from "../../utils/_helper";
import { AuthContext } from "../../contexts/userContext";
import {
	getAllAvailableAmbulanceUnder,
	getAllAmbulanceUnder,
	startAttentPatientForAmbulance,
	allotAmbulanceForPatient,
	updateAmb
} from "../../utils/services";
import "./style.css";

const AssignAmbulance = () => {
	const { Paragraph } = Typography;
	const userData = useState(getRole());
	const Data = useContext(AuthContext);
	const [patient, setPatient] = useState(null);
	const [availableAmbulance, setAvailableAmbulance] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const { Option } = Select;
	const [isVisible, setIsVisible] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [ambulance, setAmbulance] = useState(null);
	const [selectedId, setSelectedId] = useState(null);
	const [totalAmbulance, setTotalAmbulance] = useState(null);
	const [options, setOptions] = useState(null);
	const [assignSpin, setAssignSpin] = useState(false);
	const [driverDetails, setDriverDetails] = useState(null);
	const [newDriverName, setNewDriverName] = useState(null);
	const [newDriverPhone, setNewDriverPhone] = useState(null);
	// const [showUpdateButton, setShowUpdateButton] = useState(null);

	const handleChange = value => {
		setSelectedId(value);
	};

	const handleCancel = () => {
		setSelectedId(null);
		setRefresh(!refresh);
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
	}, [EndPoint, Data.token]);

	const handleOk = () => {
		setAssignSpin(true);
		(async () => {
			try {
				const res = await allotAmbulanceForPatient(
					selectedId,
					modalData.key
				);
				if (res.message === "success" && res.error === false) {
					setRefresh(!refresh);
					setAssignSpin(false);
					setSelectedId(null);
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

	const showModal = async data => {
		setModalData(data);
		setIsSpinning(true);
		try {
			const res = await startAttentPatientForAmbulance(data.key);
			if (res.message === "success" && res.error === false) {
				setIsSpinning(false);
				setIsVisible(!isVisible);
			}
		} catch (err) {
			setIsSpinning(false);
			_notification("warning", "Error", err.message);
		}
	};

	const updateAmbulance = async () => {
		setAssignSpin(true);
		const updatedData = {
			name: newDriverName,
			contact: newDriverPhone
		};
		try {
			const res = await updateAmb(updatedData, driverDetails[0]._id);
			console.log(res);
			if (res.res.message === "success" && res.res.error === false) {
				setAssignSpin(false);
				_notification(
					"success",
					"Error",
					"Details updated successfully !"
				);
			}
		} catch (err) {
			setAssignSpin(false);
			_notification("warning", "Error", err.message);
		}
	};

	const handleNameChange = str => {
		setNewDriverName(str);
	};

	const handlePhoneChange = str => {
		setNewDriverPhone(str);
	};

	useEffect(() => {
		setDriverDetails(
			selectedId !== null
				? ambulance
					? ambulance.filter(amb => amb._id === selectedId)
					: null
				: null
		);
	}, [selectedId, ambulance]);
	useEffect(() => {
		setNewDriverName(driverDetails ? driverDetails[0].driver.name : null);
		setNewDriverPhone(
			driverDetails ? driverDetails[0].driver.contact : null
		);
	}, [driverDetails]);

	// useEffect(() => {
	// 	console.log(driverDetails);
	// 	console.log(newDriverName);
	// 	console.log(newDriverPhone);

	// 	setShowUpdateButton(
	// 		(driverDetails
	// 			? driverDetails[0].driver.name
	// 			: null !== newDriverName) &&
	// 			(driverDetails
	// 				? driverDetails[0].driver.contact
	// 				: null !== newDriverPhone) ? (
	// 			<Button>Update</Button>
	// 		) : null
	// 	);
	// }, []);
	// console.log(showUpdateButton);
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
			render: data => (
				<Button type="primary" onClick={() => showModal(data)}>
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
	}, [userData, refresh]);

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
	}, [userData, refresh]);

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
	}, [ambulance, refresh]);

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
				/>
			</Spin>
			<Modal
				title={
					<h3 style={{ color: "#fff", marginBottom: "-3px" }}>
						Patient Details
					</h3>
				}
				destroyOnClose={true}
				visible={isVisible}
				onCancel={handleCancel}
				width={800}
				centered
				footer={null}
			>
				<Spin tip="Processing Details..." spinning={assignSpin}>
					<Row>
						<Col span={4}>Name</Col>
						<Col span={6}>{modalData ? modalData.name : null}</Col>
						<Col span={6}>ID</Col>
						<Col span={8}>
							{modalData ? modalData.caseid : null}
						</Col>
					</Row>
					<Row>
						<Col span={4}>Gender</Col>
						<Col span={6}>
							{modalData ? modalData.gender : null}
						</Col>
						<Col span={6}>Age</Col>
						<Col span={8}>
							{modalData ? modalData.age : null} yrs
						</Col>
					</Row>
					<Row>
						<Col span={4}>Phone</Col>
						<Col span={6}>{modalData ? modalData.phone : null}</Col>
						<Col span={6}>Hospital Address</Col>
						<Col span={8}>
							{modalData ? modalData.hospitalName : null},{" "}
							{modalData ? modalData.hospitalAddress : null}
						</Col>
					</Row>
					<Row>
						<Col span={4}>District</Col>
						<Col span={6}>
							{modalData ? modalData.district : null}
						</Col>
						<Col span={6}>Patient Address</Col>
						<Col span={8}>
							{modalData ? modalData.address : null}
						</Col>
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
					<Row style={{ marginTop: "17px" }}>
						<Col span={6}>Driver Name</Col>
						<Col className="ml-11">
							<Paragraph
								editable={{ onChange: handleNameChange }}
							>
								{`${newDriverName ? newDriverName : ""}`}
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Col span={6}>Driver Phone</Col>
						<Col className="ml-11">
							<Paragraph
								editable={{ onChange: handlePhoneChange }}
							>
								{`${newDriverPhone ? newDriverPhone : ""}`}
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Button type="primary" onClick={updateAmbulance}>
							Update
						</Button>
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
