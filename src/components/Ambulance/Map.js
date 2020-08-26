import React, { useState, useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import io from "socket.io-client";
import { Button } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/userContext";
import { EndPoint } from "../../utils/services";
mapboxgl.accessToken =
	"pk.eyJ1IjoicGFkbWFuc2gyMCIsImEiOiJja2U2cGNoN2cwNDduMnlybjlhNDNudm44In0.TEKnrC1ehJj6oGB3i9Opeg";

let bounds = [
	[76.115807, 28.044923], // Southwest coordinates
	[78.508601, 29.310049] // Northeast coordinates
];

let socket;
const Map = props => {
	const Data = useContext(AuthContext);
	const [lng, setLng] = useState(77.498709);
	const [lat, setLat] = useState(28.752535);
	const [zoom, setZoom] = useState(15);
	const [mapState, setMapState] = useState(null);
	const mapRef = useRef();

	useEffect(() => {
		socket = io(EndPoint, { transports: ["websocket", "polling"] });
		socket.on("AMBULANCE_LOCATIONS_FOR_MAP", res => {
			console.log(res);
		});
		//socket.emit("ambulanceLocationsForMap", { token: Data.token,did:,aoid:props.data[0].operator._id });
		// return () => {
		// 	socket.off();
		// };

		const map = new mapboxgl.Map({
			container: mapRef.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lng, lat],
			zoom: zoom,
			maxBounds: bounds
		});

		setMapState(map);

		map.addControl(new mapboxgl.FullscreenControl(), "top-left");
		map.addControl(new mapboxgl.NavigationControl(), "top-left");

		map.on("move", () => {
			setLng(map.getCenter().lng.toFixed(4));
			setLat(map.getCenter().lat.toFixed(4));
			setZoom(map.getZoom().toFixed(2));
		});

		let popup = new mapboxgl.Popup({ offset: 25 }).setText(
			"Final Destination"
		);

		let geojson = {
			type: "FeatureCollection",
			features: [
				{
					geometry: {
						type: "Point",
						coordinates: [77.498709, 28.752535]
					}
				}
			]
		};

		geojson.features.forEach(function (marker) {
			new mapboxgl.Marker({ color: "red", scale: 1.5 })
				.setLngLat(marker.geometry.coordinates)
				.setPopup(popup)
				.addTo(map);
		});

		new mapboxgl.Marker({ color: "#0055ff", scale: 1 })
			.setLngLat([77.443817, 28.699455])
			.setPopup(popup)
			.addTo(map);

		map.on("load", function () {
			map.addSource("route", {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "LineString",
						coordinates: [
							[77.443817, 28.699455],
							[77.444438, 28.69986],
							[77.444655, 28.699841],
							[77.445588, 28.699549],
							[77.445588, 28.699464],
							[77.444816, 28.698683],
							[77.444924, 28.698514],
							[77.447585, 28.701337],
							[77.450085, 28.703925],
							[77.453432, 28.707426],
							[77.457219, 28.711312],
							[77.473804, 28.729332],
							[77.477677, 28.733735],
							[77.4836, 28.742633],
							[77.484662, 28.744039],
							[77.485995, 28.745311],
							[77.490796, 28.749116],
							[77.493146, 28.751251],
							[77.495829, 28.754037],
							[77.495935, 28.754057],
							[77.498709, 28.752535]
						]
					}
				}
			});
			map.addLayer({
				id: "route",
				type: "line",
				source: "route",
				layout: {
					"line-join": "round",
					"line-cap": "round"
				},
				paint: {
					"line-color": "#0055ff",
					"line-width": 8,
					"line-opacity": 0.8
				}
			});
		});
		return () => {
			socket.off();
		};
	}, [Data.token]);

	return (
		<>
			<div
				ref={mapRef}
				style={{
					position: "absolute",
					top: "0",
					right: "0",
					left: "0",
					bottom: "0",
					height: "100%",
					width: "100%"
				}}
			></div>
			<div>
				<Button
					type="primary"
					onClick={() =>
						mapState.flyTo({
							center: [77.498709, 28.752535],
							essential: true
						})
					}
					style={{
						position: "absolute",
						background: "white",
						border: "none",
						borderRadius: "5px",
						WebkitBoxShadow: "0px 0px 5px rgb(170,170,170)",
						boxShadow: "0px 0px 5px rgb(170,170,170)",
						top: "9px",
						left: "150px",
						height: "30px",
						width: "90px",
						color: "black"
					}}
				>
					<AimOutlined
						style={{
							marginLeft: "-8px",
							marginTop: "2px",
							fontWeight: "700",
							fontSize: "18px",
							color: "black"
						}}
					/>
					Finish
				</Button>
				<Button
					type="primary"
					onClick={() =>
						mapState.flyTo({
							center: [77.443817, 28.699455],
							essential: true
						})
					}
					style={{
						position: "absolute",
						background: "white",
						border: "none",
						borderRadius: "5px",
						WebkitBoxShadow: "0px 0px 5px rgb(170,170,170)",
						boxShadow: "0px 0px 5px rgb(170,170,170)",
						top: "9px",
						left: "50px",
						height: "30px",
						width: "90px",
						color: "black"
					}}
				>
					<AimOutlined
						style={{
							marginLeft: "-8px",
							marginTop: "2px",
							fontWeight: "700",
							fontSize: "18px",
							color: "black"
						}}
					/>
					Start
				</Button>
			</div>
		</>
	);
};

export default Map;
