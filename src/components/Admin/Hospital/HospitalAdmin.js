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
	getHospitalByParamsServices
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
			dataIndex: "name",
			key: "name",
			render: name => (
				<Link to={`/admins/hospitals/${name[0]}`}>{name[1]}</Link>
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
					name: [_id, name],
					contact,
					address,
					cat: category.toUpperCase(),
					action: _id
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
						<Col span={12}>
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
