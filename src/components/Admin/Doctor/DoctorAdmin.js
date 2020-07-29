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
import { getDoctorsService } from "../../../utils/services";
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

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "ID",
			dataIndex: "empId",
			key: "empId"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
			// render: name => <Link to="/doctordetails/sdvsdvsd">{name}</Link>
		},

		// {
		// 	title: "Age",
		// 	dataIndex: "age",
		// 	key: "age"
		// },
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

	const data = doctors
		? doctors.map((doctor, id) => {
				const { _id, name, hospital, contact, age, empId } = doctor;
				return {
					index: ++id,
					key: _id,
					name,
					hospital,
					contact,
					age,
					empId
				};
		  })
		: null;

	return (
		<div>
			<PageTitle title="Doctor" />
			<DoctorAdminOption count={doctors ? doctors.length : 0} />
			<div>
				<h3 style={{ fontSize: "16px" }}>List of Hospitals</h3>
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
		</div>
	);
};

export default DoctorAdmin;
