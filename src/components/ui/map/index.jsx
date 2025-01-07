import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Cookies from "js-cookie";

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
