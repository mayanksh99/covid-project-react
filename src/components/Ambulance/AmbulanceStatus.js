import React, { useState, useEffect } from "react";
import { getRole } from "./../../utils/_helper";
import {
	Button,
	Table,
	Tag,
	Statistic,
	Col,
	Row,
	Upload,
	Select,
	Form
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PageTitle from "../common/PageTitle";
import { _notification } from "../../utils/_helper";
import {
	getAllAmbulanceUnder,
	getOperatorAmbService,
	addAmbulance,
	getAmbulanceDuties
} from "../../utils/services";
import "./style.css";
import AmbulanceStatusModal from "./AmbulanceStatusModal";
import AddAmbulanceModal from "./AddAmbulanceModal";
import AddBulkResponseModal from "../../utils/_helper";
import { ADD_BULK_AMBULANCES } from "../../utils/routes";
import { BASE_URL } from "../../utils/services";
// import AmbulanceDutiesModal from "./AmbulanceDutiesModal";
import AmbDutiesTable from "./AmbulanceDutiesTable";

const AmbulanceStatus = (props) => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	const { Option } = Select;
	const userData = useState(getRole());
	const [bulkUploadDetails, setBulkUploadDetails] = useState(false);
	const [isResultsVisible, setIsResultsVisible] = useState(false);
	const [bulkData, setBulkData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isAddAmbVisible, setIsAddAmbVisible] = useState(false);
	// const [isDutiesModalVisible, setIsDutiesModalVisible] = useState(false);
	const [isTableVisible, setIsTableVisible] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [ambulance, setAmbulance] = useState(null);
	const [dutiesTableData, setDutiesTableData] = useState(null);
	const [isAmbAdding, setIsAmbAdding] = useState(false);
	const [count, setCount] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [form2] = Form.useForm();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getAllAmbulanceUnder(userData[0].id);
				setAmbulance(res.data.ambulances);
				setCount(res.data.ambulanceCount);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	const handleCancel = value => {
		setIsVisible(value);
	};

	const closeResults = () => {
		setIsResultsVisible(false);
	};

	const showModal = () => {
		setIsAddAmbVisible(!isAddAmbVisible);
	};

	const handleModal = data => {
		setModalData(data);
		handleCancel(true);
	};

	const handleStatus = async val => {
		setIsLoading(true);
		try {
			let params = { aoid: userData[0].id, status: val };
			const res = await getOperatorAmbService(params);
			setAmbulance(res.data.ambulances);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const add = async values => {
		setIsAmbAdding(true);
		const ambDetails = {
			vehicleNo: values.vehiclenumber,
			pincode: values.areapin,
			name: values.drivername,
			contact: values.driverphone
		};
		try {
			const res = await addAmbulance(ambDetails, userData[0].id);
			if (res.res.error) {
				setIsAmbAdding(false);
				_notification("error", "Error", res.res.message);
			} else if (res.res.message === "success") {
				form2.setFieldsValue({
					vehiclenumber: null,
					drivername: null,
					driverphone: null,
					areapin: null
				});
				setIsAmbAdding(false);
				setIsAddAmbVisible(false);
				setRefresh(!refresh);
				_notification(
					"success",
					"Success",
					"Ambulance added successfully"
				);
			}
		} catch (err) {
			setIsAmbAdding(false);
			_notification("warning", "Error", err.message);
		}
	};

	const handleClick = async data => {
		//console.log(data);
		setIsLoading(true);
		try {
			const res = await getAmbulanceDuties(data.key);
			if (res.error === false && res.message === "success") {
				if (res.data.length === 0) {
					_notification(
						"warning",
						"Warning",
						"Sorry! no history found."
					);
					setIsLoading(false);
				} else {
					setDutiesTableData(res.data);
					setIsTableVisible(true);
					setIsLoading(false);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};
	const props1 = {
		name: "file",
		action: `${BASE_URL}${ADD_BULK_AMBULANCES}${userData[0].id}`,
		headers: {
			"x-auth-token": `${AUTH_TOKEN.token}`
		},
		onChange(info) {
			if (info.file.status === "done") {
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
					setIsResultsVisible(true);
					setRefresh(!refresh);
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

	const tableColumnsBulk = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Vehicle Number",
			dataIndex: "vehicleNo",
			key: "vehicleNo"
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason"
		}
	];

	const tableColumns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Driver's Name",
			dataIndex: "driverName",
			key: "driverName",
			render: (driverName, data) => (
				<div
					onClick={() => handleClick(data)}
					style={{ color: "blue", cursor: "pointer" }}
				>
					{driverName}
				</div>
			)
		},
		{
			title: "Vehicle number",
			dataIndex: "vehicleNo",
			key: "vehicleNo"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: status => (
				<>
					{status.map(status => {
						let color = "";
						if (status === "available") {
							color = "green";
						} else if (status === "onDuty") {
							color = "orange";
						} else color = "red";
						return (
							<Tag color={color} key={status}>
								{status.toUpperCase()}
							</Tag>
						);
					})}
				</>
			)
		},
		{
			title: "Phone number",
			dataIndex: "phoneNumber",
			key: "phoneNumber"
		},
		{
			title: "Action",
			key: "changeStatusButton",
			render: data => (
				<Button
					type="primary"
					onClick={() => {
						handleModal(data);
					}}
				>
					Update Ambulance
				</Button>
			)
		}
	];
	const data = ambulance
		? ambulance.map((amb, i) => {
				return {
					index: ++i,
					key: amb._id,
					status: [amb.status],
					phoneNumber: `+91-${amb.driver.contact}`,
					vehicleNo: amb.vehicleNo,
					driverName: amb.driver.name,
					pincode: amb.pincode
				};
		  })
		: null;

	return (
		<div className="container">
			<PageTitle title="Ambulance Status" />
			<Row gutter={[16, 16]}>
				{count ? (
					<Col xl={20} lg={20} md={20} sm={24} xs={24}>
						<Row gutter={[16, 16]}>
							<Col xl={24} lg={24} md={24} sm={24} xs={12}>
								<Row gutter={[16, 16]}>
									<Col xl={6} lg={6} md={6} sm={6} xs={24}>
										<Statistic
											title="Total"
											value={
												count.available +
												count.onDuty +
												count.disabled
											}
										/>
									</Col>
									<Col xl={6} lg={6} md={6} sm={6} xs={24}>
										<Statistic
											title="Available"
											value={count.available}
										/>
									</Col>
									<Col xl={6} lg={6} md={6} sm={6} xs={24}>
										<Statistic
											title="On-Duty"
											value={count.onDuty}
										/>
									</Col>
									<Col xl={6} lg={6} md={6} sm={6} xs={24}>
										<Statistic
											title="Disabled"
											value={count.disabled}
										/>
									</Col>
								</Row>
							</Col>
							<Col xl={24} lg={24} md={24} sm={24} xs={12}>
								<Row gutter={[16, 16]}>
									<Col xl={6} lg={6} md={6} sm={6} xs={24}>
										<Statistic
											title="Removed"
											value={count.removed}
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				) : null}
				<Col xl={4} lg={4} md={4} sm={24} xs={24}>
					<Row gutter={[16, 16]}>
						<Col xl={24} lg={24} md={24} sm={24} xs={12}>
							<Row gutter={[16, 16]}>
								<Col xl={24} lg={24} md={24} sm={24} xs={12}>
									<Button
										type="primary"
										className="login-form-button"
										onClick={showModal}
									>
										Add Ambulance
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col xl={24} lg={24} md={24} sm={24} xs={12}>
							<Row gutter={[16, 16]}>
								<Col xl={24} lg={24} md={24} sm={24} xs={12}>
									<Upload accept=".csv" {...props1}>
										<Button>
											<UploadOutlined />
											Upload CSV
										</Button>
									</Upload>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col xl={24} lg={24} md={24} sm={24} xs={12}>
							<Row gutter={[16, 16]}>
								<Col xl={24} lg={24} md={24} sm={24} xs={12}>
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
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
			<Table
				loading={isLoading}
				title={() => "List of Ambulance"}
				bordered={false}
				columns={tableColumns}
				dataSource={data}
				pagination={{ position: ["bottomCenter"] }}
			/>
			<AmbulanceStatusModal
				isVisible={isVisible}
				handleCancel={handleCancel}
				detail={modalData}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
			<AddBulkResponseModal
				isResultsVisible={isResultsVisible}
				closeResults={closeResults}
				tableColumns={tableColumnsBulk}
				data={bulkData}
				bulkUploadDetails={bulkUploadDetails}
				title={"Invalid Ambulances"}
				whatIsBeingAdded={"Ambulance"}
			/>
			<AddAmbulanceModal
				isVisible={isAddAmbVisible}
				setIsVisible={setIsAddAmbVisible}
				isAmbAdding={isAmbAdding}
				add={add}
			/>
			{/* <AmbulanceDutiesModal
				isVisible={isDutiesModalVisible}
				setIsVisible={setIsDutiesModalVisible}
				setRefresh={setRefresh}
				refresh={refresh}
				data={dutiesModalData}
			/> */}
			<AmbDutiesTable
				showTable={isTableVisible}
				setShowTable={setIsTableVisible}
				data={dutiesTableData}
			/>
		</div>
	);
};

export default AmbulanceStatus;
