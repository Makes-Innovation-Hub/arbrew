import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const MapComponent = ({ lat, lon }) => {
  if (isNaN(lat) || isNaN(lon)) {
    console.error("Invalid latitude or longitude:", lat, lon);
    return null;
  }

  // Configure custom marker icon
  let customIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div>
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ width: "100%", height: "580px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]} icon={customIcon}>
          <Popup>Your location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
