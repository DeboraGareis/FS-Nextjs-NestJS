"use client";
import BottonPanel from "@/components/BottonPanel";
import Product, { ProductType } from "@/components/Product";
import Search from "@/components/Search";
import { useEffect, useState } from "react";

type Props = {
  productos: ProductType[];
  id_vendedor: string;
};

export default function VendedorClient({ productos, id_vendedor }: Props) {
  const [productosFiltrados, setProductosFiltrados] =
    useState<ProductType[]>(productos);

  useEffect(() => {
    const productosActualizados = productos.map((producto) => ({
      ...producto,
      idAdministrador: id_vendedor,
    }));
    setProductosFiltrados(productosActualizados);
  }, [productos, id_vendedor]);

  console.log("🙂 productosActualizados: ", productosFiltrados);
  return (
    <div>
      <div className="text-emerald-600 text-2xl font-extrabold my-4 px-7 py-5">
        <p>Productos del vendedor</p>
        <Search
          productos={productos}
          onResults={(res) => setProductosFiltrados(res)}
        />

        <div className="flex flex-wrap border rounded-lg my-4 justify-center gap-6 px-7 py-5">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((p, i) => (
              <Product key={i} producto={p} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              No se encontraron productos para el vendedor
            </p>
          )}
        </div>
      </div>
      <BottonPanel />
    </div>
  );
}
