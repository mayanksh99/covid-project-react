import React, { useState } from "react";
import "antd/dist/antd.css";
import {
	Table,
	Statistic,
	Row,
	Col,
	Button,
	Input,
	Modal,
	Select,
	Rate
} from "antd";
// import { AudioOutlined } from "@ant-design/icons";
import PageTitle from "../common/PageTitle";

const { Option } = Select;
const { TextArea } = Input;
const UpdateDailyReport = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [setSelectedOption] = useState("");

	const showModal = () => {
		setIsVisible(!isVisible);
	};

	const handleChange = value => {
		setSelectedOption(value);
	};

	const handleOk = () => {
		setIsVisible(!isVisible);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};
	const { Search } = Input;

	// const suffix = (
	// 	<AudioOutlined
	// 		style={{
	// 			fontSize: 16,
	// 			color: "#1890ff"
	// 		}}
	// 	/>
	// );

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id"
		},

		{
			title: "Name",
			dataIndex: "name",
			key: "name"
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
			title: "Update Report",
			key: "update report",
			render: () => (
				<Button type="primary" onClick={showModal}>
					Update Report
				</Button>
			)
		}
	];

	const data = [];

	for (let i = 0; i < 7; i++) {
		data.push({
			key: i,
			id: `${i}`,
			name: `Edward King ${i}`,
			severity: "L2",
			gender: `Male`,
			age: "43 Years"
		});
	}

	return (
		<div style={{ padding: "10px 30px" }}>
			<PageTitle title="Update Report" />

			<Row>
				<Col span={8}>
					<Statistic
						title="Number of Patients Admitted"
						value={45}
						valueStyle={{ color: "#008db9" }}
					/>
				</Col>

				<Col span={8}>
					<Statistic
						title="Number of Unoccupied Beds"
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
				title={() => "List of Patients"}
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
				<Row className="second-segment">
					<Col span={6}>Patient Status:</Col>
					<Col span={18}>
						<Select defaultValue="Status" onChange={handleChange}>
							<Option value="Hospitalized">Hospitalized</Option>
							<Option value="Discharged">Discharged</Option>
						</Select>
					</Col>
				</Row>

				<Row className="second-segment">
					<Col span={6}>Test Performed Today:</Col>
					<Col span={6}>
						<Select defaultValue="No" onChange={handleChange}>
							<Option value="No">No</Option>
							<Option value="Yes">Yes</Option>
						</Select>
					</Col>
					<Col span={6}>Report Result:</Col>
					<Col span={6}>
						<Select defaultValue="Result" onChange={handleChange}>
							<Option value="Negative">Negative</Option>
							<Option value="Positive">Positive</Option>
						</Select>
					</Col>
				</Row>
				<Row>
					<Col span={6}>Rate the Patient</Col>
					<Col span={18}>
						<Rate />
					</Col>
				</Row>

				<Row>
					<Col span={6}>Doctor`s Comment</Col>
					<Col span={18}>
						<TextArea rows={4} />
					</Col>
				</Row>
			</Modal>
		</div>
	);
};

export default UpdateDailyReport;
