"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Carrito {
  id: string;
  fecha: string;
  total: string;
  idVendedor?: string;
}

type CarritoContextType = {
  carritos: Carrito[];
  agregarOCrearCarrito: (nuevo: Carrito, idVendedor: string) => void;
  obtenerCarritoPorVendedor: (idVendedor: string) => Carrito | undefined;
  limpiarCarritos: () => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carritos, setCarritos] = useState<Carrito[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("carritos");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  // guardar cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carritos", JSON.stringify(carritos));
  }, [carritos]);

  const agregarOCrearCarrito = (nuevo: Carrito, idVendedor: string) => {
    setCarritos((prev) => {
      const existe = prev.find((carro) => carro.idVendedor === idVendedor);
      if (existe) {
        return prev.map((c) => (c.idVendedor === idVendedor ? nuevo : c));
      } else {
        return [...prev, { ...nuevo, idVendedor }];
      }
    });
  };

  const obtenerCarritoPorVendedor = (idVendedor: string) =>
    carritos.find((c) => c.idVendedor === idVendedor);

  const limpiarCarritos = () => {
    setCarritos([]);
    localStorage.removeItem("carritos");
  };

  return (
    <CarritoContext.Provider
      value={{
        carritos,
        agregarOCrearCarrito,
        obtenerCarritoPorVendedor,
        limpiarCarritos,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
}
