import React, { useEffect, useState } from "react";
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
import { _notification } from "../../../utils/_helper";
import {
	getAmbOperatorService,
	searchAmbOperatorService,
	delByAdminService,
	resetPwdByAdminService
} from "../../../utils/services";

const AmbulanceAdmin = () => {
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [ambOperators, setAmbOperators] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getAmbOperatorService();
				setAmbOperators(res.data.operators);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
				setIsLoading(false);
			}
		})();
	}, [refresh]);

	const handleDelete = async id => {
		try {
			const res = await delByAdminService("ambulanceoperator", id);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Operator deleted successfully"
				);
				setRefresh(!refresh);
			}
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};

	const handleResetPassword = async id => {
		try {
			const res = await resetPwdByAdminService("ambulanceoperator", id);
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
		try {
			let params = { search: val };
			const res = await searchAmbOperatorService(params);
			setAmbOperators(res.data.operators);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
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
			dataIndex: "details",
			key: "details",
			render: details => (
				<Link to={`/admins/ambulance-operators/${details._id}`}>
					{details.name}
				</Link>
			)
		},
		{
			title: "Contact",
			dataIndex: "contact",
			key: "contact"
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
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
					<Tooltip title="Reset password">
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
					<Tooltip title="Delete operator">
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

	const data = ambOperators
		? ambOperators.map((operator, id) => {
				const {
					_id,
					name,
					email,
					contact,
					isDeleted,
					isBlocked
				} = operator;
				return {
					index: ++id,
					key: _id,
					details: { name, _id },
					contact,
					email,
					actions: { _id, isDeleted, isBlocked }
				};
		  })
		: null;

	return (
		<>
			<PageTitle title="Ambulance" />
			<AmbulanceAdminOption refresh={refresh} setRefresh={setRefresh} />
			<div className="table-wrapper-card">
				<h3 style={{ fontSize: "16px" }}>
					List of Ambulance Operators
				</h3>
				<div>
					<Col span={6}>
						<Input.Search
							className="input-field"
							type="text"
							style={{ width: 200, marginBottom: 12 }}
							placeholder="Search"
							allowClear
							onSearch={value => handleQuery(value)}
						/>
					</Col>
					<Card
						style={{ padding: 0, width: "100%", overflowX: "auto" }}
					>
						<Table
							loading={isLoading}
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
