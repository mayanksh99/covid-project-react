import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Row, Col, Select, Tag } from "antd";
import "./style.css";
import PageTitle from "../common/PageTitle";

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
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Vehicle number",
			dataIndex: "vehicleNumber",
			key: "vehicleNumber"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status, record) => (
				<>
					{status.map(status => {
						let color = "";
						if (status === "available") {
							color = "green";
						} else color = "orange";
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
			render: () => (
				<Button type="primary" onClick={showModal}>
					Change Status
				</Button>
			)
		}
	];

	const data = [];

	for (let i = 1; i <= 6; i++) {
		data.push({
			key: i,
			status: ["available"],
			phoneNumber: `987654321${i}`,
			vehicleNumber: `UP6${i} AT 208${i}`
		});
		i++;
		data.push({
			key: i,
			status: ["on-duty"],
			phoneNumber: `987654321${i}`,
			vehicleNumber: `UP6${i} AT 208${i}`
		});
	}

	return (
		<div className="container">
			<PageTitle title="Ambulance Status" />

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
				title={
					<h3
						style={{
							color: "#fff",
							marginBottom: "-3px",
							textAlign: "center"
						}}
					>
						Change Status
					</h3>
				}
				width={300}
				visible={isVisible}
				style={{ top: 150 }}
				onCancel={handleCancel}
				footer={null}
			>
				<Row>
					<Col span={24} className="pl-11">
						Vehicle number
					</Col>
					<Col span={24} className="status-modal-field">
						UP65 AT 7654
					</Col>
				</Row>
				<Row>
					<Col span={24} className="pl-11 mt-15">
						Current status
					</Col>
					<Col span={24}>
						<Tag
							color="green"
							style={{
								width: "100%",
								padding: "2px 4px 2px 11px",
								fontSize: "15px"
							}}
						>
							AVAILABLE
						</Tag>
					</Col>
				</Row>
				<Row>
					<Col span={24} className="pl-11 mt-15">
						New status
					</Col>
					<Col span={24}>
						<Select
							defaultValue="Choose status"
							onChange={handleChange}
							style={{ width: "100%" }}
						>
							<Option value="available">available</Option>
							<Option value="allotted">allotted</Option>
							<Option value="disable">disable</Option>
							<Option value="remove">remove</Option>
						</Select>
					</Col>
				</Row>
				<Row style={{ marginTop: "25px" }}>
					<Button
						key="submit"
						type="primary"
						onClick={handleOk}
						block
					>
						Submit
					</Button>
				</Row>
			</Modal>
		</div>
	);
};

export default AmbulanceStatus;
