import React, { useState, useEffect } from "react";
import { Row, Statistic, Col, Button } from "antd";
import AddAmbulanceOperator from "./AddAmbulanceOperator";
import { _notification } from "../../../utils/_helper";
import { getAmbulanceService } from "../../../utils/services";

const AmbulanceAdminOption = ({ refresh, setRefresh }) => {
	const [showModal, setshowModal] = useState(false);
	const [count, setCount] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await getAmbulanceService();
				setCount(res.data.ambulanceCount);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	const handelModal = value => {
		setshowModal(value);
	};
	return (
		<div style={{ marginTop: "16px", marginBottom: "14px" }}>
			<Row>
				<Col xl={5} lg={4} md={12} sm={12} xs={24}>
					<Statistic
						title="Total"
						value={
							count
								? count.available +
								  count.onDuty +
								  count.disabled
								: 0
						}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				<Col xl={5} lg={4} md={12} sm={12} xs={24}>
					<Statistic
						title="Available"
						value={count ? count.available : 0}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				<Col xl={5} lg={4} md={12} sm={12} xs={24}>
					<Statistic
						title="On duty"
						value={count ? count.onDuty : 0}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				<Col xl={5} lg={4} md={12} sm={12} xs={24}>
					<Statistic
						title="Disable"
						value={count ? count.disabled : 0}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				<Col xl={4} lg={4} md={24} sm={24} xs={24}>
					<Button
						type="primary"
						className="login-form-button"
						onClick={() => handelModal(true)}
					>
						Add Operator
					</Button>
				</Col>
			</Row>
			<AddAmbulanceOperator
				visible={showModal}
				handleModal={handelModal}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
		</div>
	);
};

export default AmbulanceAdminOption;
