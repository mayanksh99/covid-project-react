import React from "react";
import { Table, Statistic } from "antd";
import AttendPatient from "./AttendPatient";
import PageTitle from "./../common/PageTitle";

const PatientTable = ({
	isLoading,
	tableColumns,
	data,
	isVisible,
	showModal,
	patientData,
	count,
	pageTitle,
	statTitle,
	tableTitle,
	refresh,
	setRefresh,
	parent,
	modalLoading
}) => {
	return (
		<div>
			<PageTitle title={pageTitle} />
			<Statistic
				title={statTitle}
				value={count}
				valueStyle={{
					fontWeight: 900,
					fontSize: "2em",
					color: "#005ea5"
				}}
			/>
			<Table
				title={() => tableTitle}
				showHeader={true}
				loading={isLoading}
				columns={tableColumns}
				dataSource={data}
				pagination={{ position: ["bottomCenter"] }}
			/>
			<AttendPatient
				isVisible={isVisible}
				showModal={showModal}
				patientData={patientData}
				refresh={refresh}
				setRefresh={setRefresh}
				parent={parent}
				modalLoading={modalLoading}
			/>
		</div>
	);
};

export default PatientTable;
