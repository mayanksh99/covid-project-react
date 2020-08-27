import React, { useState, useEffect } from "react";
import {
	Card,
	Row,
	Col,
	Table,
	Tag,
	Button,
	Statistic,
	Skeleton,
	Popconfirm,
	Tooltip,
	Input,
	Select,
	Divider,
	Upload
} from "antd";
import AddAmbulance from "./AddAmbulance";
import PageTitle from "../../common/PageTitle";
import { UploadOutlined } from "@ant-design/icons";
import AddBulkResponseModal from "../../../utils/_helper";
import { BASE_URL } from "../../../utils/services";
import { ADD_BULK_AMBULANCES } from "../../../utils/routes";
import { _notification } from "../../../utils/_helper";
import AmbulanceDutiesModal from "./AmbulanceDutiesModal";
import {
	getOperatorAmbService,
	searchAmbOperatorService,
	getAmbulanceDuties
} from "../../../utils/services";
import { EditOutlined } from "@ant-design/icons";
import AmbulanceUpdate from "./AmbulanceUpdate";
import AmbulanceOperatorUpdate from "./AmbulanceOperatorUpdate";

const { Option } = Select;

const AmbulanceAdminDetails = props => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	const [bulkUploadDetails, setBulkUploadDetails] = useState(false);
	const [bulkData, setBulkData] = useState(null);
	const [isResultsVisible, setIsResultsVisible] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [ambulances, setAmbulances] = useState(null);
	const [operator, setOperator] = useState(null);
	const [count, setCount] = useState(null);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [operatorUpdate, setOperatorUpdate] = useState(false);
	const [ambulanceData, setAmbulanceData] = useState(null);
	const [dutiesModalData, setDutiesModalData] = useState(null);
	const [isDutiesModalVisible, setIsDutiesModalVisible] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [refreshProfile, setRefreshProfile] = useState(false);
	const [status, setStatus] = useState(null);
	const [search, setSearch] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				let params = { aoid: props.match.params.id };
				const res = await getOperatorAmbService(params);
				setAmbulances(res.data.ambulances);
				setCount(res.data.ambulanceCount);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
				setIsLoading(false);
			}
		})();
	}, [props.match.params.id, refresh]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				let params = { aoid: props.match.params.id };
				const res = await searchAmbOperatorService(params);
				setOperator(res.data.operators[0]);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
				setIsLoading(false);
			}
		})();
	}, [props.match.params.id, refreshProfile]);

	const handleModal = value => {
		setShowModal(value);
	};

	const handleUpdateModal = (value, data) => {
		setShowUpdateModal(value);
		setAmbulanceData(data);
	};

	const closeResults = () => {
		setIsResultsVisible(false);
	};

	const handleClick = async data => {
		setIsLoading(true);
		try {
			const res = await getAmbulanceDuties(data.key);
			if (res.error === false && res.message === "success") {
				if (res.data.length === 0) {
					_notification(
						"warning",
						"Error",
						"Sorry! no history found."
					);
					setIsLoading(false);
				} else {
					setDutiesModalData(res.data);
					setIsDutiesModalVisible(true);
					setIsLoading(false);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleQuery = async val => {
		setIsLoading(true);
		setSearch(val);
		try {
			let params = {
				aoid: props.match.params.id,
				search: val,
				status
			};
			const res = await getOperatorAmbService(params);
			setAmbulances(res.data.ambulances);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const handleStatus = async val => {
		setIsLoading(true);
		setStatus(val);
		try {
			let params = { aoid: props.match.params.id, status: val, search };
			const res = await getOperatorAmbService(params);
			setAmbulances(res.data.ambulances);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const handleOperatorModal = value => {
		setOperatorUpdate(value);
	};

	const columns = [
		{
			title: "Vehicle No.",
			dataIndex: "vehicleNo",
			key: "vehicleNo",
			render: (vehicleNo, data) => (
				<div
					onClick={() => handleClick(data)}
					style={{ color: "blue", cursor: "pointer" }}
				>
					{vehicleNo}
				</div>
			)
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "Status",
			render: status => (
				<>
					{status === "available" && (
						<Tag color="green">Available</Tag>
					)}
					{status === "onDuty" && <Tag color="orange">On Duty</Tag>}
					{status === "disabled" && <Tag color="red">Disabled</Tag>}
					{status === "removed" && <Tag color="red">Removed</Tag>}
				</>
			)
		},
		{
			title: "Driver Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Phone",
			dataIndex: "contact",
			key: "contact"
		},
		{
			title: "Pincode",
			dataIndex: "pincode",
			key: "pincode"
		},
		{
			title: "Action",
			key: "action",
			render: action => (
				<>
					<Tooltip title="Update">
						<Popconfirm
							title="Do you want to update ambulance?"
							onConfirm={() => handleUpdateModal(true, action)}
							okText="Yes"
							cancelText="No"
						>
							<EditOutlined style={{ color: "#F4B400" }} />
						</Popconfirm>
					</Tooltip>
				</>
			)
		}
	];

	const data = ambulances
		? ambulances.map((ambulance, id) => {
				const { _id, vehicleNo, status, pincode, driver } = ambulance;
				const { contact, name } = driver;
				return {
					key: _id,
					vehicleNo,
					status,
					pincode,
					contact,
					name
				};
		  })
		: null;

	const tableColumns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Vehivle Number",
			dataIndex: "vehicleNo",
			key: "vehicleNo"
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason"
		}
	];

	const bulkProps = {
		name: "file",
		action: `${BASE_URL}${ADD_BULK_AMBULANCES}${props.match.params.id}`,
		headers: {
			"x-auth-token": `${AUTH_TOKEN.token}`
		},
		onChange(info) {
			if (info.file.status === "done") {
				console.log(info.file.response);
				if (info.file.response.data.invalidAmbulances.length === 0) {
					_notification(
						"success",
						"Success",
						"All ambulances were added successfully !"
					);
					setRefresh(!refresh);
				} else {
					setBulkData(
						info.file.response.data.invalidAmbulances.map(amb => {
							return {
								key: amb.index + 1,
								vehicleNo: amb.Ambulance,
								reason: amb.error
							};
						})
					);
					setBulkUploadDetails(info.file.response.data);
					_notification(
						"error",
						"Attention !",
						"Ambulance addition failed. Please Check !"
					);
					setRefresh(!refresh);
					setIsResultsVisible(true);
				}
			} else if (info.file.status === "error") {
				_notification(
					"error",
					"Error",
					"Upload failed. Please try again later !"
				);
			}
		}
	};

	return (
		<div>
			<PageTitle title="Ambulance" />
			<div>
				<h3 style={{ fontSize: "16px" }}>
					Detail of Ambulance Operator
				</h3>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={4} lg={6}>
						<Card>
							<Skeleton loading={isLoading} active>
								{operator ? (
									<>
										<p
											style={{
												fontSize: "18px",
												color: "#008DB9",
												fontWeight: 700
											}}
										>
											Personal Information
										</p>
										<p>
											<span className="profile-data-label">
												Name
											</span>
											<br />
											<span className="profile-data">
												{operator.name}
											</span>
										</p>
										<p>
											<span className="profile-data-label">
												Phone No.
											</span>
											<br />
											<span className="profile-data">
												+91-{operator.contact}
											</span>
										</p>
										<p>
											<span className="profile-data-label">
												Email
											</span>
											<br />
											<span className="profile-data">
												{operator.email}
											</span>
										</p>
									</>
								) : null}

								<p>
									<span className="profile-data-label">
										No. of Ambulances
									</span>
									<br />
									<span className="profile-data">
										{count
											? count.available +
											  count.disabled +
											  count.onDuty
											: 0}
									</span>
								</p>
								<Button
									type="primary"
									className="login-form-button"
									style={{ float: "right" }}
									onClick={() => handleOperatorModal(true)}
									block
								>
									Edit profile
								</Button>
								<br />
								<Button
									type="primary"
									className="login-form-button"
									style={{ float: "right" }}
									onClick={() => handleModal(true)}
									block
								>
									Add Ambulance
								</Button>
								<br />
								<Divider>OR</Divider>
								<Upload accept=".csv" {...bulkProps}>
									<Button>
										<UploadOutlined />
										Upload CSV
									</Button>
								</Upload>
							</Skeleton>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={20} lg={18}>
						<Row>
							<Col xl={6} lg={6} md={12} sm={12} xs={24}>
								<Statistic
									title="Available"
									value={count ? count.available : 0}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
							<Col xl={6} lg={6} md={12} sm={12} xs={24}>
								<Statistic
									title="On Duty"
									value={count ? count.onDuty : 0}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
							<Col xl={6} lg={6} md={12} sm={12} xs={24}>
								<Statistic
									title="Disabled"
									value={count ? count.disabled : 0}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
							<Col xl={6} lg={6} md={12} sm={12} xs={24}>
								<Statistic
									title="Removed"
									value={count ? count.removed : 0}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
						</Row>
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
										placeholder="select status"
										onChange={handleStatus}
										allowClear
										className="input-field"
									>
										<Option value="available">
											Avaliable
										</Option>
										<Option value="onDuty">On Duty</Option>
										<Option value="disabled">
											Disabled
										</Option>
										<Option value="removed">Removed</Option>
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
								List of Ambulances
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
			</div>
			<AddAmbulance
				visible={showModal}
				handleModal={handleModal}
				refresh={refresh}
				setRefresh={setRefresh}
				aoid={props.match.params.id}
			/>
			<AmbulanceUpdate
				visible={showUpdateModal}
				handleModal={handleUpdateModal}
				data={ambulanceData}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
			<AmbulanceOperatorUpdate
				visible={operatorUpdate}
				handleModal={handleOperatorModal}
				data={operator}
				refresh={refreshProfile}
				setRefresh={setRefreshProfile}
			/>
			<AddBulkResponseModal
				isResultsVisible={isResultsVisible}
				closeResults={closeResults}
				tableColumns={tableColumns}
				data={bulkData}
				bulkUploadDetails={bulkUploadDetails}
				title={"Invalid Ambulances"}
				whatIsBeingAdded={"Ambulance"}
			/>
			<AmbulanceDutiesModal
				isVisible={isDutiesModalVisible}
				setIsVisible={setIsDutiesModalVisible}
				setRefresh={setRefresh}
				refresh={refresh}
				data={dutiesModalData}
			/>
		</div>
	);
};

export default AmbulanceAdminDetails;
