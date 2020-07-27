import React, { useState } from "react";
import AmbulanceAdminOption from "./AmbulanceAdminOption";
import { Card, Row, Col, Table, Tag, Select, Button } from "antd";
import AddAmbulance from "./AddAmbulance";
import PageTitle from "./../../common/PageTitle";

const { Option } = Select;

const AmbulanceAdminDetails = () => {
	const [showModal, setShowModal] = useState(false);

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
			title: "Vehicle Number",
			dataIndex: "vehiclenumber",
			key: "vehiclenumber"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "Status",
			render: status => (
				<>
					{status === "Available" && (
						<Tag color="green">{status}</Tag>
					)}
					{status === "On-duty" && <Tag color="orange">{status}</Tag>}
				</>
			)
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: action => (
				<>
					<Select placeholder="select status">
						<Option value="available">Available</Option>
						<Option value="on-duty">On duty</Option>
						<Option value="disable">Disable</Option>
						<Option value="remove">Remove</Option>
					</Select>
				</>
			)
		}
	];

	const data = [
		{
			key: "1",
			vehiclenumber: "UP 65 ET 5020",
			status: "Available",
			phone: "+912546325862",
			action: "Detail"
		},
		{
			key: "2",
			vehiclenumber: "UP 65 ET 5020",
			status: "On-duty",
			phone: "+912546325862",
			action: "Detail"
		},
		{
			key: "3",
			vehiclenumber: "UP 65 ET 5020",
			status: "Available",
			phone: "+912546325862",
			action: "Detail"
		}
	];

	return (
		<div>
			<PageTitle title="Ambulance" />

			<AmbulanceAdminOption />
			<div>
				<h3 style={{ fontSize: "16px" }}>
					Detail of Ambulance Administrator
				</h3>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} md={4} lg={6}>
						<Card>
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
								<span className="profile-data-label">Name</span>
								<br />
								<span className="profile-data">
									Mukesh Kumar
								</span>
							</p>
							<p>
								<span className="profile-data-label">
									Phone No.
								</span>
								<br />
								<span className="profile-data">
									+91-9654231546
								</span>
							</p>
							<p>
								<span className="profile-data-label">
									Area Pin
								</span>
								<br />
								<span className="profile-data">201206</span>
							</p>
							<p>
								<span className="profile-data-label">
									Email
								</span>
								<br />
								<p className="profile-data">
									mukesh.kum@gmail.com
								</p>
							</p>
							<p>
								<span className="profile-data-label">
									No. of Ambulances
								</span>
								<br />
								<span className="profile-data">40</span>
							</p>
							<Button
								type="primary"
								className="login-form-button"
								style={{ float: "right" }}
								onClick={() => handleModal(true)}
							>
								Add Ambulance
							</Button>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={20} lg={18}>
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
