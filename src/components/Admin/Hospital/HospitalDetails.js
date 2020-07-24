import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Statistic, Form, Input } from "antd";
import { BedSvg } from "./../../../utils/_routes";
import UpdatePatientReport from "./UpdatePatientReport";
import PageTitle from "./../../common/PageTitle";
import { CheckCircleFilled } from "@ant-design/icons";

const HospitalDetails = () => {
	const [showBedChange, setShowBedChange] = useState(false);
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

								<p>
									<span className="profile-data-label">
										Name
									</span>
									<br />
									<span className="profile-data">
										ITS Hospital
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
										Address
									</span>
									<br />
									<span className="profile-data">
										KIET Group of Institution
									</span>
								</p>
								<p>
									<span className="profile-data-label">
										Email
									</span>
									<br />
									<span className="profile-data">
										its.hospital@gmail.com
									</span>
								</p>
								<p>
									<span className="profile-data-label">
										Category
									</span>
									<br />
									<span className="profile-data">L2</span>
								</p>
								<p>
									<span className="profile-data-label">
										Total beds
									</span>
									<br />
									<span className="profile-data">1051</span>
								</p>
								<Col span={24}>
									<Button
										type="primary"
										className="login-form-button"
										block
										onClick={() => setShowBedChange(true)}
									>
										Change Total Beds
									</Button>
								</Col>
							</div>
							<br />

							{showBedChange ? (
								<Form
									layout="vertical"
									name="normal_login"
									className="login-form"
									initialValues={{ remember: true }}
								>
									<Row gutter={[16, 16]}>
										<Col span={12}>
											<Form.Item
												name="name"
												rules={[
													{
														required: true,
														message:
															"Please input name!"
													}
												]}
											>
												<Input
													className="input-field mt-10"
													placeholder="Total beds"
													prefix={<BedSvg />}
												/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item>
												<Button
													type="primary"
													htmlType="submit"
													className="login-form-button"
													block
												>
													Submit
												</Button>
											</Form.Item>
										</Col>
									</Row>
								</Form>
							) : null}
						</Card>
					</Col>
					<Col xs={24} sm={24} md={20} lg={18}>
						<Row gutter={[16, 16]}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<Statistic
									title="Available bed"
									value={113}
									valueStyle={{
										color: "#005ea5",
										fontWeight: 600
									}}
								/>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<Statistic
									title="Occupied bed"
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
