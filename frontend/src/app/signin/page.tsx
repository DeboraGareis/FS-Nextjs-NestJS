"use client";
import Image from "next/image";
import { Button } from "@/app/utils/Button";
import { useState } from "react";
import { Login, Me, signin } from "@/app/service/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";

const Signin = () => {
  const router = useRouter(); //para navegar manualmente
  const inputFormLogin = { email: "", password: "" };
  const [login, setLogin] = useState<Login>(inputFormLogin);
  const { setUser } = useUser();
  const { setSesion } = useAuth();
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

      if (!resServidor) {
        router.push("/signin");
        return;
      }
      // Verifica que el token esté en las cookies
      console.log("Token después del signin:", document.cookie);

      const userId = await Me();
      console.log("Me() devuelve:", userId);
      console.log("Token después del me...:", document.cookie);

      if (userId) {
        console.log("paso por el if del submit:", userId.userId);
        setSesion(true);
        setUser(userId?.userId);

        // Forzar que el router espere
        setTimeout(() => {
          router.push("/app/private/panel");
          router.refresh(); // Fuerza un refresh del router
        }, 500);
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
        setLogin(inputFormLogin);
        return;
      }
    }
  };
  const [eyePassword, setEyePassword] = useState(false);

  return (
    <div className="text-145B46 flex items-center justify-center flex-col py-20">
      <h2 className="text-lg font-semibold">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
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
          <div className="relative">
            <input
              name="password"
              value={login?.password}
              onChange={handleChange}
              className="border-1 border-black rounded-2xl mt-2 px-2 text-lg text-145B4 select-none"
              id="contraseña"
              placeholder="Contraseña"
              type={eyePassword ? "text" : "password"}
              required
            />
            <span
              className="absolute right-2 top-1/2 -translate-y-2 cursor-pointer"
              onClick={() => {
                setEyePassword(!eyePassword);
              }}
            >
              {eyePassword ? "👁" : "-👁-"}
            </span>
          </div>
          <Button
            text="Iniciar"
            styleButton="mt-4"
            styleSpan="text-md"
            onClick={
              eyePassword ? () => setEyePassword(!eyePassword) : undefined
            }
          />
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
