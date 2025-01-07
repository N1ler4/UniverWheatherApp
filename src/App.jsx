import "./App.css";
import Header from "./components/header";
import { useEffect, useState } from "react";
import http from "./config/http";
import Main from "./components/main/main";

function App() {
  const [coordinates, setCoordinates] = useState(null); // Для хранения координат
  const [data, setData] = useState(null); // Для данных с API
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

  return (
    <div className="bg-[#F0F5FF] w-[100%] h-[100%]">
      {/* Header компонента */}
      <Header />

      {/* Отображение ошибки */}
      {error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        // Main компонента с передачей данных
        <Main data={data} />
      )}
    </div>
  );
}

export default App;
