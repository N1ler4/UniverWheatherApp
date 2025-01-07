import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Cookies from "js-cookie";
import "./style.css";

export default function WeatherWidget(data) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [weather1, setWeather1] = useState(null);

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
        locationData?.address?.city ||
        locationData?.address?.town ||
        locationData?.address?.village;

      setCity(`${cityName}`);
    } catch (error) {
      console.error("Ошибка при запросе к Nominatim:", error);
    }
  };

  const weatherIcons = {
    "01d": "☀️",
    "01n": "🌑",
    "02d": "🌤️",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌦️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };

  const getWeatherData = () => {
    if (data?.data?.list && data.data.list.length > 0) {
      const weatherData = data.data.list[0];
      setWeather(weatherData);
    } else {
      console.error("Weather data is missing or empty");
    }
  };
  const getWeatherData1 = () => {
    if (data?.data?.list && data.data.list.length > 0) {
      const weatherData = data.data.list[1];
      setWeather1(weatherData);
    } else {
      console.error("Weather data is missing or empty");
    }
  };
  const toggleLike = () => {
    setLiked((prev) => !prev);
    if (disliked) setDisliked(false);
  };

  const toggleDislike = () => {
    setDisliked((prev) => !prev);
    if (liked) setLiked(false);
  };

  const formatUnixTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return moment.unix(timestamp).tz("Asia/Karachi").format("HH:mm:ss");
  };

  const formatISOTime = (time) => {
    if (!time) return "N/A";
    return moment(time).tz("Asia/Karachi").format("HH:mm:ss");
  };

  useEffect(() => {
    getWeatherData();
    fetchLocation();
    getWeatherData1();
  }, [data]);

  return (
    <div className="container mx-auto w-full">
      <div className="flex justify-around py-[20px]">
        <div className="flex flex-col gap-2">
          <div className="w-[280px] h-[120px] rounded-3xl bg-white border-2 border-[#444]">
            <div className="flex items-center justify-evenly">
              <p className="text-[90px]">⛅</p>
              <div className="pb-6">
                <p className="text-[28px] font-bold">Рассвет:</p>
                <p className="text-[20px] font-bold">
                  {typeof weather?.sunrise === "number"
                    ? formatUnixTime(weather.sunrise)
                    : formatISOTime(weather?.sunrise)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[280px] h-[120px] rounded-3xl bg-blue-900 border-2 border-[#444]">
            <div className="flex items-center justify-evenly pt-2">
              <p className="text-[70px] text-white">🌇</p>
              <div>
                <p className="text-[28px] font-bold text-white">Закат:</p>
                <p className="text-[20px] font-bold text-white">
                  {typeof weather?.sunset === "number"
                    ? formatUnixTime(weather.sunset)
                    : formatISOTime(weather?.sunset)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[280px] h-[120px] rounded-3xl bg-[#3E5373] border-2 border-[#444] text-white flex items-center justify-evenly">
            <div>
              <h2 className="font-bold text-[25px]">Влажность</h2>
              <div>
                <p className="text-[12px]">Хорошее качество воздуха:</p>
                <p className="text-[14px]">{weather?.humidity}%</p>
              </div>
            </div>
            <p className="text-[100px] pb-10">🌫</p>
          </div>
        </div>
        <div className="w-[500px]">
          <div className="flex justify-evenly items-center">
            <p className="text-[30px] max-w-[300px]">
              Нравится ли вам сегодняшняя погода?
            </p>
            <div className="flex gap-[10px]">
              <button
                onClick={toggleLike}
                className={`btn ${
                  liked ? "active1" : ""
                } w-[50px] h-[50px] flex justify-center items-center rounded-xl bg-white`}
              >
                <box-icon name="like"></box-icon>
              </button>
              <button
                onClick={toggleDislike}
                className={`btn ${
                  disliked ? "active2" : ""
                } w-[50px] h-[50px] flex justify-center items-center rounded-xl bg-white`}
              >
                <box-icon name="dislike"></box-icon>
              </button>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="flex flex-col justify-around items-center w-[110px] h-[300px]">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <p className="text-[70px]">
                  {" "}
                  {weatherIcons[weather?.weather[0]?.icon] || "❓"}
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-[24px]">
                  {Math.round(weather?.temp?.morn - 273.15)}°C
                </h2>
                <p className="text-[30px]">Утро</p>
              </div>
            </div>
            <div className="flex flex-col justify-around items-center w-[110px] h-[300px] pl-2 border-l-2 border-black">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <p className="text-[70px]">
                  {" "}
                  {weatherIcons[weather?.weather[0]?.icon] || "❓"}
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-[24px]">
                  {Math.round(weather?.temp?.day - 273.15)}°C
                </h2>
                <p className="text-[30px]">День</p>
              </div>
            </div>
            <div className="flex flex-col justify-around items-center w-[110px] h-[300px] pl-2 border-l-2 border-black">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <p className="text-[70px]">
                  {" "}
                  {weatherIcons[weather?.weather[0]?.icon] || "❓"}
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-[24px]">
                  {Math.round(weather?.temp?.eve - 273.15)}°C
                </h2>
                <p className="text-[30px]">Вечер</p>
              </div>
            </div>
            <div className="flex flex-col justify-around items-center w-[110px] h-[300px] pl-2 border-l-2 border-black">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <p className="text-[70px]">
                  {" "}
                  {weatherIcons[weather?.weather[0]?.icon] || "❓"}
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-[24px]">
                  {Math.round(weather?.temp?.night - 273.15)}°C
                </h2>
                <p className="text-[30px]">Ночь</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[250px] bg-[rgb(218,226,179)] rounded-[50px] autobg border-2 border-black">
          <div className="pl-8 pt-8">
            <h1 className="text-[30px]">Завтра</h1>
            <p className="text-[32px]">{city}</p>
          </div>
          <div className="pl-10 pb-6">
            <p className="text-[54px]">{Math.round(weather?.temp?.morn - 273.15)}°C</p>
            <p className="text-[32px] mb-4">{weather1?.weather[0]?.description.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
