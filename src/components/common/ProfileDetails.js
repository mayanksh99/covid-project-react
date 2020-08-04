import React from "react";

const ProfileDetails = ({ label, data }) => {
	return (
		<>
			<p>
				<span className="profile-data-label">{label}</span>
				<br />
				<span className="profile-data">{data}</span>
			</p>
		</>
	);
};

export default ProfileDetails;
