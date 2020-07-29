import React, { useState, useEffect } from "react";
import { Input, Statistic, Button, Modal, Row, Col, Select, Table } from "antd";
import PageTitle from "../common/PageTitle";
import "./style.css";

const PatientExamine = () => {

	const { TextArea } = Input;
	const { Option } = Select;
	const [isVisible, setIsVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");
	const handleChange = value => {
		setSelectedOption(value);
	};
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
			title: "Patient ID",
			dataIndex: "id",
			key: "id"
		},
		{

			title: "Patient Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Patient Age",
			dataIndex: "age",
			key: "age",
			responsive: ["sm"]
		},
		{
			title: "Examine Patient",
			key: "Examine-btn",
			render: () => (
				<Button
					type="primary"
					className="Examine-btn"
					onClick={showModal}
				>

					Examine
				</Button>
			)
		}
	];

	const data = [];
	for (let i = 1; i <= 5; i++) {
		data.push({
			key: i,
			name: "John green",
			id: "P1",
			age: "55 years"
		});
	}

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
				size="middle"
				title={() => "List of Patients to Examine"}
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
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>

						Patient Details
					</h3>
				}
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
					<Col span={4} className="PatientExamine-heading">
						Name
					</Col>
					<Col span={6}>Govind Nagar</Col>
					<Col span={6} className="PatientExamine-heading">
						ID
					</Col>
					<Col span={8}>P1</Col>
				</Row>
				<Row>
					<Col span={4} className="PatientExamine-heading">
						Gender
					</Col>
					<Col span={6}>Male</Col>
					<Col span={6} className="PatientExamine-heading">
						Age
					</Col>
					<Col span={8}>47 years</Col>
				</Row>
				<Row>
					<Col span={4} className="PatientExamine-heading">
						Phone
					</Col>
					<Col span={6}>+91-xxxxxxxxxx</Col>
					<Col span={6} className="PatientExamine-heading">
						Lab Name
					</Col>
					<Col span={8}>IMS BHU</Col>
				</Row>
				<Row>
					<Col span={4} className="PatientExamine-heading">
						District
					</Col>
					<Col span={6}>Ghaziabad</Col>
					<Col span={6} className="PatientExamine-heading">
						Patient Address
					</Col>
					<Col span={8}>178/38 Modinagar Ghaziabad</Col>
				</Row>
				<Row>
					<Col sm={4} xs={24} className="PatientExamine-heading">
						Severity Level
					</Col>
					<Col sm={6} xs={24}>
						<Select
							defaultValue="select level"
							onChange={handleChange}

						>
							<Option value="L1">L1</Option>
							<Option value="L2">L2</Option>
							<Option value="L3">L3</Option>
						</Select>
					</Col>

					<Col sm={6} xs={24} className="PatientExamine-heading">
						Select Hospital
					</Col>
					<Col sm={8} xs={24}>
						<Select
							defaultValue="select Hospital"
							onChange={handleChange}
						>
							<Option value="IMS BHU">IMS BHU</Option>
							<Option value="IMS BHU">IMS BHU</Option>
							<Option value="IMS BHU">IMS BHU</Option>
						</Select>
					</Col>
				</Row>
				<Row className="second-segment Doctor-comment">
					<Col span={6} className="PatientExamine-heading">
						Doctor's Comment
					</Col>
					<Col span={16}>
						<TextArea rows={4} />
					</Col>
				</Row>
			</Modal>
		</>

	);
};

export default PatientExamine;
