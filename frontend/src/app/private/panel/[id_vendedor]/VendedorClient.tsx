"use client";
import BottonPanel from "@/components/BottonPanel";
import Product, { ProductType } from "@/components/Product";
import Search from "@/components/Search";

type Props = {
  productos: ProductType[];
};

export default function VendedorClient({ productos }: Props) {
  return (
    <div>
      <div className="text-emerald-600 text-2xl font-extrabold my-4 px-7 py-5">
        <p>Productos del vendedor</p>
        <Search />

        <div className="flex flex-wrap border rounded-lg my-4 justify-center gap-6 px-7 py-5">
          {productos && productos.length > 0 ? (
            productos.map((producto: ProductType, index: number) => (
              <Product key={index} producto={producto} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No se encontraron productos para ese vendedor.</p>
          )}
        </div>
      </div>
      <BottonPanel />
    </div>
  );
}