import React, { useState } from "react";
import { Row, Col, Statistic, Button } from "antd";
import AddHospitalAdmin from "./AddHospitalAdmin";

const HospitalAdminOption = ({ refresh, setRefresh }) => {
	const [showModal, setShowModal] = useState(false);

	const handleModal = value => {
		setShowModal(value);
	};

	return (
		<div>
			<Row gutter={[16, 16]}>
				<Col xl={20} lg={20} md={20} sm={24} xs={24}>
					<Row gutter={[16, 16]}>
						<Col xl={24} lg={24} md={24} sm={24} xs={12}>
							<Row gutter={[16, 16]}>
								<Col xl={6} lg={6} md={6} sm={6} xs={24}>
									<Statistic
										title="Total beds"
										value={113}
										valueStyle={{
											color: "#005ea5",
											fontWeight: 600
										}}
									/>
								</Col>
								<Col xl={6} lg={6} md={6} sm={6} xs={24}>
									<Statistic
										title="Total L1 beds"
										value={13}
										valueStyle={{
											color: "#005ea5",
											fontWeight: 600
										}}
									/>
								</Col>
								<Col xl={6} lg={6} md={6} sm={6} xs={24}>
									<Statistic
										title="Total L2 beds"
										value={13}
										valueStyle={{
											color: "#005ea5",
											fontWeight: 600
										}}
									/>
								</Col>
								<Col xl={6} lg={6} md={6} sm={6} xs={24}>
									<Statistic
										title="Total L3 beds"
										value={13}
										valueStyle={{
											color: "#005ea5",
											fontWeight: 600
										}}
									/>
								</Col>
							</Row>
						</Col>
						<Col xl={24} lg={24} md={24} sm={24} xs={12}>
							<Row gutter={[16, 16]}>
								<Col xl={6} lg={6} md={6} sm={6} xs={24}>
									<Statistic
										title="Available beds"
										value={69}
										valueStyle={{
											color: "#005ea5",
											fontWeight: 600
										}}
									/>
								</Col>
								<Col xl={6} lg={6} md={6} sm={6} xs={24}>
									<Statistic
										title="Total L1 beds"
										value={14}
										valueStyle={{
											color: "#005ea5",
											fontWeight: 600
										}}
									/>
								</Col>
								<Col xl={6} lg={6} md={6} sm={6} xs={24}>
									<Statistic
										title="Total L2 beds"
										value={13}
										valueStyle={{
											color: "#005ea5",
											fontWeight: 600
										}}
									/>
								</Col>
								<Col xl={6} lg={6} md={6} sm={6} xs={24}>
									<Statistic
										title="Total L3 beds"
										value={21}
										valueStyle={{
											color: "#005ea5",
											fontWeight: 600
										}}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col xl={4} lg={4} md={4} sm={24} xs={24}>
					<div>
						<Button
							type="primary"
							className="login-form-button"
							onClick={handleModal}
						>
							Add Hospital
						</Button>
					</div>
				</Col>
			</Row>
			<AddHospitalAdmin
				visible={showModal}
				handleModal={handleModal}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
		</div>
	);
};

export default HospitalAdminOption;
