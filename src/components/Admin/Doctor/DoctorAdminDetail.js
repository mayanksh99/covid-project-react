import React, { useEffect, useState } from "react";
import PageTitle from "../../common/PageTitle";
import { Row, Col, Card, Table, Avatar, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
	getDoctorProfileService,
	searchDoctorService,
	getExaminedPatientService
} from "../../../utils/services";
import { _notification } from "../../../utils/_helper";
import ProfileDetails from "./../../common/ProfileDetails";
import PageStats from "../../common/PageStats";

const DoctorDetail = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [detail, setDetail] = useState(null);
	const [count, setCount] = useState(null);
	const [patients, setPatients] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getDoctorProfileService(
					props.match.params.id
				);
				setCount(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [props.match.params.id]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const params = { did: props.match.params.id };
				const res = await searchDoctorService(params);
				setDetail(res.data[0]);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [props.match.params.id]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const params = { did: props.match.params.id };
				const res = await getExaminedPatientService(params);
				console.log(res);
				setPatients(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [props.match.params.id]);

	const columns = [
		{
			title: "Case ID",
			dataIndex: "caseId",
			key: "caseId"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age"
		},
		{
			title: "Gender",
			dataIndex: "gender",
			key: "gender"
		},
		{
			title: "Contact",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address"
		}
		// {
		// 	title: "Comment",
		// 	dataIndex: "doctorComment",
		// 	key: "doctorComment"
		// }
	];

	const data = patients
		? patients.map((patient, id) => {
				const {
					_id,
					address,
					age,
					caseId,
					district,
					doctorComment,
					gender,
					lab,
					name,
					phone
				} = patient;
				return {
					index: ++id,
					key: _id,
					address,
					age,
					caseId,
					district,
					doctorComment,
					gender,
					lab,
					name,
					phone
				};
		  })
		: null;

	return (
		<div>
			<PageTitle title="Doctor" />
			<div>
				<h3 style={{ fontSize: "16px" }}>Detail of Doctor</h3>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={4} lg={6}>
						<Card>
							<Skeleton loading={isLoading} active>
								<p
									style={{
										fontSize: "18px",
										color: "#008DB9",
										fontWeight: 700
									}}
								>
									Personal Information
								</p>
								<div style={{ textAlign: "center" }}>
									<Avatar size={84} icon={<UserOutlined />} />
								</div>
								<br />
								{detail ? (
									<>
										<ProfileDetails
											label="Name"
											data={detail.name}
										/>
										<ProfileDetails
											label="Employee ID"
											data={detail.empId}
										/>
										<ProfileDetails
											label="Age"
											data={detail.age}
										/>
										<ProfileDetails
											label="Gender"
											data={detail.gender}
										/>
										<ProfileDetails
											label="Contact No."
											data={detail.contact}
										/>
										<ProfileDetails
											label="Email"
											data={detail.email}
										/>
										<ProfileDetails
											label="Address"
											data={detail.address}
										/>
										<ProfileDetails
											label="Hospital"
											data={detail.hospital}
										/>
									</>
								) : null}
								{/* <Button
								type="primary"
								className="login-form-button"
								style={{ float: "right" }}
								// onClick={() => handleModal(true)}
							>
								
							</Button> */}
							</Skeleton>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={20} lg={18}>
						{count ? (
							<Row gutter={[16, 16]}>
								<Col xl={8} lg={8} md={8} sm={24} xs={24}>
									<PageStats
										title="Examined"
										value={count.examined}
									/>
								</Col>
								<Col xl={8} lg={8} md={8} sm={24} xs={24}>
									<PageStats
										title="Unexamined"
										value={count.unexamined}
									/>
								</Col>
								<Col xl={8} lg={8} md={8} sm={24} xs={24}>
									<PageStats
										title="Declined"
										value={count.declined}
									/>
								</Col>
							</Row>
						) : null}
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
			{/* <AddAmbulance visible={showModal} handleModal={handleModal} /> */}
		</div>
	);
};

export default DoctorDetail;
