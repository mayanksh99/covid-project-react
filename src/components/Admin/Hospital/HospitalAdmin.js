import React, { useState, useEffect } from "react";
import { Col, Input, Card, Table, Popconfirm, Tooltip, Divider } from "antd";
import { Link } from "react-router-dom";
import PageTitle from "./../../common/PageTitle";
import {
	CloseCircleOutlined,
	CheckCircleOutlined,
	EditOutlined,
	DeleteOutlined
} from "@ant-design/icons";
import HospitalAdminOption from "./HospitalAdminOption";
import {
	getHospitalsService,
	delByAdminService
} from "../../../utils/services";
import { _notification } from "../../../utils/_helper";

const HospitalAdmin = () => {
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [hospitals, setHospitals] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getHospitalsService();
				setHospitals(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);

	const handleDelete = async id => {
		try {
			const res = await delByAdminService("hospital", id);
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
			render: name => <Link to="/hospitaldetails/sdvsdvsd">{name}</Link>
		},
		{
			title: "Contact No.",
			dataIndex: "contact",
			key: "contact"
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
					<Tooltip title="Delete hospital">
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

	const data = hospitals
		? hospitals.map((hospital, id) => {
				const { _id, name, contact, address, category } = hospital;
				return {
					index: ++id,
					key: _id,
					name,
					contact,
					address,
					category,
					action: _id
				};
		  })
		: null;
	return (
		<div>
			<PageTitle title="Hospital" />
			<HospitalAdminOption refresh={refresh} setRefresh={setRefresh} />
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

export default HospitalAdmin;
