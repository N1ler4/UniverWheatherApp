import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Cookies from "js-cookie";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const AutoLocationMap = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (position) {
      Cookies.set("latitude", position[0]);
      Cookies.set("longitude", position[1]);
    }
  }, [position]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Ошибка при получении местоположения:", error);
        }
      );
    } else {
      console.error("Геолокация недоступна в этом браузере.");
    }
  }, []);

  return (
    <div>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "320px", width: "500px", borderRadius: "30px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} />
        </MapContainer>
      ) : (
        <p className="text-center">Определение местоположения...</p>
      )}
    </div>
  );
};

export default AutoLocationMap;
