import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Statistic, Row, Col, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
// import socketIOClient from "socket.io-client";
import "./style.css";
import PageTitle from "../common/PageTitle";
const AssignAmbulance = () => {
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

	const data = [];

	for (let i = 1; i <= 4; i++) {
		data.push({
			key: i,
			name: "John Blue",
			PIN: `${i}2`,
			address: `New York No. ${i} Lake Park`
		});
	}

	const tableColumns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Area PIN",
			dataIndex: "PIN",
			key: "PIN"
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

	return (
		<div className="container">
			<PageTitle title="Assign Ambulance" />
			<Statistic
				title="Number of ambulance available"
				value={93}
				suffix={`/${100}`}
				valueStyle={{ color: "#008db9" }}
			/>
			<Table
				size="middle"
				title={() => "List of patients to assign ambulance"}
				showHeader={true}
				closable={true}
				bordered={true}
				columns={tableColumns}
				dataSource={data}
				pagination={{ position: ["none", "bottomCenter"] }}
			/>
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
				<Row>
					<Col span={4}>Name</Col>
					<Col span={6}>Govind Nagar</Col>
					<Col span={6}>ID</Col>
					<Col span={8}>P1</Col>
				</Row>
				<Row>
					<Col span={4}>Gender</Col>
					<Col span={6}>Male</Col>
					<Col span={6}>Age</Col>
					<Col span={8}>47 years</Col>
				</Row>
				<Row>
					<Col span={4}>Phone</Col>
					<Col span={6}>+91-xxxxxxxxxx</Col>
					<Col span={6}>Hospital Address</Col>
					<Col span={8}>IMS BHU</Col>
				</Row>
				<Row>
					<Col span={4}>District</Col>
					<Col span={6}>Ghaziabad</Col>
					<Col span={6}>Patient Address</Col>
					<Col span={8}>178/38 Modinagar Ghaziabad</Col>
				</Row>
				<Row className="second-segment">
					<Col span={6}>Assign Ambulance</Col>
					<Col span={16}>
						<Select
							defaultValue="choose plate"
							onChange={handleChange}
							style={{ width: "160px" }}
						>
							<Option value="UP65 AT 8754">UP65 AT 8754</Option>
							<Option value="UP65 AT 8753">UP65 AT 8753</Option>
							<Option value="UP65 AT 8752">UP65 AT 8752</Option>
							<Option value="UP65 AT 8751">UP65 AT 8751</Option>
						</Select>
					</Col>
				</Row>
				<Row>
					<Col span={6}>Driver Name</Col>
					<Col className="ml-11">
						Dayanand tiwari{" "}
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
						onClick={handleOk}
						style={{ width: "25%", marginRight: "15px" }}
					>
						Submit
					</Button>
				</Row>
			</Modal>
		</div>
	);
};

export default AssignAmbulance;
