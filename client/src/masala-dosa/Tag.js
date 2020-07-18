import styled from "styled-components";

const Tag = styled.span`
	padding: 0.15em 4px;
	background: ${({ type }) => {
		switch (type) {
			case "primary":
				return "#4285f4";
			case "info":
				return "#0F9D58";
			case "danger":
				return "#DB4437";
			case "dark":
				return "#222222";
			default:
				return "transparent";
		}
	}};
	color: #fff;
	font-size: 12px;
	font-weight: 700;
	transition: 0.4 border linear;
	box-sizing: border-box;
	border-radius: 2px !important;
	line-height: 16px;
	box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);
	text-overflow: ellipsis;
	&:hover {
		cursor: pointer;
	}
`;

export default Tag;
