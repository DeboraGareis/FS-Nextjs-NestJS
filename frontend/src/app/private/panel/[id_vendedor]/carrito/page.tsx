"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Button } from "@/app/utils/Button";
import BottonCerrar from "@/components/BottonCerrar";
import BottonMenosOMas from "@/components/BottonMenosOMas";
import BottonPanel from "@/components/BottonPanel";
import { useCarrito } from "@/context/CarritoContext";
import {
  ActualizarDetalleDeOrdenSegunId,
  EliminarDetalleDeOrdenSegunId,
  GetDetallesDeOrdenSegunIdCarrito,
} from "@/app/service/detalleOrdenService";
import { ObtenerProductoSegunIdProducto } from "@/app/service/productService";
import { de } from "zod/locales";

const Carrito = () => {
  const { id_vendedor } = useParams();
  const router = useRouter();
  const [mostrarCarrito, setMostrarCarrito] = useState(true);
  const { obtenerCarritoPorVendedor, limpiarCarritos } = useCarrito();
  const [detallesDeCarrito, setDetallesDeCarrito] = useState<[] | {}[]>([]);
  const [productosEnCarro, setProductosEnCarro] = useState([]);

  const cerrarVistaCarrito = () => {
    setMostrarCarrito(false);
    router.push(`/private/panel/${id_vendedor}`);
  };

  useEffect(() => {
    const mostrarProductos = async () => {
      const id: string = String(id_vendedor);
      const carrito = obtenerCarritoPorVendedor(id);

      if (carrito) {
        const detalleDeOrdenDelCarro = await GetDetallesDeOrdenSegunIdCarrito(
          carrito.id,
        );
        setDetallesDeCarrito(detalleDeOrdenDelCarro);
        const productos = await Promise.all(
          detalleDeOrdenDelCarro.map(async (detalle) => {
            return await ObtenerProductoSegunIdProducto(detalle.id_producto);
          }),
        );
        if (!productos) {
          alert("...no tienes productos");
          return;
        }
        setProductosEnCarro(productos);
      }
    };

    mostrarProductos();
  }, [id_vendedor]);

  const actualizarCantidadProducto = async (
    idDetalleOrden: string,
    nuevaCantidad: number,
  ) => {
    //si la cantidad es menor a 1, devuelve siempre 1.
    if (nuevaCantidad < 1) {
      nuevaCantidad = 1;
    }
    setDetallesDeCarrito((prevDetalles) =>
      prevDetalles.map((item) =>
        item.id === idDetalleOrden
          ? { ...item, cantidad: nuevaCantidad }
          : item,
      ),
    );
    await ActualizarDetalleDeOrdenSegunId(
      idDetalleOrden,
      String(nuevaCantidad),
    );
  };

  const eliminarProductoDelCarritoOCarrito = async (idDetalleOrden) => {
    //si se elimina el unico producto eliminar el carrito y

    await EliminarDetalleDeOrdenSegunId(idDetalleOrden);
    const carritoNuevo = detallesDeCarrito.filter(
      (item) => item.id !== idDetalleOrden,
    );
    setDetallesDeCarrito(carritoNuevo);
    if (carritoNuevo) {
      alert("producto eliminado.");
      return;
    }
  };

  return (
    <>
      <div className="flex items-center justify-end space-x-4">
        <BottonCerrar onClick={cerrarVistaCarrito} />
      </div>
      <div className="sm:p-2 md:p-4">
        <table className="table-fixed w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="py-2 px-2 bg-emerald-200 rounded-md">Imagen</th>
              <th className="bg-emerald-200 rounded-md">Nombre</th>
              <th className="bg-emerald-200 rounded-md">Cantidad</th>
              <th className="px-2 font-bold bg-emerald-200 rounded-md">
                Precio x unidad
              </th>
              <th className="font-bold bg-emerald-200 rounded-md">Subtotal</th>
              <th className="font-bold bg-emerald-200 rounded-md">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productosEnCarro.map((p) => (
              <React.Fragment key={p.id}>
                {detallesDeCarrito.map((item) => {
                  if (item.id_producto !== p.id) return null; // solo renderiza si coincide el producto

                  return (
                    <tr key={item.id}>
                      {/* Imagen del producto */}
                      <td className="flex justify-center">
                        <Image
                          src={p.imagen}
                          alt={p.nombre}
                          width={50}
                          height={50}
                        />
                      </td>

                      {/* Nombre */}
                      <td className="text-center">{p.nombre}</td>

                      {/* Cantidad con botones */}
                      <td id="cantidad" className="text-center">
                        <BottonMenosOMas
                          simbolo="-"
                          onClick={() =>
                            actualizarCantidadProducto(
                              item.id,
                              Number(item.cantidad) - 1,
                            )
                          }
                        />
                        {item.cantidad}
                        <BottonMenosOMas
                          simbolo="+"
                          onClick={() =>
                            actualizarCantidadProducto(
                              item.id,
                              Number(item.cantidad) + 1,
                            )
                          }
                        />
                      </td>

                      {/* Precio */}
                      <td className="text-center">{p.precio}</td>

                      {/* Subtotal */}
                      <td id="subtotal" className="text-center font-bold">
                        {Number(p.precio) * Number(item.cantidad)}
                      </td>

                      {/* Ícono de eliminar */}
                      <td className="flex justify-center font-bold">
                        <Image
                          src="/trash.svg"
                          alt="Basurero"
                          height={25}
                          width={25}
                          className="cursor-pointer"
                          onClick={async () => {
                            if (item.id_producto === p.id) {
                              await eliminarProductoDelCarritoOCarrito(item.id);
                            }
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sm:p-4 md:p-6 ">
        <div className="flex justify-end ">
          <div className="border border-emerald-600 w-1/2 "></div>
        </div>
        <div className="flex justify-end sm:mt-2 md:mt-4  font-black ">
          TOTAL:
        </div>
        <div className="flex justify-end sm:mt-6 md:mt-10">
          <Button
            text="Finalizar compra"
            styleButton="hover:bg-emerald-600"
            green
          />
        </div>
      </div>
      <BottonPanel />
    </>
  );
};
export default Carrito;
