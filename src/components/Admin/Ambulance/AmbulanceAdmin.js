import React from "react";
import "../style.css";
import { Col, Table, Input, Card, Popconfirm, Divider, Tooltip } from "antd";
import AmbulanceAdminOption from "./AmbulanceAdminOption";
import {
	DeleteOutlined,
	EditOutlined,
	CloseCircleOutlined,
	CheckCircleOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PageTitle from "./../../common/PageTitle";

const AmbulanceAdmin = () => {
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
			render: name => <Link to="/ambulancedetails/sdvsdvsd">{name}</Link>
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
			name: "John Brown",
			phone: "+915864268542",
			areapin: 201206,
			count: 56,
			action: true
		},
		{
			key: "2",
			name: "John Black",
			phone: "+915864268542",
			areapin: 201206,
			count: 56,
			action: false
		},
		{
			key: "3",
			name: "John Blue",
			phone: "+915864268542",
			areapin: 201206,
			count: 56,
			action: true
		}
	];

	return (
		<>
			<PageTitle title="Ambulance" />
			<AmbulanceAdminOption />
			<div className="table-wrapper-card">
				<h3 style={{ fontSize: "16px" }}>List of Ambulance Operator</h3>
				<div>
					<Col span={6}>
						<Input.Search
							className="input-field"
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
			{/* <Drawer
				title="Update Profile"
				placement="right"
				closable={true}
				destroyOnClose={true}
				onClose={() => setProfileDrawer(false)}
				visible={profileDrawer}
			>
				<UpdateProfile 
				user={user} onUpdateUser={handleUpdateUser} 
				/>
			</Drawer> */}
		</>
	);
};

export default AmbulanceAdmin;
