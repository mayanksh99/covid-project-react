import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Table, Skeleton, Input } from "antd";
import UpdatePatientReport from "./UpdatePatientReport";
import PageTitle from "./../../common/PageTitle";
import { _notification } from "../../../utils/_helper";
import {
	getHospitalByParamsServices,
	getPatientByHospitalParamService
} from "../../../utils/services";
import PageStats from "../../common/PageStats";
import ProfileDetails from "../../common/ProfileDetails";
import { getPatientByHospitalService } from "./../../../utils/services";
import UpdateProfile from "./UpdateProfile";

const HospitalDetails = props => {
	const [patients, setPatients] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [details, setDetails] = useState(null);
	const [patientData, setPatientData] = useState(null);
	const [showProfile, setShowProfile] = useState(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				let params = { hid: props.match.params.id };
				const res = await getHospitalByParamsServices(params);
				setDetails(res.data.hospitals[0]);
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
				const res = await getPatientByHospitalService(
					props.match.params.id
				);
				setPatients(res.data.patients);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
				setIsLoading(false);
			}
		})();
	}, [props.match.params.id]);

	const handleModal = (value, data) => {
		setPatientData(data);
		setShowModal(value);
	};

	const handleQuery = async val => {
		setIsLoading(true);
		try {
			let params = { search: val };
			const res = await getPatientByHospitalParamService(
				props.match.params.id,
				params
			);
			setPatients(res.data.patients);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const columns = [
		{
			title: "Id",
			dataIndex: "caseId",
			key: "caseId"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Gender",
			dataIndex: "gender",
			key: "gender"
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age"
		},
		{
			title: "Action",
			key: "action",
			render: data => (
				<>
					<Button
						type="primary"
						className="login-form-button ambulance-button"
						onClick={() => handleModal(true, data)}
					>
						Update Report
					</Button>
				</>
			)
		}
	];

	const data = patients
		? patients.map((patient, id) => {
				const {
					_id,
					address,
					age,
					caseId,
					district,
					email,
					gender,
					name,
					phone,
					relative
				} = patient;
				return {
					index: ++id,
					key: _id,
					name,
					caseId,
					phone,
					gender,
					email,
					address,
					age,
					district,
					relativeEmail: relative.email,
					relativePhone: relative.phone
				};
		  })
		: null;
	return (
		<div>
			<PageTitle title="Hospital" />
			<div>
				<h3 style={{ fontSize: "16px" }}>Detail of Hospital</h3>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={4} lg={6}>
						<Skeleton loading={isLoading} active>
							{details ? (
								<Card>
									<div>
										<p
											style={{
												fontSize: "18px",
												color: "#008DB9",
												fontWeight: 700
											}}
										>
											Hospital's Information
										</p>

										<ProfileDetails
											label="Name"
											data={details.name}
										/>
										<ProfileDetails
											label="Phone No."
											data={details.contact}
										/>
										<ProfileDetails
											label="Address"
											data={details.address}
										/>
										<ProfileDetails
											label="Email"
											data={details.email}
										/>
										<ProfileDetails
											label="Category"
											data={details.category.toUpperCase()}
										/>
										<ProfileDetails
											label="Total beds"
											data={
												details.availableBeds +
												details.occupiedBeds +
												details.reservedBeds
											}
										/>
										<Col span={24}>
											<Button
												type="primary"
												className="login-form-button"
												block
												onClick={() =>
													setShowProfile(true)
												}
											>
												Edit Profile
											</Button>
										</Col>
									</div>
								</Card>
							) : null}
						</Skeleton>
					</Col>
					<Col xs={24} sm={24} md={20} lg={18}>
						{details ? (
							<Row gutter={[16, 16]}>
								<Col xl={8} lg={8} md={8} sm={24} xs={24}>
									<PageStats
										title="Available bed"
										value={details.availableBeds}
									/>
								</Col>
								<Col xl={8} lg={8} md={8} sm={24} xs={24}>
									<PageStats
										title="Occupied bed"
										value={details.occupiedBeds}
									/>
								</Col>
								<Col xl={8} lg={8} md={8} sm={24} xs={24}>
									<PageStats
										title="Reserved bed"
										value={details.reservedBeds}
									/>
								</Col>
							</Row>
						) : null}
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
						</Row>

						<Card>
							<p
								style={{
									fontSize: "18px",
									color: "#008DB9",
									fontWeight: 700
								}}
							>
								List of Patients
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
			<UpdatePatientReport
				visible={showModal}
				handleModal={handleModal}
				patientData={patientData}
				hid={details ? details._id : null}
			/>
			<UpdateProfile
				visible={showProfile}
				handleModal={setShowProfile}
				details={details}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
		</div>
	);
};

export default HospitalDetails;
