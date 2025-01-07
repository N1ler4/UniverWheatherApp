import React, { useEffect, useState } from "react";
import Header from "../header";
import http from "../../config/http";
import "./style.css"

export default function index() {
  const [coordinates, setCoordinates] = useState(null); // Для хранения координат
  const [data, setData] = useState(null); // Для данных с API
  console.log(data);
  const [error, setError] = useState(null); // Для сообщений об ошибке

  // Функция для получения данных с API
  const getData = async (coords) => {
    try {
      const response = await http(coords); // HTTP-запрос с координатами
      setData(response.data); // Установка данных в состоянии
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
      setError("Не удалось загрузить данные. Попробуйте позже.");
    }
  };

  // Получение геолокации
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Ваш браузер не поддерживает геолокацию");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = `${longitude},${latitude}`; // Форматируем координаты
        setCoordinates(coords); // Устанавливаем координаты
        getData(coords); // Запрашиваем данные
      },
      (err) => {
        console.error("Ошибка геолокации:", err);
        setError(`Не удалось определить ваше местоположение: ${err.message}`);
      }
    );
  }, []);
  if (!data || !data.list || data.list.length === 0) {
    return <p>Нет данных для отображения.</p>;
  }
  return (
    <>
      <Header />
      <div className="forecast-container">
        <h1 className="title">Прогноз на месяц</h1>
        <div className="grid-container">
          {data.list.map((day, index) => (
            <div className="grid-item" key={index}>
              <div className="temp">{Math.round(day.temp.day - 273.15)}°C</div>
              <div className="weather-icon">
                <img
                  className="w-[80px] h-[80px]"  
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
              </div>
              <div className="date">
                {new Date(day.date).toLocaleDateString("ru-RU", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
