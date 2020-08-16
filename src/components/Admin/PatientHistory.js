import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Skeleton, Tag, Divider, Timeline } from "antd";
import { _notification } from "../../utils/_helper";
import { getParticularPatientService } from "./../../utils/services";
import ProfileDetails from "./../common/ProfileDetails";
import { Link } from "react-router-dom";
import moment from "moment";
import { ClockCircleOutlined } from "@ant-design/icons";

const PatientHistory = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [patient, setPatient] = useState(null);

	useEffect(() => {
		if (props.pid) {
			(async () => {
				setIsLoading(true);
				try {
					const res = await getParticularPatientService(props.pid);
					console.log(res);
					setPatient(res.data);
					setIsLoading(false);
				} catch (err) {
					_notification("warning", "Error", err.message);
				}
			})();
		}
	}, [props.pid]);

	// console.log(patient && patient.history.history.doctorExamined);

	return (
		<>
			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Patient Detail
					</h3>
				}
				visible={props.visible}
				onCancel={() => props.handleModal(false)}
				footer={null}
				width={800}
				style={{ top: 50 }}
			>
				<Skeleton loading={isLoading} active>
					{patient ? (
						<>
							{/* PersonalDetail */}

							<Row gutter={[16, 16]}>
								<Col xl={12} lg={12} md={12} sm={12} xs={24}>
									<ProfileDetails
										label="Name"
										data={patient.name}
									/>
									<ProfileDetails
										label="Gender"
										data={patient.gender}
									/>
									<ProfileDetails
										label="Patient Phone"
										data={patient.phone}
									/>
									{patient.email && (
										<ProfileDetails
											label="Patient Email"
											data={patient.email}
										/>
									)}
									<ProfileDetails
										label="District"
										data={patient.district}
									/>
									<ProfileDetails
										label="Status"
										data={
											<Tag color="green">
												{patient.status
													.charAt(0)
													.toUpperCase() +
													patient.status.slice(1)}
											</Tag>
										}
									/>
								</Col>
								<Col xl={12} lg={12} md={12} sm={12} xs={24}>
									<ProfileDetails
										label="Case ID"
										data={patient.caseId}
									/>
									<ProfileDetails
										label="Age"
										data={patient.age}
									/>

									<ProfileDetails
										label="Patient Address"
										data={patient.address}
									/>
									<ProfileDetails
										label="Relative Phone"
										data={patient.relative.phone}
									/>

									<ProfileDetails
										label="Relative Email"
										data={patient.relative.email}
									/>
								</Col>
							</Row>

							{/* Smaple detail */}

							<Row>
								<Col xl={12} lg={12} md={12} sm={12} xs={24}>
									<ProfileDetails
										label="Sample Collected"
										data={moment(
											patient.history.history
												.sampleCollected.time
										).format("Do MMMM YYYY, h:mm:ss a")}
									/>
								</Col>

								<Col xl={12} lg={12} md={12} sm={12} xs={24}>
									<ProfileDetails
										label="Sample Result"
										data={moment(
											patient.history.history.sampleResult
												.time
										).format("Do MMMM YYYY, h:mm:ss a")}
									/>
								</Col>
							</Row>

							{/* Lab detail */}

							{patient.hasOwnProperty("lab") ? (
								<Row>
									<Col
										xl={12}
										lg={12}
										md={12}
										sm={12}
										xs={24}
									>
										<ProfileDetails
											label="Lab name"
											data={patient.lab.name}
										/>
									</Col>
								</Row>
							) : null}

							{/* Examination Detail */}

							{patient.history.history.hasOwnProperty(
								"doctorExamined"
							) && patient.history.history.doctorExamined.time ? (
								<>
									<Divider>Examination Detail</Divider>
									<Row>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<Link
												to={`/admins/doctors/${patient.history.history.doctorExamined.doctor}`}
											>
												<ProfileDetails
													label="Doctor's Name"
													data={patient.doctor.name}
												/>
											</Link>
										</Col>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<ProfileDetails
												label="Examined At"
												data={moment(
													patient.history.history
														.doctorExamined.time
												).format(
													"Do MMMM YYYY, h:mm:ss a"
												)}
											/>
										</Col>
									</Row>
									{patient.history.history.hasOwnProperty(
										"levelAlloted"
									) &&
									patient.history.history.levelAlloted
										.time ? (
										<Row>
											<Col
												xl={12}
												lg={12}
												md={12}
												sm={12}
												xs={24}
											>
												<ProfileDetails
													label="Level Alloted"
													data={
														patient.history.history
															.levelAlloted &&
														patient.history.history.levelAlloted.level.toUpperCase()
													}
												/>
											</Col>
											<Col
												xl={12}
												lg={12}
												md={12}
												sm={12}
												xs={24}
											>
												<ProfileDetails
													label="Alloted At"
													data={moment(
														patient.history.history
															.levelAlloted.time
													).format(
														"Do MMMM YYYY, h:mm:ss a"
													)}
												/>
											</Col>
										</Row>
									) : null}
									{patient.history.history.hasOwnProperty(
										"declined"
									) &&
									patient.history.history.declined.time ? (
										<>
											<Row>
												<Col
													xl={12}
													lg={12}
													md={12}
													sm={12}
													xs={24}
												>
													<ProfileDetails
														label={`Declined to ${patient.history.history.declined.to}`}
													/>
												</Col>
												<Col
													xl={12}
													lg={12}
													md={12}
													sm={12}
													xs={24}
												>
													<ProfileDetails
														label="Declined At"
														data={moment(
															patient.history
																.history
																.declined.time
														).format(
															"Do MMMM YYYY, h:mm:ss a"
														)}
													/>
												</Col>
											</Row>
										</>
									) : null}

									{patient.history.history.hasOwnProperty(
										"doctorExamined"
									) &&
									patient.history.history.doctorExamined
										.comments ? (
										<ProfileDetails
											label="Doctor's Comment"
											data={
												patient.history.history
													.doctorExamined.comments
											}
										/>
									) : null}
									{patient.history.history.hasOwnProperty(
										"declined"
									) &&
									patient.history.history.declined.reason ? (
										<ProfileDetails
											label="Reason"
											data={
												patient.history.history.declined
													.reason
											}
										/>
									) : null}
								</>
							) : null}

							{/* Ambulance detail */}

							{patient.history.history.hasOwnProperty(
								"ambulanceAlloted"
							) &&
							patient.history.history.ambulanceAlloted.time ? (
								<>
									<Divider>Ambulance Detail</Divider>
									<Row>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<Link
												to={`/admins/ambulance-operators/${patient.ambulance.aoid}`}
											>
												<ProfileDetails
													label="Ambulance"
													data={
														patient.ambulance
															.vehicleNo
													}
												/>
											</Link>
										</Col>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<ProfileDetails
												label="Alloted At"
												data={moment(
													patient.history.history
														.ambulanceAlloted.time
												).format(
													"Do MMMM YYYY, h:mm:ss a"
												)}
											/>
										</Col>
									</Row>
									{patient.ambulance.hasOwnProperty(
										"driver"
									) ? (
										<Row>
											<Col
												xl={12}
												lg={12}
												md={12}
												sm={12}
												xs={24}
											>
												<ProfileDetails
													label="Driver's Name"
													data={
														patient.ambulance.driver
															.name
													}
												/>
											</Col>
											<Col
												xl={12}
												lg={12}
												md={12}
												sm={12}
												xs={24}
											>
												<ProfileDetails
													label="Driver's Phone"
													data={
														patient.ambulance.driver
															.contact
													}
												/>
											</Col>
										</Row>
									) : null}
								</>
							) : null}

							{/* Hospital Detail */}

							{patient.history.history.hasOwnProperty(
								"hospitalAlloted"
							) &&
							patient.history.history.hospitalAlloted.time ? (
								<>
									<Divider>Hospital Detail</Divider>
									<Row>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<Link
												to={`/admins/hospitals/${patient.hospital._id}`}
											>
												<ProfileDetails
													label="Hospital name"
													data={patient.hospital.name}
												/>
											</Link>
										</Col>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<ProfileDetails
												label="Alloted At"
												data={moment(
													patient.history.history
														.hospitalAlloted.time
												).format(
													"Do MMMM YYYY, h:mm:ss a"
												)}
											/>
										</Col>
									</Row>
									{patient.history.history.hasOwnProperty(
										"hospitalised"
									) &&
									patient.history.history.hospitalised
										.time ? (
										<Row>
											<Col
												xl={12}
												lg={12}
												md={12}
												sm={12}
												xs={24}
											>
												<ProfileDetails
													label="Bed No."
													data={
														patient.history.history
															.hospitalised.bed
													}
												/>
											</Col>
											<Col
												xl={12}
												lg={12}
												md={12}
												sm={12}
												xs={24}
											>
												<ProfileDetails
													label="Bed alloted at"
													data={moment(
														patient.history.history
															.hospitalised.time
													).format(
														"Do MMMM YYYY, h:mm:ss a"
													)}
												/>
											</Col>
										</Row>
									) : null}
								</>
							) : null}

							{/* Report Detail */}

							{patient.reports.length > 0 ? (
								<>
									<Divider>Report Detail</Divider>
									<Timeline mode="alternate">
										{patient.reports.map((report, i) => (
											<Timeline.Item
												key={i}
												label={moment(
													report.time
												).format(
													"Do MMMM YYYY, h:mm:ss a"
												)}
												dot={
													<ClockCircleOutlined
														style={{
															fontSize: "16px"
														}}
													/>
												}
											>
												<ProfileDetails
													label="Test Performed"
													data={report.testPerformed.toUpperCase()}
												/>
												{report.hasOwnProperty(
													"testReport"
												) ? (
													<ProfileDetails
														label="Test Report"
														data={report.testReport.toUpperCase()}
													/>
												) : null}
												<ProfileDetails
													label="Rating"
													data={report.rating}
												/>
												{report.comment ? (
													<ProfileDetails
														label="Comment"
														data={report.comment}
													/>
												) : null}
											</Timeline.Item>
										))}
									</Timeline>
								</>
							) : null}

							{/* Discharged Detail */}

							{patient.history.history.hasOwnProperty(
								"discharged"
							) && patient.history.history.discharged.time ? (
								<>
									<Divider>Discharged Detail</Divider>
									<Row>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<ProfileDetails
												label="Type"
												data={
													patient.history.history.discharged.type
														.charAt(0)
														.toUpperCase() +
													patient.history.history.discharged.type.slice(
														1
													)
												}
											/>
										</Col>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<ProfileDetails
												label="Discharged At"
												data={moment(
													patient.history.history
														.discharged.time
												).format(
													"Do MMMM YYYY, h:mm:ss a"
												)}
											/>
										</Col>
									</Row>
								</>
							) : null}
						</>
					) : null}
				</Skeleton>
			</Modal>
		</>
	);
};

export default PatientHistory;
