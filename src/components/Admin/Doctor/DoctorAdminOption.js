import React, { useState } from "react";
import { Row, Col, Statistic, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { _notification } from "../../../utils/_helper";
import AddBulkResponseModal from "../../../utils/_helper";
import AddDoctor from "./AddDoctor";

const DoctorAdminOption = ({ count, refresh, setRefresh }) => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	const [bulkUploadDetails, setBulkUploadDetails] = useState(false);
	const [isResultsVisible, setIsResultsVisible] = useState(false);
	const [data, setData] = useState(null);
	const [showModal, setshowModal] = useState(false);

	const handelModal = value => {
		setshowModal(value);
	};

	const closeResults = () => {
		setIsResultsVisible(false);
	};

	let i = 1;
	const props = {
		name: "file",
		action: `https://covid-project-gzb.herokuapp.com/api/v1/doctors/bulk`,
		headers: {
			"x-auth-token": `${AUTH_TOKEN.token}`
		},
		onChange(info) {
			if (info.file.status === "done") {
				console.log(info.file.response);
				if (info.file.response.data.invalidDoctors.length === 0) {
					_notification(
						"success",
						"Success",
						"All doctors were added successfully !"
					);
				} else {
					setData(
						info.file.response.data.invalidDoctors.map(doc => {
							return {
								key: i++,
								doctor: doc.doctor,
								reason: doc.error
							};
						})
					);
					setBulkUploadDetails(info.file.response.data);
					_notification(
						"error",
						"Attention !",
						"Doctor addition failed. Please Check !"
					);
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

	const tableColumns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Doctor Name",
			dataIndex: "doctor",
			key: "doctor"
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason"
		}
	];

	return (
		<div style={{ marginTop: "16px", marginBottom: "14px" }}>
			<Row>
				<Col xl={6} lg={6} md={8} sm={24} xs={24}>
					<Statistic
						title="Total Doctors"
						value={count}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				{/* <Col xl={6} lg={6} md={8} sm={24} xs={24}>
					<Statistic
						title="Available Doctors"
						value={13}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				<Col xl={6} lg={6} md={8} sm={24} xs={24}>
					<Statistic
						title="On Leave Doctors"
						value={13}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col> */}
				<Col xl={6} lg={6} md={8} sm={24} xs={24}>
					<Button
						type="primary"
						className="login-form-button"
						onClick={() => handelModal(true)}
					>
						Add Doctor
					</Button>
				</Col>
				<Col xl={6} lg={6} md={8} sm={24} xs={24}>
					<Upload accept=".csv" {...props}>
						<Button>
							<UploadOutlined />
							Upload CSV
						</Button>
					</Upload>
				</Col>
			</Row>
			<AddDoctor
				visible={showModal}
				handleModal={handelModal}
				refresh={refresh}
				setRefresh={setRefresh}
			/>

			<AddBulkResponseModal
				isResultsVisible={isResultsVisible}
				closeResults={closeResults}
				tableColumns={tableColumns}
				data={data}
				bulkUploadDetails={bulkUploadDetails}
				title={"Invalid Doctors"}
				whatIsBeingAdded={"Doctor"}
			/>
		</div>
	);
};

export default DoctorAdminOption;
