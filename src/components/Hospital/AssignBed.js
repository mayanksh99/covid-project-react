import React, { useState } from "react";
import "antd/dist/antd.css";
import { Table, Statistic, Row, Col, Button, Input, Modal } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import PageTitle from "../common/PageTitle";

const AssignBed = () => {
	const [isVisible, setIsVisible] = useState(false);

	const showModal = () => {
		setIsVisible(!isVisible);
	};

	const handleOk = () => {
		setIsVisible(!isVisible);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	const { Search } = Input;

	const suffix = (
		<AudioOutlined
			style={{
				fontSize: 16,
				color: "#1890ff"
			}}
		/>
	);

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

	const data = [];

	for (let i = 0; i < 8; i++) {
		data.push({
			key: i,
			name: `Edward King ${i}`,
			severity: "L2",
			gender: `Male`,
			age: "43 Years"
		});
	}

	return (
		<div style={{ padding: "10px 30px" }}>
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
						value={25}
						valueStyle={{ color: "#008db9" }}
					/>
				</Col>

				<Col span={8}>
					<Search
						placeholder="Search Patients"
						onSearch={value => console.log(value)}
						style={{ width: 200 }}
					/>
				</Col>
			</Row>

			<Table
				size="middle"
				title={() => "List of Patients to Assign Bed"}
				columns={columns}
				bordered={true}
				dataSource={data}
				pagination={{ position: ["none", "bottomCenter"] }}
			/>

			<Modal
				title="Patient Details"
				visible={isVisible}
				centered
				onCancel={handleCancel}
				width={800}
				footer={[
					<Button key="submit" type="primary" onClick={handleOk}>
						Submit
					</Button>
				]}
			>
				<Row>
					<Col span={4}>Name</Col>
					<Col span={6}>Edward King</Col>
					<Col span={6}>ID</Col>
					<Col span={8}>P1</Col>
				</Row>
				<Row>
					<Col span={4}>Gender</Col>
					<Col span={6}>Male</Col>
					<Col span={6}>Age</Col>
					<Col span={8}>43 years</Col>
				</Row>
				<Row>
					<Col span={4}>Relative Ph.</Col>
					<Col span={6}>+91-xxxxxxxxxx</Col>
					<Col span={6}>Severity</Col>
					<Col span={8}>L2</Col>
				</Row>
				<Row>
					<Col span={4}>District</Col>
					<Col span={6}>Ghaziabad</Col>
					<Col span={6}>Patient Address</Col>
					<Col span={8}>178/38 Modinagar Ghaziabad</Col>
				</Row>
				<Row>
					<Col span={6}>Room/Bed No:</Col>
					<Col span={16}>
						<Input placeholder="room/bed no" />
					</Col>
				</Row>
			</Modal>
		</div>
	);
};

export default AssignBed;
