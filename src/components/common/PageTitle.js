import React from "react";
import { PageHeader } from "antd";
import "./style.css";
const PageTitle = ({ title }) => {
	return (
		<PageHeader
			className="site-page-header"
			title={title}
			style={{
				padding: 0,
				marginTop: 0,
				color: "#008db9",
				marginBottom: 16,
				backgroundImage:
					"linear-gradient(0deg,rgba(0, 0, 0, 0.1) 0,rgba(0, 0, 0, 0.1) 30%,transparent 30%,transparent)",
				width: "fit-content",
				height: 30,
			}}
		/>
	);
};

export default PageTitle;
