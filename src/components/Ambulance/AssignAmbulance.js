import React, { useState, useEffect, useContext } from "react";
import { Button, Table, Spin } from "antd";
import io from "socket.io-client";
import { _notification, getRole } from "./../../utils/_helper";
import PageTitle from "../common/PageTitle";
import { AuthContext } from "../../contexts/userContext";
import {
	getAllAmbulanceUnder,
	startAttentPatientForAmbulance,
	EndPoint
} from "../../utils/services";
import "./style.css";
import AssignAmbulanceModal from "./AssignAmbulanceModal";
import PageStats from "./../common/PageStats";

const AssignAmbulance = () => {
	const Data = useContext(AuthContext);
	const [userData] = useState(getRole());
	const [patient, setPatient] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [totalAmbulance, setTotalAmbulance] = useState(null);

	const handleCancel = value => {
		setIsVisible(value);
	};

	useEffect(() => {
		setIsLoading(true);
		let socket = io(EndPoint);
		socket.on("PATIENTS_POOL_FOR_AMBULANCE", res => {
			setPatient(res.patients);
			setIsLoading(false);
		});
		socket.emit("patientsPoolForAmbulance", { token: Data.token });
		return () => {
			socket.off();
		};
	}, [Data.token]);

	const attendPatient = async data => {
		setModalData(data);
		setIsSpinning(true);
		try {
			const res = await startAttentPatientForAmbulance(data.key);
			if (res.error) {
				setIsVisible(false);
				setIsSpinning(false);
			} else if (res.message === "success" && res.error === false) {
				setIsSpinning(false);
				setIsVisible(true);
			}
		} catch (err) {
			if (err.error) {
				setIsVisible(false);
				setIsSpinning(false);
			}
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const res = await getAllAmbulanceUnder(userData.id);
				setTotalAmbulance(res.data.ambulanceCount);
			} catch (err) {
				setIsLoading(false);
				_notification("warning", "Error", err.message);
			}
		})();
	}, [userData]);

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
			title: "Hospital Name",
			dataIndex: "hospitalName",
			key: "hospitalName"
		},
		{
			title: "Hospital Address",
			dataIndex: "hospitalAddress",
			key: "hospitalAddress"
		},
		{
			title: "Action",
			key: "assign",
			render: data => (
				<Button type="primary" onClick={() => attendPatient(data)}>
					Assign ambulance
				</Button>
			)
		}
	];

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

	return (
		<div className="container">
			<Spin tip="Attending Patient..." spinning={isSpinning}>
				<PageTitle title="Assign Ambulance" />
				{totalAmbulance ? (
					<PageStats
						title="Number of ambulance available"
						value={totalAmbulance.available}
						suffix={`/${
							totalAmbulance.available +
							totalAmbulance.disabled +
							totalAmbulance.onDuty
						}`}
					/>
				) : null}
				<Table
					loading={isLoading}
					title={() => "List of patients to assign ambulance"}
					bordered={false}
					columns={tableColumns}
					dataSource={data}
					pagination={{ position: ["bottomCenter"] }}
				/>
			</Spin>
			<AssignAmbulanceModal
				isVisible={isVisible}
				handleCancel={handleCancel}
				modalData={modalData}
			/>
		</div>
	);
};

export default AssignAmbulance;
