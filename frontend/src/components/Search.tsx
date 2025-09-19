"use client";
import { ChangeEvent, useState, useEffect } from "react";
import { ProductType } from "./Product";

type Props = {
  productos: ProductType[];
  onResults: (resultados: ProductType[]) => void; // callback al padre
};

export default function Search({ productos, onResults }: Props) {
  const [query, setQuery] = useState("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  // filtrar y notificar al padre cada vez que cambie query
  useEffect(() => {
    const resultados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(query.toLowerCase())
    );
    onResults(resultados);
  }, [query, productos, onResults]);

  return (
    <div className="flex text-sm items-center gap-2 w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar producto..."
        className="flex-grow px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
      <span role="img" aria-label="search" className="text-2xl">
        🔍
      </span>
    </div>
  );
}