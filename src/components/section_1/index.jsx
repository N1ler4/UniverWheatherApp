import React, { useState, useEffect } from "react";
import Map from "../ui/map";
import Cookies from "js-cookie";

export default function Index(data) {
  const [city, setCity] = useState(""); // Для города и страны
  const [weather, setWeather] = useState(null); // Для данных погоды
  const [time, setTime] = useState("");
  const weatherIcons = {
    "01d": "☀️", // Солнечно днем
    "01n": "🌑", // Солнечно ночью
    "02d": "🌤️", // Малооблачно днем
    "02n": "☁️", // Малооблачно ночью
    "03d": "☁️", // Облачно
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️", // Дождь
    "09n": "🌧️",
    "10d": "🌦️", // Дождь с солнцем
    "10n": "🌦️",
    "11d": "⛈️", // Гроза
    "11n": "⛈️",
    "13d": "❄️", // Снег
    "13n": "❄️",
    "50d": "🌫️", // Туман
    "50n": "🌫️",
  };

  // Функция для получения местоположения
  const fetchLocation = async () => {
    const latitude = Cookies.get("latitude");
    const longitude = Cookies.get("longitude");

    if (!latitude || !longitude) {
      console.error("Координаты отсутствуют в cookies");
      return;
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const locationData = await response.json();

      const cityName =
        locationData.address.city ||
        locationData.address.town ||
        locationData.address.village;
      const country = locationData.address.country;

      setCity(`Город: ${cityName}, Страна: ${country}`);
    } catch (error) {
      console.error("Ошибка при запросе к Nominatim:", error);
    }
  };

  // Функция для получения данных о погоде
  const getWeatherData = () => {
    if (data?.data?.list && data.data.list.length > 0) {
      const weatherData = data.data.list[0];
      setWeather(weatherData);
    } else {
      console.error("Данные для weather отсутствуют или пусты");
    }
  };

  // Используем useEffect для выполнения fetch только один раз
  useEffect(() => {
    fetchLocation();
    getWeatherData();
  }, []); // Пустой массив зависимостей гарантирует, что код выполнится только один раз
  useEffect(() => {
    // Функция для обновления времени
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    // Установка интервала для обновления каждую секунду
    const interval = setInterval(updateTime, 1000);

    // Начальное обновление времени
    updateTime();

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full container mx-auto">
      <div className="flex justify-around gap-[50px] py-[20px]">
        {/* Блок с информацией о местоположении */}
        <div className="w-[500px] h-[320px] bg-white rounded-[50px] border-2 border-[#444] items-start px-8 flex flex-col py-[20px]">
          <div className="w-[100%] h-[40px] bg-[#F4F4F4] font-[600] rounded-[38px] flex justify-center gap-3 items-center px-5">
            <i className="bx bx-current-location"></i>
            {city || "Загрузка..."}{" "}
          </div>
          <div className="mt-6">
            {weather ? (
              <div className="w-[500px] px-6">
                <h1 className="capitalize text-[40px]">
                  {weather?.weather[0]?.description}
                </h1>
                <p>Сейчас : {time}. Вчера в это же время {Math.round(weather?.feels_like?.day - 273.15 - 1)} °C</p>
                <div className="flex justify-between items-center w-full gap-[60px]">
                  <div className="w-[49.9%]">
                  <div className="text-[65px] font-[600]">{Math.round(weather?.temp?.day - 273.15)}°C</div>
                  <div className="font-[500] text-[18px]">Ощущается как : {Math.round(weather?.feels_like?.day - 273.15)} °C</div>
                  </div>
                  <div className="text-[90px] w-[49.9%]">
                  {weatherIcons[weather.weather[0]?.icon] || "❓"}
                  </div>
                </div>
              </div>
            ) : (
              <p>Данные о погоде отсутствуют.</p>
            )}
          </div>
        </div>

        {/* Блок с картой */}
        <div className="w-[500px] h-[320px] bg-white rounded-[50px] ">
          <Map />
        </div>
      </div>
    </div>
  );
}
