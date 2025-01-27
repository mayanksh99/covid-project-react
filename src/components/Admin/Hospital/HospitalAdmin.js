import React, { useState, useEffect } from "react";
import {
	Col,
	Input,
	Card,
	Table,
	Popconfirm,
	Tooltip,
	Divider,
	Row,
	Select
} from "antd";
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
	delByAdminService,
	getHospitalByParamsServices,
	resetPwdByAdminService
} from "../../../utils/services";
import { _notification } from "../../../utils/_helper";

const { Option } = Select;

const HospitalAdmin = () => {
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [hospitals, setHospitals] = useState(null);
	const [stats, setStats] = useState(null);
	const [search, setSearch] = useState(null);
	const [category, setCategory] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getHospitalsService();
				setHospitals(res.data.hospitals);
				setStats(res.data.stats[0]);
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
					"Hospital deleted successfully"
				);
				setRefresh(!refresh);
			}
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};

	const handleResetPassword = async id => {
		try {
			const res = await resetPwdByAdminService("hospital", id);
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
			let params = { search: val, category };
			const res = await getHospitalByParamsServices(params);
			setHospitals(res.data.hospitals);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const handleCategory = async val => {
		setIsLoading(true);
		setCategory(val);
		try {
			let params = { category: val, search };
			const res = await getHospitalByParamsServices(params);
			setHospitals(res.data.hospitals);
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
				<Link to={`/admins/hospitals/${details._id}`}>
					{details.name}
				</Link>
			)
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
			dataIndex: "cat",
			key: "cat"
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
					<Tooltip title="Delete hospital">
						<Popconfirm
							title="Are you sure delete this hospital?"
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

	const data = hospitals
		? hospitals.map((hospital, id) => {
				const {
					_id,
					name,
					contact,
					address,
					category,
					isDeleted,
					isBlocked
				} = hospital;
				return {
					index: ++id,
					key: _id,
					details: { _id, name },
					contact,
					address,
					cat: category.toUpperCase(),
					actions: { _id, isDeleted, isBlocked }
				};
		  })
		: null;
	return (
		<div>
			<PageTitle title="Hospital" />
			<HospitalAdminOption
				refresh={refresh}
				setRefresh={setRefresh}
				stats={stats}
				loading={isLoading}
			/>
			<div>
				<h3 style={{ fontSize: "16px" }}>List of Hospitals</h3>
				<div>
					<Row>
						<Col xl={4} lg={8} md={12} sm={12} xs={24}>
							<Input.Search
								className="input-field"
								type="text"
								style={{ marginBottom: 12 }}
								placeholder="Search"
								allowClear
								onSearch={value => handleQuery(value)}
							/>
						</Col>
						<Col xl={20} lg={16} md={12} sm={12} xs={24}>
							<div style={{ float: "right" }}>
								<Select
									placeholder="select category"
									onChange={handleCategory}
									allowClear
									className="input-field"
								>
									<Option value="l1">L1</Option>
									<Option value="l2">L2</Option>
									<Option value="l3">L3</Option>
								</Select>
							</div>
						</Col>
					</Row>
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
