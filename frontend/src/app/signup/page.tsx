"use client";
import Image from "next/image";
import { Button } from "../utils/Button";
import { useState } from "react";
import { Register } from "../service/authService";
import { Signup as SignupService } from "../service/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const router = useRouter(); //para navegar manualmente.
  const { setValue } = useAuth();

  const [register, setRegister] = useState<Register>({
    nombre: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegister({ ...register, [name]: value });
    console.log("register", register);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const resRegistro = await SignupService(register);
      console.log(resRegistro);
      if (resRegistro.id.length > 0) {
        router.push("/panel");
        setValue(true);
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
        return;
      }
    }
  };
  return (
    <div className="text-145B46 flex items-center justify-center flex-col py-20">
      <h2 className="text-lg font-semibold">Registrarse</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            name="nombre"
            value={register?.nombre}
            onChange={handleChange}
            className="border-1 border-black rounded-2xl mt-6 px-2 text-lg text-145B46"
            placeholder="Nombre"
            id="nombre"
            type="text"
            required
          />
          <input
            name="email"
            value={register?.email}
            onChange={handleChange}
            className="border-1 border-black rounded-2xl mt-2 px-2 text-lg text-145B46"
            placeholder="Email"
            id="email"
            type="text"
            required
          />
          <input
            name="password"
            value={register?.password}
            onChange={handleChange}
            className="border-1 border-black rounded-2xl mt-2 px-2 text-lg text-145B46"
            placeholder="Contraseña"
            id="password"
            type="password"
            required
          />
          <input
            name="retypePassword"
            value={register?.retypePassword}
            onChange={handleChange}
            className="border-1 border-black rounded-2xl mt-2 px-2 text-lg text-145B46"
            placeholder="Reescriba su contraseña"
            id="retypePassword"
            type="password"
            required
          />
          <Button
            text="Registrarse"
            green={true}
            styleButton="mt-4"
            styleSpan="text-md"
          />
        </div>
      </form>
      <div className="flex mt-2">
        <Image src="/lg-google.png" alt="google" height={36} width={36} />
      </div>
      <span className="text-sm">Ya tienes una cuenta?</span>
      <span className="text-sm">Has click aquí para iniciar sesión</span>
    </div>
  );
};
export default Signup;
