import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Col,
	Statistic,
	Row,
	Card,
	Table,
	Popconfirm,
	Tooltip,
	Divider,
	Tag
} from "antd";
import {
	CloseCircleOutlined,
	CheckCircleOutlined,
	EditOutlined,
	DeleteOutlined
} from "@ant-design/icons";
import PageTitle from "./../common/PageTitle";
import AddAdmin from "./AddAdmin";
import { getAdminsService, delByAdminService } from "./../../utils/services";
import { _notification } from "../../utils/_helper";

const AdminList = () => {
	const [action] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [admins, setAdmins] = useState(null);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getAdminsService();
				setAdmins(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);

	const handleDelete = async id => {
		try {
			const res = await delByAdminService("admin", id);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Admin deleted successfully"
				);
				setRefresh(!refresh);
			}
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Permissions",
			dataIndex: "permissions",
			key: "permissions",
			render: permissions => (
				<>
					{permissions.map((permission, id) => {
						return (
							<Tag color="green" key={id}>
								{permission}
							</Tag>
						);
					})}
				</>
			)
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: id => (
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
							onConfirm={() => handleDelete(id)}
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

	const data = admins
		? admins.map((admin, i) => {
				const { _id, name, email, permissions } = admin;
				return {
					index: ++i,
					key: _id,
					name,
					email,
					permissions,
					action: _id
				};
		  })
		: null;

	return (
		<>
			<PageTitle title="Admin" />
			<Col xl={6} lg={6} md={6} sm={6} xs={24}>
				<Statistic
					title="Total admins"
					value={admins ? admins.length : 0}
					valueStyle={{
						color: "#005ea5",
						fontWeight: 600
					}}
				/>
			</Col>
			<br />
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={24} md={24} lg={8} xl={6}>
					<AddAdmin refresh={refresh} setRefresh={setRefresh} />
				</Col>
				<Col xs={24} sm={24} md={24} lg={16} xl={18}>
					<Card>
						<p
							style={{
								fontSize: "18px",
								color: "#008DB9",
								fontWeight: 700
							}}
						>
							List of Admins
						</p>
						<div
							style={{
								padding: 0,
								width: "100%",
								overflowX: "auto"
							}}
						>
							<Table
								columns={columns}
								dataSource={data}
								pagination={{ position: ["bottomCenter"] }}
								loading={isLoading}
							/>
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default AdminList;
