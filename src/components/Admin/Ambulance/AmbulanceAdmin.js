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
import { getAmbOperatorService } from "../../../utils/services";
import { delByAdminService } from "./../../../utils/services";

const AmbulanceAdmin = () => {
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [ambOperators, setAmbOperators] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getAmbOperatorService();
				console.log(res);
				setAmbOperators(res.data.operators);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
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

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: name => <Link to="/ambulancedetails/sdvsdvsd">{name}</Link>
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
		// {
		// 	title: "Count",
		// 	dataIndex: "count",
		// 	key: "count"
		// },
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
						{id ? (
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
					<Tooltip title="Delete operator">
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

	const data = ambOperators
		? ambOperators.map((operator, id) => {
				const { _id, name, email, contact } = operator;
				return {
					index: ++id,
					key: _id,
					name,
					contact,
					email,
					action: _id
				};
		  })
		: null;

	return (
		<>
			<PageTitle title="Ambulance" />
			<AmbulanceAdminOption refresh={refresh} setRefresh={setRefresh} />
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
