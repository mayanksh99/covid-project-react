import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Col,
	Row,
	Card,
	Table,
	Popconfirm,
	Tooltip,
	Divider,
	Tag,
	Input,
	Select
} from "antd";
import {
	CloseCircleOutlined,
	CheckCircleOutlined,
	EditOutlined,
	DeleteOutlined
} from "@ant-design/icons";
import PageTitle from "./../common/PageTitle";
import AddAdmin from "./AddAdmin";
import {
	getAdminsService,
	delByAdminService,
	searchAdminsService,
	resetPwdByAdminService
} from "./../../utils/services";
import { _notification } from "../../utils/_helper";
import UpdateAdmin from "./UpdateAdmin";
import PageStats from "./../common/PageStats";

const { Option } = Select;

const AdminList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [admins, setAdmins] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [permission, setPermission] = useState(null);
	const [search, setSearch] = useState(null);
	const [profileData, setProfileData] = useState(null);

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

	const handleResetPassword = async id => {
		try {
			const res = await resetPwdByAdminService("admin", id);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification("success", "Success", "Password resetted.");
				setRefresh(!refresh);
			}
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};

	const handleQuery = async val => {
		setIsLoading(true);
		setSearch(val);
		try {
			let params = {
				search: val,
				permission
			};
			const res = await searchAdminsService(params);
			setAdmins(res.data);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const handlePermission = async val => {
		setIsLoading(true);
		setPermission(val);
		try {
			let params = { permission: val, search };
			const res = await searchAdminsService(params);
			setAdmins(res.data);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const handleModal = (val, data) => {
		setProfileData(data);
		setShowModal(val);
	};

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Name",
			key: "data",
			render: data => (
				<Link to="#" onClick={() => handleModal(true, data)}>
					{data.name}
				</Link>
			)
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Contact",
			dataIndex: "contact",
			key: "contact"
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
			dataIndex: "actions",
			key: "actions",
			render: actions => (
				<>
					<Popconfirm
						title="Do you want to toggle user block?"
						// onConfirm={() => handleUserRevoke(actions._id)}
						okText="Yes"
						cancelText="No"
						disabled={actions.isDeleted}
					>
						{actions.isBlocked ? (
							<Tooltip title="Unblock user">
								<CloseCircleOutlined
									style={{
										color: actions.isDeleted
											? "#000000A6"
											: "#DB4437"
									}}
								/>
							</Tooltip>
						) : (
							<Tooltip title="Block user">
								<CheckCircleOutlined
									style={{
										color: actions.isDeleted
											? "#000000A6"
											: "#0F9D58"
									}}
								/>
							</Tooltip>
						)}
					</Popconfirm>
					<Divider type="vertical" />
					<Tooltip title="Reset Password">
						<Popconfirm
							title="Are you reset password for this user?"
							onConfirm={() => handleResetPassword(actions._id)}
							okText="Yes"
							cancelText="No"
							disabled={actions.isDeleted}
						>
							<EditOutlined
								style={{
									color: actions.isDeleted
										? "#000000A6"
										: "#F4B400"
								}}
							/>
						</Popconfirm>
					</Tooltip>

					<Divider type="vertical" />
					<Tooltip title="Delete admin">
						<Popconfirm
							title="Are you sure delete this user?"
							onConfirm={() => handleDelete(actions._id)}
							okText="Yes"
							cancelText="No"
							disabled={actions.isDeleted}
						>
							<DeleteOutlined
								style={{
									color: actions.isDeleted
										? "#000000A6"
										: "#DB4437"
								}}
							/>
						</Popconfirm>
					</Tooltip>
				</>
			)
		}
	];

	const data = admins
		? admins.map((admin, i) => {
				const {
					_id,
					name,
					email,
					permissions,
					contact,
					isDeleted,
					isBlocked
				} = admin;
				return {
					index: ++i,
					key: _id,
					name,
					email,
					permissions,
					contact: contact ? contact : "",
					actions: { _id, isDeleted, isBlocked }
				};
		  })
		: null;

	return (
		<>
			<PageTitle title="Admin" />
			<Col xl={6} lg={6} md={6} sm={6} xs={24}>
				<PageStats
					title="Total admins"
					value={admins ? admins.length : 0}
				/>
			</Col>
			<br />
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={24} md={24} lg={8} xl={6}>
					<AddAdmin refresh={refresh} setRefresh={setRefresh} />
				</Col>
				<Col xs={24} sm={24} md={24} lg={16} xl={18}>
					<Row>
						<Col span={12}>
							<Input.Search
								className="input-field"
								type="text"
								style={{ width: 200, marginBottom: 12 }}
								placeholder="Search"
								allowClear
								onSearch={value => handleQuery(value)}
							/>
						</Col>
						<Col span={12} style={{ float: "right" }}>
							<div style={{ float: "right" }}>
								<Select
									placeholder="Select Permissions"
									onChange={handlePermission}
									allowClear
									className="input-field"
								>
									<Option value="master">Master</Option>
									<Option value="doctor">Doctor</Option>
									<Option value="hospital">Hospital</Option>
									<Option value="ambulance">Ambulance</Option>
								</Select>
							</div>
						</Col>
					</Row>
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
			<UpdateAdmin
				visible={showModal}
				handleModal={setShowModal}
				data={profileData}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
		</>
	);
};

export default AdminList;
