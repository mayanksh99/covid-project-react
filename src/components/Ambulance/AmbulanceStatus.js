import React, { useState, useEffect } from "react";
import { getRole } from "./../../utils/_helper";
import { Button, Table, Tag } from "antd";
import PageTitle from "../common/PageTitle";
import { _notification } from "../../utils/_helper";
import { getAllAmbulanceUnder } from "../../utils/services";
import "./style.css";
import AmbulanceStatusModal from "./AmbulanceStatusModal";

const AmbulanceStatus = () => {
	const userData = useState(getRole());
	const [isLoading, setIsLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [ambulance, setAmbulance] = useState(null);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getAllAmbulanceUnder(userData[0].id);
				setAmbulance(res.data.ambulances);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	const handleCancel = value => {
		setIsVisible(value);
	};

	const handleModal = data => {
		setModalData(data);
		handleCancel(true);
	};

	const tableColumns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Driver's Name",
			dataIndex: "driverName",
			key: "driverName"
		},
		{
			title: "Vehicle number",
			dataIndex: "vehicleNo",
			key: "vehicleNo"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: status => (
				<>
					{status.map(status => {
						let color = "";
						if (status === "available") {
							color = "green";
						} else if (status === "onDuty") {
							color = "orange";
						} else color = "red";
						return (
							<Tag color={color} key={status}>
								{status.toUpperCase()}
							</Tag>
						);
					})}
				</>
			)
		},
		{
			title: "Phone number",
			dataIndex: "phoneNumber",
			key: "phoneNumber"
		},
		{
			title: "Action",
			key: "changeStatusButton",
			render: data => (
				<Button type="primary" onClick={() => handleModal(data)}>
					Change Status
				</Button>
			)
		}
	];

	const data = ambulance
		? ambulance.map((amb, i) => {
				return {
					index: ++i,
					key: amb._id,
					status: [amb.status],
					phoneNumber: `+91-${amb.driver.contact}`,
					vehicleNo: amb.vehicleNo,
					driverName: amb.driver.name
				};
		  })
		: null;

	return (
		<div className="container">
			<PageTitle title="Ambulance Status" />
			<Table
				loading={isLoading}
				title={() => "List of Ambulance"}
				bordered={false}
				columns={tableColumns}
				dataSource={data}
				pagination={{ position: ["bottomCenter"] }}
			/>
			<AmbulanceStatusModal
				isVisible={isVisible}
				handleCancel={handleCancel}
				detail={modalData}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
		</div>
	);
};

export default AmbulanceStatus;
