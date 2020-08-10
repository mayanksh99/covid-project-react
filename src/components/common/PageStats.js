import React from "react";
import { Statistic } from "antd";

const PageStats = ({ title, value, ...rest }) => {
	return (
		<Statistic
			{...rest}
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
