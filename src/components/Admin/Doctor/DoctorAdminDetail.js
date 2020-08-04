import React from "react";
import PageTitle from "../../common/PageTitle";
import DoctorAdminOption from "./DoctorAdminOption";
import { Row, Col, Card, Table, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const DoctorDetail = () => {
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
			<PageTitle title="Doctor" />
			<div>
				<h3 style={{ fontSize: "16px" }}>Detail of Doctor</h3>
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
							<div style={{ textAlign: "center" }}>
								<Avatar size={84} icon={<UserOutlined />} />
							</div>
							<br />
							<p>
								<span className="profile-data-label">Name</span>
								<br />
								<span className="profile-data">
									Dr. Kishore Kumar
								</span>
							</p>
							<p>
								<span className="profile-data-label">Age</span>
								<br />
								<span className="profile-data">56</span>
							</p>
							<p>
								<span className="profile-data-label">
									Gender
								</span>
								<br />
								<span className="profile-data">Male</span>
							</p>
							<p>
								<span className="profile-data-label">
									Contact No.
								</span>
								<br />
								<span className="profile-data">
									+91-9654231546
								</span>
							</p>
							<p>
								<span className="profile-data-label">
									Email
								</span>
								<br />
								<span className="profile-data">
									kishore@gmail.com
								</span>
							</p>
							<p>
								<span className="profile-data-label">
									Address
								</span>
								<br />
								<span className="profile-data">
									270, Vasant Kunj, Delhi
								</span>
							</p>
							<p>
								<span className="profile-data-label">
									Hospital
								</span>
								<br />
								<span className="profile-data">
									ITS Hospital
								</span>
							</p>
							{/* <Button
								type="primary"
								className="login-form-button"
								style={{ float: "right" }}
								// onClick={() => handleModal(true)}
							>
								
							</Button> */}
						</Card>
					</Col>
					<Col xs={24} sm={24} md={20} lg={18}>
						{/* <Row gutter={[16, 16]}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<Statistic
									title="Total Examine patients"
									value={113}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<Statistic
									title=""
									value={13}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<Statistic
									title="Reserved bed"
									value={13}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
						</Row> */}
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
			{/* <AddAmbulance visible={showModal} handleModal={handleModal} /> */}
		</div>
	);
};

export default DoctorDetail;
