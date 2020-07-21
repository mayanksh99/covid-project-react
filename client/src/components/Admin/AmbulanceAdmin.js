import React, { useState } from "react";
import "./style.css";
import { Row, Statistic, Col, Button, Table, Input } from "antd";
import AddAmbulanceAdmin from "./AddAmbulanceAdmin";

const AmbulanceAdmin = () => {
	const [showModal, setshowModal] = useState(false);

	const handelModal = value => {
		setshowModal(value);
	};
	const columns = [
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
			title: "Phone",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "Area Pin",
			dataIndex: "areapin",
			key: "areapin"
		},
		{
			title: "Count",
			dataIndex: "count",
			key: "count"
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Button type="primary" className="login-form-button">
					Details
				</Button>
			)
		}
	];

	const data = [
		{
			key: "1",
			name: "John Brown",
			phone: +915864268542,
			areapin: 201206,
			count: 56,
			action: "Detail"
		},
		{
			key: "2",
			name: "John Black",
			phone: +915864268542,
			areapin: 201206,
			count: 56,
			action: "Detail"
		},
		{
			key: "3",
			name: "John Blue",
			phone: +915864268542,
			areapin: 201206,
			count: 56,
			action: "Detail"
		}
	];

	return (
		<div>
			<h2 className="login-card-head">Ambulance</h2>
			<br />
			<Row>
				<Col xl={8} lg={8} md={12} sm={24} xs={24}>
					<Statistic
						title="Total"
						value={112893}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				<Col xl={8} lg={8} md={12} sm={24} xs={24}>
					<Statistic
						title="Available"
						value={112893}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				<Col xl={8} lg={8} md={12} sm={24} xs={24}>
					<Button
						type="primary"
						className="login-form-button"
						onClick={() => handelModal(true)}
					>
						Add Administrator
					</Button>
				</Col>
			</Row>
			<br />
			<div>
				<h3 style={{ fontSize: "16px" }}>
					List of Ambulance Administrator
				</h3>
				<Col span={6}>
					<Input.Search
						type="text"
						style={{ width: 200, marginBottom: 12 }}
						placeholder="Search"
						allowClear
					/>
				</Col>

				<Table
					columns={columns}
					dataSource={data}
					pagination={{ position: ["bottomCenter"] }}
				/>
			</div>
			<AddAmbulanceAdmin visible={showModal} handleModal={handelModal} />
		</div>
	);
};

export default AmbulanceAdmin;
