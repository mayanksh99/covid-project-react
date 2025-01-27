import React, { useState, useEffect } from "react";
import PageTitle from "./../../common/PageTitle";
import { Col, Input, Card, Table, Popconfirm, Tooltip, Divider } from "antd";
import {
	CloseCircleOutlined,
	CheckCircleOutlined,
	EditOutlined,
	DeleteOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import DoctorAdminOption from "./DoctorAdminOption";
import {
	getDoctorsService,
	searchDoctorService,
	delByAdminService,
	resetPwdByAdminService
} from "../../../utils/services";
import { _notification } from "../../../utils/_helper";

const DoctorAdmin = () => {
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [doctors, setDoctors] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getDoctorsService();
				setDoctors(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);

	const handleDelete = async id => {
		try {
			const res = await delByAdminService("doctor", id);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Doctor deleted successfully"
				);
				setRefresh(!refresh);
			}
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};

	const handleResetPassword = async id => {
		try {
			const res = await resetPwdByAdminService("doctor", id);
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
			let params = {
				search: val
			};
			const res = await searchDoctorService(params);
			setDoctors(res.data);
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
				<Link to={`/admins/doctors/${details._id}`}>
					{details.name}
				</Link>
			)
		},
		{
			title: "ID",
			dataIndex: "empId",
			key: "empId"
		},
		{
			title: "Contact",
			dataIndex: "contact",
			key: "contact"
		},
		{
			title: "Hospital",
			dataIndex: "hospital",
			key: "hospital"
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
					<Tooltip title="Delete doctor">
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

	const data = doctors
		? doctors.map((doctor, id) => {
				const {
					_id,
					name,
					hospital,
					contact,
					age,
					empId,
					isDeleted,
					isBlocked
				} = doctor;
				return {
					index: ++id,
					key: _id,
					details: { _id, name },
					hospital,
					contact,
					age,
					empId,
					actions: { _id, isDeleted, isBlocked }
				};
		  })
		: null;

	return (
		<div>
			<PageTitle title="Doctor" />
			<DoctorAdminOption
				count={doctors ? doctors.length : 0}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
			<div>
				<h3 style={{ fontSize: "16px" }}>List of Doctors</h3>
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
		</div>
	);
};

export default DoctorAdmin;
