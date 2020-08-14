import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Skeleton, Tag, Divider } from "antd";
import { _notification } from "../../utils/_helper";
import { getParticularPatientService } from "./../../utils/services";
import ProfileDetails from "./../common/ProfileDetails";

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
					{patient && (
						<>
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
							<Divider>Doctor Examined</Divider>
						</>
					)}
				</Skeleton>
			</Modal>
		</>
	);
};

export default PatientHistory;
