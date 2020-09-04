import React, { useState, useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import io from "socket.io-client";
import { _notification } from "../../utils/_helper";
import { Button } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/userContext";
import { EndPoint } from "../../utils/services";
mapboxgl.accessToken =
	"pk.eyJ1IjoicGFkbWFuc2gyMCIsImEiOiJja2U2cGNoN2cwNDduMnlybjlhNDNudm44In0.TEKnrC1ehJj6oGB3i9Opeg";

// let bounds = [
// 	[76.115807, 28.044923], // Southwest coordinates
// 	[78.508601, 29.310049] // Northeast coordinates
// ];

let popupFinal = new mapboxgl.Popup({ offset: 25 }).setText(
	"Final Destination"
);

let popupStart = new mapboxgl.Popup({ offset: 25 }).setText(
	"Start Destination"
);

let socket;
const Map = props => {
	const Data = useContext(AuthContext);
	const [lng, setLng] = useState(77.498709);
	const [lat, setLat] = useState(28.752535);
	const [mapState, setMapState] = useState(null);
	const [coordinates, setCoordinates] = useState(null);
	const mapRef = useRef();

	useEffect(() => {
		socket = io(EndPoint, { transports: ["websocket", "polling"] });
		socket.on("AMBULANCE_LOCATIONS_FOR_MAP", res => {
			console.log(res);
			if (res.location !== undefined) {
				setLng(res.location.coordinates[0][0]);
				setLat(res.location.coordinates[0][1]);
				setCoordinates(res.location.coordinates);
			} else {
				_notification("error", "Error", "Location not found !");
				props.setShowMap(false);
			}
		});
		socket.emit("ambulanceLocationsForMap", {
			token: Data.token,
			did: props.did,
			aoid: props.data.operator._id
		});

		const map = new mapboxgl.Map({
			container: mapRef.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [77.498709, 28.752535],
			zoom: 15
			// maxBounds: bounds
		});

		map.addControl(new mapboxgl.FullscreenControl(), "top-left");
		map.addControl(new mapboxgl.NavigationControl(), "top-left");

		setMapState(map);

		return () => {
			socket.off();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Data.token]);

	//console.log(coordinates ? coordinates[0][0] : null)

	useEffect(() => {
		if (mapState !== null) {
			// const map = new mapboxgl.Map({
			// 	container: mapRef.current,
			// 	style: "mapbox://styles/mapbox/streets-v11",
			// 	center: [77.498709, 28.752535],
			// 	zoom: 15,
			// 	maxBounds: bounds
			// });

			mapState.flyTo({
				center: [lng, lat],
				essential: true
			});

			new mapboxgl.Marker({ color: "red", scale: 1.5 })
				.setLngLat([lng, lat])
				.setPopup(popupFinal)
				.addTo(mapState);

			new mapboxgl.Marker({ color: "#0055ff", scale: 1 })
				.setLngLat(coordinates[coordinates.length - 1])
				.setPopup(popupStart)
				.addTo(mapState);

			// mapState.on("load", function () {
			mapState.addSource("route", {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "LineString",
						// coordinates: [
						// 	[77.443817, 28.699455],
						// 	[77.444438, 28.69986],
						// 	[77.444655, 28.699841],
						// 	[77.445588, 28.699549],
						// 	[77.445588, 28.699464],
						// 	[77.444816, 28.698683],
						// 	[77.444924, 28.698514],
						// 	[77.447585, 28.701337],
						// 	[77.450085, 28.703925],
						// 	[77.453432, 28.707426],
						// 	[77.457219, 28.711312],
						// 	[77.473804, 28.729332],
						// 	[77.477677, 28.733735],
						// 	[77.4836, 28.742633],
						// 	[77.484662, 28.744039],
						// 	[77.485995, 28.745311],
						// 	[77.490796, 28.749116],
						// 	[77.493146, 28.751251],
						// 	[77.495829, 28.754037],
						// 	[77.495935, 28.754057],
						// 	[77.498709, 28.752535]
						// ]
						coordinates: coordinates
					}
				}
			});

			mapState.addLayer({
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
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coordinates]);

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
							center: coordinates ? coordinates[0] : null,
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
							center: coordinates
								? coordinates[coordinates.length - 1]
								: null,
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
