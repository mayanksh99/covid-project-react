import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Row, Col, Select } from "antd";
import "./style.css";
const AmbulanceStatus = () => {
	const { Option } = Select;
	const [isVisible, setIsVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");

	const handleChange = value => {
		setSelectedOption(value);
	};

	useEffect(() => console.log(selectedOption), [selectedOption]);

	const showModal = () => {
		setIsVisible(!isVisible);
	};

	const handleOk = () => {
		setIsVisible(!isVisible);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	const tableColumns = [
		{
			title: "Vehicle number",
			dataIndex: "vehicleNumber",
			key: "vehicleNumber"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status"
		},
		{
			title: "Phone number",
			dataIndex: "phoneNumber",
			key: "phoneNumber"
		},
		{
			title: "Change Status",
			key: "changeStatusButton",
			render: () => (
				<Button type="primary" onClick={showModal}>
					Change Status
				</Button>
			)
		}
	];

	const data = [];

	for (let i = 1; i <= 25; i++) {
		data.push({
			key: i,
			status: "available",
			phoneNumber: `987654321${i}`,
			vehicleNumber: `UP6${i} AT 208${i}`
		});
	}

	return (
		<div className="container">
			<div className="heading">Ambulance Status</div>

			<Table
				size="middle"
				title={() => "List of Ambulance"}
				showHeader={true}
				closable={true}
				bordered={true}
				columns={tableColumns}
				dataSource={data}
				pagination={{ position: ["none", "bottomCenter"] }}
			/>
			<Modal
				title="Patient Details"
				visible={isVisible}
				centered
				onCancel={handleCancel}
				footer={[
					<Button key="submit" type="primary" onClick={handleOk}>
						Submit
					</Button>
				]}
			>
				<Row>
					<Col span={4}></Col>
					<Col span={8}>Vehicle number</Col>
					<Col className="gap">UP65 AT 7654</Col>
				</Row>
				<Row>
					<Col span={4}></Col>
					<Col span={8}>Current status</Col>
					<Col className="gap">available</Col>
				</Row>
				<Row>
					<Col span={4}></Col>
					<Col span={8}>New status</Col>
					<Col>
						<Select
							defaultValue="choose status"
							onChange={handleChange}
						>
							<Option value="available">available</Option>
							<Option value="allotted">allotted</Option>
							<Option value="disable">disable</Option>
							<Option value="remove">remove</Option>
						</Select>
					</Col>
				</Row>
			</Modal>
		</div>
	);
};

export default AmbulanceStatus;
