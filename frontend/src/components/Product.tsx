"use client";
import { MensajeDeAyuda, mensajeDeAyuda } from "@/app/service/mensajeService";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useState } from "react";

export type ProductType = {
  id: string;
  categoria: string;
  nombre: string;
  stock: number;
  imagen: string;
  precio: number;
  idAdministrador: string;
};

type Props = {
  producto: ProductType;
};

export default function Product({ producto }: Props) {
  //state del metodo /me del backend// quiero manejar mejor la sesion del usuario, para que se mantenga, porque cuando hay un cambio se corta, me muestra vistas que no deberia
  const { user } = useUser();

  const [mensaje] = useState<MensajeDeAyuda>({
    idAdministrador: "",
    idComprador: "",
    texto: "",
    leido: "",
  });

  const handleClick = async (event) => {
    try {
      console.log("user:$$$", user);

      alert(`Hola, quiero saber mas del producto ${producto.nombre}`);
      mensaje.idAdministrador = user;
      mensaje.idComprador = producto.idAdministrador;
      mensaje.texto = `Hola, quiero saber mas del producto ${producto.nombre}`;
      mensaje.leido = "No";

      const res = await mensajeDeAyuda(mensaje);
      alert("mensaje enviado");
    } catch (error) {
      console.error("Error en handleClick:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center border-gray-300 p-2 w-48 shadow-md">
      {/* Precio */}
      <p className="text-lg font-semibold text-emerald-600 mb-2">
        ${producto.precio}
      </p>

      {/* Imagen optimizada */}
      <div className="group relative hover:w-64 hover:h-64 transition-all duration-300 w-32 h-32 mb-2">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          className="object-contain"
        />
      </div>

      {/* Botón de ayuda + cantidad */}
      <div className="relative group flex items-center gap-2">
        <button
          role="img"
          aria-label="info"
          className="text-xl bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-300 motion-safe:hover:scale-120"
          onClick={handleClick}
        >
          ?
        </button>

        <span
          onClick={handleClick}
          className="absolute block -translate-x-1.2 mt-28 p-2 text-xs text-1E4137 bg-CFFBEE rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Click para comunicarse con el vendedor por {producto.nombre}
        </span>
        <p className="text-sm text-gray-700">Stock: {producto.stock}</p>
      </div>
    </div>
  );
}
