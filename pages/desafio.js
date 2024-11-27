import { useState, useEffect } from "react";

export default function Desafio() {
  const [depositos, setDepositos] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        JSON.parse(localStorage.getItem("depositos")) || Array(200).fill(false)
      );
    }
    return Array(200).fill(false);
  });

  useEffect(() => {
    localStorage.setItem("depositos", JSON.stringify(depositos));
  }, [depositos]);

  const toggleDeposito = (index) => {
    const novosDepositos = [...depositos];
    novosDepositos[index] = !novosDepositos[index];
    setDepositos(novosDepositos);
  };

  const total = depositos.reduce(
    (acc, current, index) => (current ? acc + (index + 1) : acc),
    0
  );

    const progresso = (depositos.filter(Boolean).length / 200) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">
        Desafio dos 200 Depósitos
      </h1>
      <h2 className="text-xl font-semibold mb-4">
        Total acumulado: R${total.toFixed(2)}
      </h2>
      <div>
          <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
            <div
              className="bg-pink-600 h-4 rounded-full"
              style={{ width: `${progresso}%` }}
              ></div>
          </div>
          <p>{progresso.toFixed(2)}% completado</p>
        </div>

      <div className="grid grid-cols-10 gap-2">
        {depositos.map((depositado, index) => (
          <button
            key={index}
            onClick={() => toggleDeposito(index)}
            className={`w-10 h-10 rounded ${
              depositado ? "bg-pink-600 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
