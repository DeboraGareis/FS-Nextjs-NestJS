"use client";
import Image from "next/image";
import { Button } from "../utils/Button";
import { useState } from "react";
import { Login, Me, signin } from "../service/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";

const Signin = () => {
  const router = useRouter(); //para navegar manualmente.
  const [login, setLogin] = useState<Login>({ email: "", password: "" });
  const [error, setError] = useState<{ [key: string]: string[] }>({});
  const { setSesion } = useAuth();
  const { user, setUser } = useUser(); //?como hago para tomar el id del setToken???
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const resServidor = await signin(login);
      console.log("🐦 inicio sesion", resServidor);

      if (resServidor.access_token.length > 0) {
        router.push("/panel");
        setSesion(true);
      }

      const userId = await Me();
      console.log("🔴🔴🔴userId:", userId.userId);

      setUser(userId.userId);
    } catch (e) {
      console.log("🔴Error signin 38: ", e);

      if (e instanceof Error) {
        alert(e.message);
        return;
      }
    }
  };

  return (
    <div className="text-145B46 flex items-center justify-center flex-col py-20">
      <h2 className="text-lg font-semibold">Iniciar sesión</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            name="email"
            value={login?.email}
            onChange={handleChange}
            className="border-1 border-black rounded-2xl mt-6 px-2 text-lg text-145B46"
            placeholder="Usuario"
            id="usuario"
            type="text"
            required
          />
          <input
            name="password"
            value={login?.password}
            onChange={handleChange}
            className="border-1 border-black rounded-2xl mt-2 px-2 text-lg text-145B46"
            id="contraseña"
            placeholder="Contraseña"
            type="password"
            required
          />
          <Button text="Iniciar" styleButton="mt-4" styleSpan="text-md" />
        </div>
      </form>
      {/* Iniciar con google*/}
      <div className="flex mt-2">
        <Image src="/S.png" alt="google" height={36} width={36} />
      </div>
      <span className="text-sm">Ya tienes una cuenta?</span>
      <span className="text-sm">Has click aquí para iniciar sesión</span>
    </div>
  );
};
export default Signin;
