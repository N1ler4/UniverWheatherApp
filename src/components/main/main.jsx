import React from "react";
import Section1 from "../section_1";
import Section2 from "../section_2";

export default function Main({ data }) {
  
  if (!data) {
    return <div className="text-center">Загрузка данных...</div>;
  }

  return (
    <div className="container w-full mx-auto">
      <Section1 data={data} />
      <Section2 data={data} />
    </div>
  );
}
