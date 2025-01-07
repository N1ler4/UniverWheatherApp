import React from "react";
import User from "../../assets/user.png";
import Input from "antd/es/input/Input";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const userName = "Аноним"; // Можно заменить на динамическое имя из состояния

  const goToMonth = () => {
    navigate("/month");
  };
  const goToTenDays = () => {
    navigate("/tendays");
  };
  const goToHome =()=>{
    navigate("/");
  }

  return (
    <header className="bg-[#FFFFFF] py-3 border-black border-b-2">
      <nav className="flex justify-around items-center px-4">
        {/* Пользователь */}
        <div className="flex gap-3 items-center">
          <div onClick={goToHome} className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img src={User} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[12px] text-gray-500">Здравствуйте!!</p>
            <b className="text-[14px]">{userName}</b>
          </div>
        </div>

        {/* Навигация */}
        <div className="flex gap-10">
          <p
            className="cursor-pointer "
            onClick={goToTenDays}
          >
            Прогноз на 10 дней
          </p>
          <p
            className="cursor-pointer "
            onClick={goToMonth}
          >
            Прогноз на месяц
          </p>
        </div>

        {/* Поле ввода */}
        <div>
          <Input
            placeholder="Введите текст"
            allowClear
            className="w-[300px] h-[35px]"
          />
        </div>
      </nav>
    </header>
  );
}
