import React, { useState } from "react";
import { Row, Col, Button, Skeleton, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AddHospital from "./AddHospital";
import PageStats from "../../common/PageStats";
import { _notification } from "../../../utils/_helper";
import AddBulkResponseModal from "../../../utils/_helper";
import { BASE_URL } from "../../../utils/services";
import { ADD_BULK_HOSPITALS } from "../../../utils/routes";

const HospitalAdminOption = ({ refresh, setRefresh, stats, isLoading }) => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	const [bulkUploadDetails, setBulkUploadDetails] = useState(false);
	const [isResultsVisible, setIsResultsVisible] = useState(false);
	const [data, setData] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const handleModal = value => {
		setShowModal(value);
	};

	const closeResults = () => {
		setIsResultsVisible(false);
	};

	const props = {
		name: "file",
		action: `${BASE_URL}${ADD_BULK_HOSPITALS}`,
		headers: {
			"x-auth-token": `${AUTH_TOKEN.token}`
		},
		onChange(info) {
			if (info.file.status === "done") {
				console.log(info.file.response);
				if (info.file.response.data.invalidHospitals.length === 0) {
					_notification(
						"success",
						"Success",
						"All hospitals were added successfully !"
					);
				} else {
					setData(
						info.file.response.data.invalidHospitals.map(h => {
							return {
								key: h.index + 1,
								hospital: h.hospital,
								reason: h.error
							};
						})
					);
					setBulkUploadDetails(info.file.response.data);
					_notification(
						"error",
						"Attention !",
						"Hospital addition failed. Please Check !"
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
			title: "Hospital Name",
			dataIndex: "hospital",
			key: "hospital"
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason"
		}
	];

	return (
		<>
			<Skeleton loading={isLoading} active>
				<Row gutter={[16, 16]}>
					{stats ? (
						<Col xl={20} lg={20} md={20} sm={24} xs={24}>
							<Row gutter={[16, 16]}>
								<Col xl={24} lg={24} md={24} sm={24} xs={12}>
									<Row gutter={[16, 16]}>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Total beds"
												value={
													stats.total_l1 +
													stats.total_l2 +
													stats.total_l3
												}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Total L1 beds"
												value={stats.total_l1}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Total L2 beds"
												value={stats.total_l2}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Total L3 beds"
												value={stats.total_l3}
											/>
										</Col>
									</Row>
								</Col>
								<Col xl={24} lg={24} md={24} sm={24} xs={12}>
									<Row gutter={[16, 16]}>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Available beds"
												value={
													stats.available_l1 +
													stats.available_l2 +
													stats.available_l3
												}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Available L1 beds"
												value={stats.available_l1}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Available L2 beds"
												value={stats.available_l2}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Available L3 beds"
												value={stats.available_l3}
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
									<Col
										xl={24}
										lg={24}
										md={24}
										sm={24}
										xs={12}
									>
										<Button
											type="primary"
											className="login-form-button"
											onClick={handleModal}
										>
											Add Hospital
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col xl={24} lg={24} md={24} sm={24} xs={12}>
								<Row gutter={[16, 16]}>
									<Col
										xl={24}
										lg={24}
										md={24}
										sm={24}
										xs={12}
									>
										<Upload accept=".csv" {...props}>
											<Button>
												<UploadOutlined />
												Upload CSV
											</Button>
										</Upload>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Skeleton>
			<AddHospital
				visible={showModal}
				handleModal={handleModal}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
			<AddBulkResponseModal
				isResultsVisible={isResultsVisible}
				closeResults={closeResults}
				tableColumns={tableColumns}
				data={data}
				bulkUploadDetails={bulkUploadDetails}
				title={"Invalid Hospitals"}
				whatIsBeingAdded={"Hospital"}
			/>
		</>
	);
};

export default HospitalAdminOption;
