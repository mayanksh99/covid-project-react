import React from "react";
import { Col, Input, Card, Table, Popconfirm, Tooltip, Divider } from "antd";
import { Link } from "react-router-dom";
import {
	CloseCircleOutlined,
	CheckCircleOutlined,
	EditOutlined,
	DeleteOutlined
} from "@ant-design/icons";

const HospitalAdmin = () => {
	const columns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: name => <Link to="/hospitaldetails/sdvsdvsd">{name}</Link>
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address"
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category"
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: action => (
				<>
					<Popconfirm
						title="Do you want to toggle user block?"
						// onConfirm={() => handleUserRevoke(action[1])}
						okText="Yes"
						cancelText="No"
					>
						{action ? (
							<Tooltip title="Unblock user">
								<CloseCircleOutlined
									style={{ color: "#DB4437" }}
								/>
							</Tooltip>
						) : (
							<Tooltip title="Block user">
								<CheckCircleOutlined
									style={{ color: "#0F9D58" }}
								/>
							</Tooltip>
						)}
					</Popconfirm>
					<Divider type="vertical" />
					<Tooltip title="Edit password">
						<Link to="#">
							<EditOutlined style={{ color: "#F4B400" }} />
						</Link>
					</Tooltip>

					<Divider type="vertical" />
					<Tooltip title="Delete admin">
						<Popconfirm
							title="Are you sure delete this user?"
							// onConfirm={() => handleUserDelete(action[1])}
							okText="Yes"
							cancelText="No"
						>
							<DeleteOutlined style={{ color: "#DB4437" }} />
						</Popconfirm>
					</Tooltip>
				</>
			)
		}
	];

	const data = [
		{
			key: "1",
			name: "ITS Hospital",
			phone: "+915864268542",
			address: "KIET Group of Institutions",
			category: "L1",
			action: true
		},
		{
			key: "2",
			name: "John Black",
			phone: "+915864268542",
			address: "KIET Group of Institutions",
			category: "L1,L2",
			action: false
		},
		{
			key: "3",
			name: "John Blue",
			phone: "+915864268542",
			address: "KIET Group of Institutions",
			category: "L1",
			action: true
		}
	];
	return (
		<div>
			<h2 className="login-card-head">Hospital</h2>
			<div className="table-wrapper-card">
				<h3 style={{ fontSize: "16px" }}>List of Hospitals</h3>
				<div>
					<Col span={6}>
						<Input.Search
							type="text"
							style={{ width: 200, marginBottom: 12 }}
							placeholder="Search"
							allowClear
						/>
					</Col>
					<Card
						style={{ padding: 0, width: "100%", overflowX: "auto" }}
					>
						<Table
							columns={columns}
							dataSource={data}
							pagination={{ position: ["bottomCenter"] }}
						/>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default HospitalAdmin;
