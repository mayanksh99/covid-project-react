import React, { useState } from "react";
import { Modal, Skeleton, Table } from "antd";
import { useEffect } from "react";
import { getAvailableHospitalsService } from "./../../utils/services";
import { _notification } from "./../../utils/_helper";

const HospitalList = ({ isVisible, showModal }) => {
	const [isLoading, setIsLoading] = useState(null);
	const [hospitals, setHospitals] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getAvailableHospitalsService();

				setHospitals(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [isVisible]);

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Contact No.",
			dataIndex: "contact",
			key: "contact"
		},
		{
			title: "Beds",
			dataIndex: "availableBeds",
			key: "availableBeds"
		},

		{
			title: "Category",
			dataIndex: "cat",
			key: "cat"
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address"
		}
	];

	const data = hospitals
		? hospitals.map((hospital, id) => {
				const {
					_id,
					name,
					contact,
					address,
					category,
					availableBeds
				} = hospital;
				return {
					index: ++id,
					key: _id,
					name,
					contact,
					address,
					cat: category.toUpperCase(),
					availableBeds
				};
		  })
		: null;

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
				<Skeleton loading={isLoading} active>
					<Table
						loading={isLoading}
						columns={columns}
						dataSource={data}
						pagination={{ position: ["bottomCenter"] }}
					/>
				</Skeleton>
			</Modal>
		</>
	);
};

export default HospitalList;
