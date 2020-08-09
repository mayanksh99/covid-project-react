import React from "react";
import { notification } from "antd";
import { Row, Col, Button, Modal, Table } from "antd";
import jwt from "jwt-decode";

export const _notification = (type, title, description) => {
	return notification[type]({
		message: title,
		description,
		duration: 2
	});
};

export const getRole = () => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	let decode = jwt(AUTH_TOKEN.token);
	return decode;
};

const AddBulkResponseModal = ({
	isResultsVisible,
	closeResults,
	bulkUploadDetails,
	tableColumns,
	data,
	title,
	whatIsBeingAdded
}) => {
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
						{title}
					</h3>
				}
				visible={isResultsVisible}
				onCancel={closeResults}
				footer={null}
				centered={true}
			>
				<Row>
					<Col span={12}>
						{whatIsBeingAdded} added :{" "}
						{`${bulkUploadDetails.totalAdded}`}
					</Col>
					<Col span={12}>
						{whatIsBeingAdded} failed :{" "}
						{`${bulkUploadDetails.totalFailed}`}
					</Col>
				</Row>
				<Table
					bordered={true}
					columns={tableColumns}
					dataSource={data ? data : null}
					pagination={{ position: ["bottomCenter"], pageSize: "7" }}
				></Table>
				<Button
					type="primary"
					className="login-form-button"
					onClick={closeResults}
				>
					Ok
				</Button>
			</Modal>
		</>
	);
};

export default AddBulkResponseModal;
