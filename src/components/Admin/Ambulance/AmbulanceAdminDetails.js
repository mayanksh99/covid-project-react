import React, { useState, useEffect } from "react";
import AmbulanceAdminOption from "./AmbulanceAdminOption";
import {
	Card,
	Row,
	Col,
	Table,
	Tag,
	Select,
	Button,
	Statistic,
	Skeleton
} from "antd";
import AddAmbulance from "./AddAmbulance";
import PageTitle from "./../../common/PageTitle";
import { _notification } from "../../../utils/_helper";
import {
	getOperatorAmbService,
	searchAmbOperatorService
} from "../../../utils/services";

const { Option } = Select;

const AmbulanceAdminDetails = props => {
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [ambulances, setAmbulances] = useState(null);
	const [operator, setOperator] = useState(null);
	const [count, setCount] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				let params = { aoid: props.match.params.id };
				const res = await getOperatorAmbService(params);
				setAmbulances(res.data.ambulances);
				setCount(res.data.ambulanceCount);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
				setIsLoading(false);
			}
		})();
	}, [props.match.params.id]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				let params = { aoid: props.match.params.id };
				const res = await searchAmbOperatorService(params);
				console.log(res.data.operators[0]);
				setOperator(res.data.operators[0]);
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
			title: "Vehicle No.",
			dataIndex: "vehicleNo",
			key: "vehicleNo"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "Status",
			render: status => (
				<>
					{status === "available" && (
						<Tag color="green">{status}</Tag>
					)}
					{status === "onDuty" && <Tag color="orange">{status}</Tag>}
				</>
			)
		},
		{
			title: "Driver Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Phone",
			dataIndex: "contact",
			key: "contact"
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: action => (
				<>
					<Select
						placeholder="select status"
						defaultValue={action[1]}
					>
						<Option value="available">Available</Option>
						<Option value="onDuty">On duty</Option>
						<Option value="disable">Disable</Option>
					</Select>
				</>
			)
		}
	];

	const data = ambulances
		? ambulances.map((ambulance, id) => {
				const { _id, vehicleNo, status, pincode, driver } = ambulance;
				const { contact, name } = driver;
				return {
					key: _id,
					vehicleNo,
					status,
					pincode,
					contact,
					name,
					action: [_id, status]
				};
		  })
		: null;

	return (
		<div>
			<PageTitle title="Ambulance" />

			<AmbulanceAdminOption />
			<div>
				<h3 style={{ fontSize: "16px" }}>
					Detail of Ambulance Operator
				</h3>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={4} lg={6}>
						<Card>
							<Skeleton loading={isLoading} active>
								{operator ? (
									<>
										<p
											style={{
												fontSize: "18px",
												color: "#008DB9",
												fontWeight: 700
											}}
										>
											Personal Information
										</p>
										<p>
											<span className="profile-data-label">
												Name
											</span>
											<br />
											<span className="profile-data">
												{operator.name}
											</span>
										</p>
										<p>
											<span className="profile-data-label">
												Phone No.
											</span>
											<br />
											<span className="profile-data">
												+91-{operator.contact}
											</span>
										</p>
										<p>
											<span className="profile-data-label">
												Email
											</span>
											<br />
											<span className="profile-data">
												{operator.email}
											</span>
										</p>
									</>
								) : null}

								<p>
									<span className="profile-data-label">
										No. of Ambulances
									</span>
									<br />
									<span className="profile-data">
										{count
											? count.available +
											  count.disabled +
											  count.onDuty
											: 0}
									</span>
								</p>
								<Button
									type="primary"
									className="login-form-button"
									style={{ float: "right" }}
									onClick={() => handleModal(true)}
								>
									Add Ambulance
								</Button>
							</Skeleton>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={20} lg={18}>
						<Row>
							<Col xl={6} lg={6} md={12} sm={12} xs={24}>
								<Statistic
									title="Available"
									value={count ? count.available : 0}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
							<Col xl={6} lg={6} md={12} sm={12} xs={24}>
								<Statistic
									title="On duty"
									value={count ? count.onDuty : 0}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
							<Col xl={6} lg={6} md={12} sm={12} xs={24}>
								<Statistic
									title="Disable"
									value={count ? count.disabled : 0}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
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
								List of Ambulances
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
			<AddAmbulance visible={showModal} handleModal={handleModal} />
		</div>
	);
};

export default AmbulanceAdminDetails;
