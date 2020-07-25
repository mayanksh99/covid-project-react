import React, { useState, useEffect } from "react";
import { Statistic, Button, Select, Modal, Row, Col, Table, Input } from "antd";
import PageTitle from "../common/PageTitle";

const PatientExamine = () => {
	const { Option } = Select;
	const { TextArea } = Input;
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
					Examine
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
			<PageTitle title="Examine Patients" />
			<Statistic
				title="Number of patients left to examine"
				value={365}
				valueStyle={{
					fontWeight: 900,
					fontSize: "2em",
					color: "#005ea5"
				}}
			/>
			<Table
				bordered
				// loading
				title={() => "List of Patients to be examined"}
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
				<Row className="mt-15">
					<Col span={6}>Doctor's Remark</Col>
					<Col span={17}>
						<TextArea rows={3} />
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
						style={{ width: "25%", marginRight: "31px" }}
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

export default PatientExamine;
