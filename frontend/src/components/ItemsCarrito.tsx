import {
  ActualizarDetalleDeOrdenSegunId,
  GetDetallesDeOrdenSegunIdCarrito,
} from "@/app/service/detalleOrdenService";
import { ObtenerProductoSegunIdProducto } from "@/app/service/productService";
import Image from "next/image";
import { useState } from "react";
import BottonCerrar from "./BottonCerrar";
import BottonMenosOMas from "./BottonMenosOMas";

type Carrito = {
  id: string;
};
type DetalleDeOrden = {
  id: string;
  id_carrito: string;
  id_producto: string;
  cantidad: number;
  precio: number;
};

type Item = {
  id: string;
  imagen: string;
  nombre: string;
  precio: string;
  cantidad: string;
};
export const ItemsCarrito = ({ id }: Carrito) => {
  //guarda informacion de los productos de cada detalle de orden
  const [itemsCarrito, setItemsCarrito] = useState<Item[] | null>(null);
  //guarda informacion de cada detalle de orden que hay dentro del carro
  const [detallesDeOrden, setDetallesDeOrden] = useState<
    DetalleDeOrden[] | null
  >(null);
  //abrir y cerrar carro
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const verCarrito = async () => {
    try {
      const resBack = await GetDetallesDeOrdenSegunIdCarrito(id);

      setDetallesDeOrden(resBack);
      const idProductosCarrito = resBack.map((item: any) => item.id_producto);

      const idsProductos = [];
      for (const producto of idProductosCarrito) {
        const detalle = await ObtenerProductoSegunIdProducto(producto);
        idsProductos.push(detalle);
      }

      setItemsCarrito(idsProductos);
      setMostrarCarrito(true);
    } catch (err) {
      console.error("Error al obtener el carrito:", err);
      alert("Hubo un error al traer el carrito");
    }
  };

  const RestarOSumar = async (itemId: string, tipo: "mas" | "menos") => {
    if (!detallesDeOrden) return;

    setDetallesDeOrden((prev) => {
      if (!prev) return prev;

      // Mapeamos los detalles y actualizamos el que coincide
      return prev.map((detalle) => {
        if (detalle.id_producto === itemId) {
          const nuevaCantidad =
            tipo === "mas"
              ? detalle.cantidad + 1
              : Math.max(detalle.cantidad - 1, 1);
          const subtotal = nuevaCantidad * detalle.precio;
          // actualiza en el backend??
          ActualizarDetalleDeOrdenSegunId(
            detalle.id,
            String(nuevaCantidad),
            subtotal,
          );

          return { ...detalle, cantidad: nuevaCantidad };
        }
        return detalle;
      });
    });
  };

  return (
    <>
      <div className="flex justify-end">
        <div
          onClick={verCarrito}
          className="inline-block  mt-4 hover:bg-emerald-400 p-2 rounded-lg transition cursor-pointer"
        >
          <Image
            src={"/carrito.png"}
            alt="carrito de compras"
            height={60}
            width={60}
          />
        </div>
      </div>
      {mostrarCarrito && (
        <form className="absolute left-1/6 md:left-1/3 z-50 bg-CFFBEE box-content size-96 px-4 border rounded-md shadow-lg">
          <BottonCerrar onClick={() => setMostrarCarrito(false)} />
          {itemsCarrito?.length
            ? itemsCarrito.map((item) => (
                <ul className="list-none" key={item.id}>
                  <li className="pt-4" key={item.id}>
                    <Image
                      src={item.imagen}
                      alt={item.nombre}
                      height={40}
                      width={40}
                    />
                    cantidad:{" "}
                    <BottonMenosOMas
                      simbolo="-"
                      onClick={() => RestarOSumar(item.id, "menos")}
                    />
                    {detallesDeOrden?.map((item) => item.cantidad)}
                    <BottonMenosOMas
                      simbolo="+"
                      onClick={() => RestarOSumar(item.id, "mas")}
                    />
                    <br />
                    nombre: {item.nombre}
                    <br />
                    precio x unidad: {item.precio}
                    <br />
                    subTotal:
                    {detallesDeOrden?.map((item) => item.precio)}
                    <hr className="w-1/3 justify-center" />
                  </li>
                </ul>
              ))
            : "Cargando..."}
        </form>
      )}
    </>
  );
};
