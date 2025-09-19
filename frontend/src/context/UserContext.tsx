"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  user: string;
  setUser: (val: string) => void;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext debe usarse dentro de un UserProvider");
  }
  return context;
}
