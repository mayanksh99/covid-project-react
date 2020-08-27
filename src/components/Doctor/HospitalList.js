import React, { useState } from "react";
import { Modal, Skeleton } from "antd";
import { useEffect } from "react";
import { getHospitalsService } from "./../../utils/services";
import { _notification } from "./../../utils/_helper";

const HospitalList = ({ isVisible, showModal }) => {
	const [isLoading, setIsLoading] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getHospitalsService();
				console.log(res);
				// setAdmins(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [isVisible]);

	return (
		<>
			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Hospitals List
					</h3>
				}
				visible={isVisible}
				centered
				onCancel={() => {
					showModal(!isVisible);
				}}
				width={800}
				footer={null}
			>
				<Skeleton loading={isLoading} active></Skeleton>
			</Modal>
		</>
	);
};

export default HospitalList;
