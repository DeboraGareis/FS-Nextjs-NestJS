"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
  sesion: boolean;
  setSesion: (val: boolean) => void;
};

// 1. Creo el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Creo el Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [sesion, setSesion] = useState(false);
  return (
    <AuthContext.Provider value={{ sesion, setSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Creo un hook para usarlo más fácil dentro de AuthProvider
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
