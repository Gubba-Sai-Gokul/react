import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCityContext } from "../contexts/CityContextProvider";
import { useEffect, useState } from "react";
// import { useEffect,useState } from "react";

export default function Map() {
  const [searchParams] = useSearchParams();
  const [position, setPosition] = useState([10.13, 30.16]);
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  // const position = [lat, lng];
  // console.log("center postion ", position)

  const { cityData } = useCityContext();

  useEffect(
    function () {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng],
  );

  console.log("map ", cityData);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {console.log("cityData ", cityData)}
        {cityData.map((city) => (
          <Marker
            position={[city?.position?.lat, city?.position?.lng]}
            key={city?.id}
          >
            {console.log(city?.id)}
            <Popup>{city?.notes}</Popup>
          </Marker>
        ))}
        <CenterMap position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function CenterMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const Navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      Navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
