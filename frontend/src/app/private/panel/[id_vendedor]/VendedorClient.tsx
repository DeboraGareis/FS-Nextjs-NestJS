"use client";
import BottonPanel from "@/components/BottonPanel";
import Product, { ProductType } from "@/components/Product";
import Search from "@/components/Search";
import { useState } from "react";

type Props = {
  productos: ProductType[];
};

export default function VendedorClient({ productos }: Props) {
  const [productosFiltrados, setProductosFiltrados] =
    useState<ProductType[]>(productos);
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
              <Product key={i} producto={p} vendedor={true} />
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
