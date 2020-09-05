import React from "react";
import { Table, Modal, Tag } from "antd";
import { Link } from "react-router-dom";
const AmbDutiesTable = props => {
	let i = props.data ? props.data.length + 1 : 0;
	const tableData = props.data
		? props.data.map(duty => ({
				key: i,
				index: --i,
				dutyStatus: [duty.status],
				patientAddress: duty.patient.address,
				hospitalAddress: duty.hospital.address,
				did: duty._id
		  }))
		: null;

	const tableColumns = [
		{
			title: "Duty",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Duty Status",
			dataIndex: "dutyStatus",
			key: "dutyStatus",
			render: dutyStatus => (
				<>
					{dutyStatus.map(status => {
						let color = "";
						if (status === "completed") {
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
			title: "Patient Address",
			dataIndex: "patientAddress",
			key: "patientAddress"
		},
		{
			title: "Hospital Address",
			dataIndex: "hospitalAddress",
			key: "hospitalAddress"
		},
		{
			title: "Action",
			dataIndex: "did",
			key: "did",
			render: did => (
				<Link to={`/ambulance-operators/ambulances/duties/${did}`}>
					Details
				</Link>
			)
		}
	];
	console.log(props.data);
	return (
		<Modal
			closable={true}
			visible={props.showTable}
			footer={false}
			width={700}
			onCancel={() => props.setShowTable(false)}
		>
			<Table
				title={() => "Duties"}
				bordered={false}
				columns={tableColumns}
				dataSource={tableData}
				pagination={{ position: ["bottomCenter"] }}
			/>
		</Modal>
	);
};

export default AmbDutiesTable;
