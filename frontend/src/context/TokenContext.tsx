"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";

type TokenContextType = {
  token: string | null;
  guardarToken: (val: string | null) => void;
  eliminarToken: () => void;
};

const TokenContext = createContext<TokenContextType | null>(null);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const guardado = localStorage.getItem("token");
    if (guardado) setToken(guardado);
  }, []);

  const guardarToken = (t: string | null) => {
    if (t) {
      localStorage.setItem("token", t);
      setToken(t);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  const eliminarToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, guardarToken, eliminarToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("UserContext debe usarse dentro de un UserProvider");
  }
  return context;
};
