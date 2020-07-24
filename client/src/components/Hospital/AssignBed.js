import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Row, Col } from "antd";

const AssignBed = () => {
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
			key: "name",
			render: text => <a>{text}</a>
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
		}
	];

	const data = [];

	for (let i = 0; i < 100; i++) {
		data.push({
			key: i,
			name: `Edward King ${i}`,
			severity: "L2",
			gender: `Male`,
			age: "43 Years"
			// render: ()=>{
			// 	<Button type="primary">Assign Beds</Button>
			// }
		});
	}

	return (
		<div>
			<h1>Assign Beds</h1>
			<Row>
				<Col span={12}>Total Patients</Col>

				<Col span={12}>
					<Search
						placeholder="Search Patients"
						onSearch={value => console.log(value)}
						style={{ width: 200 }}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>28</Col>
				<Col span={12}></Col>
			</Row>

			<Row>
				<Col span={8}>Total beds</Col>
				<Col span={8}>Avaliable Beds</Col>
				<Col span={8}>
					<Button type="primary">Assign Beds</Button>
				</Col>
			</Row>
			<Row>
				<Col span={8}>100</Col>
				<Col span={8}>45</Col>
				<Col span={8}></Col>
			</Row>

			<Table
				size="middle"
				title={() => "list of patients to assign beds"}
				columns={columns}
				dataSource={data}
				pagination={{ position: ["none", "bottomCenter"] }}
			/>
		</div>
	);
};

export default AssignBed;
