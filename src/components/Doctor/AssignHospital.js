import React, { useState, useEffect } from "react";
import { Col, Row, Statistic, Table, Button, Modal, Select } from "antd";
import PageTitle from "../common/PageTitle";

const AssignHospital = () => {
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

	const columns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Patient ID",
			dataIndex: "id",
			key: "id"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: text => <a>{text}</a>
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age"
		},
		{
			title: "Action",
			key: "action",
			render: () => (
				<Button type="primary" onClick={showModal}>
					Assign Hospital
				</Button>
			)
		}
	];
	const data = [
		{
			key: "1",
			name: "John Brown",
			age: 32,
			id: 101,
			tags: ["nice", "developer"]
		},
		{
			key: "2",
			name: "Jim Green",
			age: 42,
			id: 102,
			tags: ["loser"]
		},
		{
			key: "3",
			name: "Joe Black",
			age: 32,
			id: 103,
			tags: ["cool", "teacher"]
		}
	];
	return (
		<div>
			<PageTitle title="Assign Hospital" />
			<p style={{ fontSize: "16px", color: "#00000073" }}>
				Beds Available
			</p>
			<Row gutter={16}>
				<Col span={6}>
					<Statistic
						title="L1"
						value={25}
						suffix={`/${100}`}
						valueStyle={{ color: "#008db9" }}
					/>
				</Col>
				<Col span={6}>
					<Statistic
						title="L2"
						value={9}
						suffix={`/${77}`}
						valueStyle={{ color: "#008db9" }}
					/>
				</Col>
				<Col span={6}>
					<Statistic
						title="L3"
						value={12}
						suffix={`/${50}`}
						valueStyle={{ color: "#008db9" }}
					/>
				</Col>
			</Row>
			<Table
				bordered
				// loading
				title={() => "List of Pending Patients"}
				columns={columns}
				dataSource={data}
				pagination={false}
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
					<Col span={6}>Lab Name</Col>
					<Col span={8}>IMS BHU</Col>
				</Row>
				<Row>
					<Col span={4}>District</Col>
					<Col span={6}>Ghaziabad</Col>
					<Col span={6}>Patient Address</Col>
					<Col span={8}>178/38 Modinagar Ghaziabad</Col>
				</Row>
				<Row className="mt-15">
					<Col span={6}>Doctor's Remark</Col>
					<Col span={17}>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and
						scrambled it to make a type specimen book.
					</Col>
				</Row>
				<Row className="second-segment">
					<Col span={6}>Select severity level</Col>
					<Col span={7}>
						<Select
							defaultValue="Select"
							onChange={handleChange}
							style={{ width: "160px" }}
						>
							<Option value="L1">L1</Option>
							<Option value="L2">L2</Option>
							<Option value="L3">L3</Option>
						</Select>
					</Col>
					<Col span={5}>Select Hospital</Col>
					<Col span={6}>
						<Select
							defaultValue="Select"
							onChange={handleChange}
							style={{ width: "157px" }}
						>
							<Option value="IMS BHU1">IMS BHU1</Option>
							<Option value="IMS BHU2">IMS BHU2</Option>
							<Option value="IMS BHU3">IMS BHU3</Option>
							<Option value="IMS BHU4">IMS BHU4</Option>
						</Select>
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
						style={{ width: "21%", marginRight: "31px" }}
					>
						Submit
					</Button>
				</Row>
				<Row>
					<Col></Col>
				</Row>
			</Modal>
		</div>
	);
};

export default AssignHospital;
