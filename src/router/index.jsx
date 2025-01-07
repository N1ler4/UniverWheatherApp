import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App"
import Month from "../components/month";
import TenDays from "../components/tendays";


export default function MainApp() {
  return (
    <Router>
      <Routes>
        {/* Определение маршрутов */}
        <Route path="/" element={<App />} />
        <Route path="/month" element={<Month />} />
        <Route path="/tendays" element={<TenDays />} />
      </Routes>
    </Router>
  );
}
