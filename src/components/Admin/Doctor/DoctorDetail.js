import React, { useEffect, useState } from "react";
import PageTitle from "../../common/PageTitle";
import { Row, Col, Card, Table, Avatar, Skeleton, Button, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
	getDoctorProfileService,
	searchDoctorService,
	getPatientUnderDoctorService
} from "../../../utils/services";
import { _notification } from "../../../utils/_helper";
import ProfileDetails from "../../common/ProfileDetails";
import PageStats from "../../common/PageStats";
import UpdateDoctorProfile from "./UpdateDoctorProfile";

const { Option } = Select;

const DoctorDetail = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [detail, setDetail] = useState(null);
	const [count, setCount] = useState(null);
	const [patients, setPatients] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [status, setStatus] = useState("examined");

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
	}, [props.match.params.id, refresh]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const params = { did: props.match.params.id };
				const res = await getPatientUnderDoctorService(status, params);
				setPatients(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [props.match.params.id, status]);

	const handleModal = value => {
		setShowModal(value);
	};

	// const handleQuery = async val => {
	// 	setIsLoading(true);
	// 	setSearch(val);
	// 	try {
	// 		let params = { search: val, status, did: props.match.params.id };
	// 		const res = await getPatientsService(params);
	// 		setPatients(res.data);
	// 		setIsLoading(false);
	// 	} catch (err) {
	// 		_notification("warning", "Error", err.message);
	// 		setIsLoading(false);
	// 	}
	// };

	const handleStatus = async val => {
		// setIsLoading(true);
		setStatus(val);
		// try {
		// 	let params = { did: props.match.params.id };
		// 	const res = await getPatientsService(params);
		// 	setPatients(res.data);
		// 	setIsLoading(false);
		// } catch (err) {
		// 	_notification("warning", "Error", err.message);
		// 	setIsLoading(false);
		// }
	};

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
										{detail.name && (
											<ProfileDetails
												label="Name"
												data={detail.name}
											/>
										)}
										{detail.empId && (
											<ProfileDetails
												label="Employee ID"
												data={detail.empId}
											/>
										)}
										{detail.age && (
											<ProfileDetails
												label="Age"
												data={detail.age}
											/>
										)}
										{detail.gender && (
											<ProfileDetails
												label="Gender"
												data={detail.gender}
											/>
										)}
										{detail.contact && (
											<ProfileDetails
												label="Contact No."
												data={detail.contact}
											/>
										)}
										{detail.email && (
											<ProfileDetails
												label="Email"
												data={detail.email}
											/>
										)}
										{detail.address && (
											<ProfileDetails
												label="Address"
												data={detail.address}
											/>
										)}
										{detail.hospital && (
											<ProfileDetails
												label="Hospital"
												data={detail.hospital}
											/>
										)}
										{detail.about && (
											<ProfileDetails
												label="About"
												data={detail.about}
											/>
										)}
									</>
								) : null}
								<Col span={24}>
									<Button
										type="primary"
										className="login-form-button"
										block
										onClick={() => handleModal(true)}
									>
										Edit Profile
									</Button>
								</Col>
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
										title="Unassigned"
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
						<Row>
							<Col span={24}>
								<div style={{ float: "right" }}>
									<Select
										placeholder="select status"
										defaultValue={status}
										onChange={handleStatus}
										className="input-field"
									>
										<Option value="examined">
											Examined
										</Option>
										<Option value="unassigned">
											Unassigned
										</Option>
										<Option value="declined">
											Declined
										</Option>
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
			<UpdateDoctorProfile
				visible={showModal}
				handleModal={handleModal}
				detail={detail}
				loading={isLoading}
				did={props.match.params.id}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
		</div>
	);
};

export default DoctorDetail;
