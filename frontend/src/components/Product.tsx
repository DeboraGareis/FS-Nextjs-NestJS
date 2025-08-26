import { MensajeDeAyuda, mensajeDeAyuda } from "@/app/service/mensajeService";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useState } from "react";

export type ProductType = {
  Categoria: string;
  Nombre: string;
  Stock: number;
  Imagen: string;
  Precio: number;
  IdAdministrador: string;
};
type Props = {
  producto: ProductType;
};

export default function Product({ producto }: Props) {
  const { user, setUser } = useUser();

  const [mensaje, useMensaje] = useState<MensajeDeAyuda>({
    idAdministrador: "",
    idComprador: "",
    texto: "",
    leido: "",
  });

  const handleClick = async (event) => {
    //? queres enviar el mensaje???? 1 click se envia el mensaje
    //left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 mt-2 p-4 rounded-lg w-[90vw] md:w-[250px] animate-fade-in z-50 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-900
    mensaje.idAdministrador = user;
    mensaje.idComprador = "9ed98a27-daa5-484e-9244-02f7c66b51a4";
    mensaje.texto = `hola soy ${user}, quiero hablar con vos por el producto ${producto.Nombre}`;
    mensaje.leido = "No";
    console.log("💌 mensaje: ", mensaje);

    const res = await mensajeDeAyuda(mensaje);
    console.log("res: ", res);

    alert("mensaje enviado");
  };

  return (
    //<div className="flex flex-col items-center border rounded-lg p-4 w-48 shadow-md">
    <div className="flex flex-col items-center border border-gray-300 p-2 w-48 shadow-md">
      {/* Precio */}
      <p className="text-lg font-semibold text-emerald-600 mb-2">
        ${producto.Precio}
      </p>

      {/* Imagen optimizada */}
      <div className="relative w-32 h-32 mb-2">
        <Image
          src={producto.Imagen}
          alt={producto.Nombre}
          fill
          className="object-contain"
        />
      </div>

      {/* Botón de ayuda + cantidad */}
      <div className="flex items-center gap-2 group">
        <button
          role="img"
          aria-label="info"
          className="text-xl bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-300 motion-safe:hover:scale-120"
          onDoubleClick={handleClick}
        >
          ?
        </button>{" "}
        <span className="absolute left-1/3 -translate-x-1.2 mt-2 px-2 py-1 text-sm text-1E4137 bg-145B46 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {" "}
          Consulta por el producto con el vendedor
        </span>
        <p className="text-sm text-gray-700">Stock: {producto.Stock}</p>
      </div>
    </div>
  );
}
