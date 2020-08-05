import React from "react";
import { Statistic } from "antd";

const PageStats = ({ title, value }) => {
	return (
		<Statistic
			title={title}
			value={value}
			valueStyle={{
				color: "#005ea5",
				fontWeight: 600
			}}
		/>
	);
};

export default PageStats;
