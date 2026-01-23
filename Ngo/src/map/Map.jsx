import "./MapMarker.js"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({position}) {
  if(!position){
    return null;
  }
    return ( <>
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>You are here 📍</Popup>
      </Marker>
    </MapContainer>
    
    </> );
}

export default Map;