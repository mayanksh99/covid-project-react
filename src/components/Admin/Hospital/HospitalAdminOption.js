import React, { useState } from "react";
import { Row, Col, Button, Skeleton } from "antd";
import AddHospital from "./AddHospital";
import PageStats from "../../common/PageStats";

const HospitalAdminOption = ({ refresh, setRefresh, stats, isLoading }) => {
	const [showModal, setShowModal] = useState(false);

	const handleModal = value => {
		setShowModal(value);
	};

	return (
		<>
			<Skeleton loading={isLoading} active>
				<Row gutter={[16, 16]}>
					{stats ? (
						<Col xl={20} lg={20} md={20} sm={24} xs={24}>
							<Row gutter={[16, 16]}>
								<Col xl={24} lg={24} md={24} sm={24} xs={12}>
									<Row gutter={[16, 16]}>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Total beds"
												value={
													stats.total_l1 +
													stats.total_l2 +
													stats.total_l3
												}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Total L1 beds"
												value={stats.total_l1}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Total L2 beds"
												value={stats.total_l2}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Total L3 beds"
												value={stats.total_l3}
											/>
										</Col>
									</Row>
								</Col>
								<Col xl={24} lg={24} md={24} sm={24} xs={12}>
									<Row gutter={[16, 16]}>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Available beds"
												value={
													stats.available_l1 +
													stats.available_l2 +
													stats.available_l3
												}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Available L1 beds"
												value={stats.available_l1}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Available L2 beds"
												value={stats.available_l2}
											/>
										</Col>
										<Col
											xl={6}
											lg={6}
											md={6}
											sm={6}
											xs={24}
										>
											<PageStats
												title="Available L3 beds"
												value={stats.available_l3}
											/>
										</Col>
									</Row>
								</Col>
							</Row>
						</Col>
					) : null}
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
			</Skeleton>
			<AddHospital
				visible={showModal}
				handleModal={handleModal}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
		</>
	);
};

export default HospitalAdminOption;
