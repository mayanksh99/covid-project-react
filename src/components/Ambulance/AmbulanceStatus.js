import React, { useState, useEffect } from "react";
import { getRole } from "./../../utils/_helper";
import { Spin } from "antd";
import { Button, Modal, Table, Row, Col, Select, Tag } from "antd";
import PageTitle from "../common/PageTitle";
import { _notification } from "../../utils/_helper";
import { getAllAmbulanceUnder, updateStatus } from "../../utils/services";
import "./style.css";

const AmbulanceStatus = () => {
	const userData = useState(getRole());
	const { Option } = Select;
	const [isLoading, setIsLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [newStatus, setNewStatus] = useState("");
	const [rowData, setrowData] = useState(null);
	const [ambulance, setAmbulance] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);

	const handleChange = value => {
		setNewStatus(value);
	};

	const showModal = e => {
		setIsVisible(true);
	};

	const handleOk = async () => {
		setIsSpinning(true);
		try {
			const res = await updateStatus(newStatus, rowData.key);
			console.log(res);
			if (res.res.error) {
				setIsSpinning(false);
				_notification("error", "Error", res.res.message);
			} else if (res.res.message === "success") {
				setIsSpinning(false);
				setIsVisible(false);
				setRefresh(!refresh);
				_notification(
					"success",
					"Success",
					"status updated successfully"
				);
			}
		} catch (err) {
			setIsSpinning(false);
			_notification("warning", "Error", err.message);
		}
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	const data = ambulance
		? ambulance.map((amb, i) => {
				return {
					index: ++i,
					key: amb._id,
					status: [amb.status],
					phoneNumber: `+91-${amb.driver.contact}`,
					vehicleNo: amb.vehicleNo
				};
		  })
		: null;
	const tableColumns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
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
			dataIndex: "action",
			key: "changeStatusButton",
			render: () => (
				<Button type="primary" onClick={showModal}>
					Change Status
				</Button>
			)
		}
	];

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getAllAmbulanceUnder(userData[0].id);
				setAmbulance(res.res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);

	return (
		<div className="container">
			<PageTitle title="Ambulance Status" />

			<Table
				loading={isLoading}
				size="middle"
				title={() => "List of Ambulance"}
				showHeader={true}
				closable={true}
				bordered={true}
				columns={tableColumns}
				dataSource={data}
				pagination={{ position: ["none", "bottomCenter"] }}
				onRow={(record, rowIndex) => {
					return {
						onClick: event => {
							setrowData(record);
						}
					};
				}}
			/>
			<Modal
				title={
					<h3
						style={{
							color: "#fff",
							marginBottom: "-3px",
							textAlign: "center"
						}}
					>
						Change Status
					</h3>
				}
				width={300}
				visible={isVisible}
				style={{ top: 150 }}
				onCancel={handleCancel}
				footer={null}
			>
				<Spin tip="Updating status..." spinning={isSpinning}>
					<Row>
						<Col span={24} className="pl-11">
							Vehicle number
						</Col>
						<Col span={24} className="status-modal-field">
							{rowData === null ? "" : rowData.vehicleNo}
						</Col>
					</Row>
					<Row>
						<Col span={24} className="pl-11 mt-15">
							Current status
						</Col>
						<Col span={24}>
							{rowData === null
								? ""
								: rowData.status.map(status => {
										let color = "";
										if (status === "available") {
											color = "green";
										} else if (status === "onDuty") {
											color = "orange";
										} else color = "red";
										return (
											<Tag
												color={color}
												key={status}
												style={{
													width: "100%",
													padding: "2px 4px 2px 11px",
													fontSize: "15px"
												}}
											>
												{status.toUpperCase()}
											</Tag>
										);
								  })}
						</Col>
					</Row>
					<Row>
						<Col span={24} className="pl-11 mt-15">
							New status
						</Col>
						<Col span={24}>
							<Select
								defaultValue={
									rowData === null ? "" : rowData.status
								}
								onChange={handleChange}
								style={{ width: "100%" }}
							>
								<Option value="available">available</Option>
								<Option value="onDuty">onDuty</Option>
								<Option value="disable">disable</Option>
							</Select>
						</Col>
					</Row>
					<Row style={{ marginTop: "25px" }}>
						<Button
							key="submit"
							type="primary"
							onClick={handleOk}
							block
						>
							Submit
						</Button>
					</Row>
				</Spin>
			</Modal>
		</div>
	);
};

export default AmbulanceStatus;
