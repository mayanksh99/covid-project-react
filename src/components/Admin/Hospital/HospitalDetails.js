import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Table, Skeleton } from "antd";
import UpdatePatientReport from "./UpdatePatientReport";
import PageTitle from "./../../common/PageTitle";
import { _notification } from "../../../utils/_helper";
import { getHospitalByParamsServices } from "../../../utils/services";
import PageStats from "../../common/PageStats";
import ProfileDetails from "../../common/ProfileDetails";

const HospitalDetails = props => {
	const [showBedChange, setShowBedChange] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [details, setDetails] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				let params = { hid: props.match.params.id };
				const res = await getHospitalByParamsServices(params);
				setDetails(res.data.hospitals[0]);
				// setCount(res.data.ambulanceCount);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
				setIsLoading(false);
			}
		})();
	}, [props.match.params.id]);

	const handleModal = value => {
		setShowModal(value);
	};

	const columns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Id",
			dataIndex: "id",
			key: "id"
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
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<>
					<Button
						type="primary"
						className="login-form-button ambulance-button"
						onClick={() => handleModal(true)}
					>
						Update Report
					</Button>
				</>
			)
		}
	];

	const data = [
		{
			key: "1",
			id: "P2548535",
			name: "Corona Pidit",
			gender: "Male",
			age: 30,
			action: "Detail"
		},
		{
			key: "2",
			id: "P2548535",
			name: "Corona Pidit",
			gender: "Female",
			age: 30,
			action: "Detail"
		},
		{
			key: "3",
			id: "P2548535",
			name: "Corona Pidit",
			gender: "Male",
			age: 30,
			action: "Detail"
		}
	];
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
													setShowBedChange(true)
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
								/>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
			<UpdatePatientReport
				visible={showModal}
				handleModal={handleModal}
			/>
		</div>
	);
};

export default HospitalDetails;
