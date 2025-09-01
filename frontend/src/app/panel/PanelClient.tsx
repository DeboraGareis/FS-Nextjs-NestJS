"use client";

import Link from "next/link";
import Product, { ProductType } from "@/components/Product";
import Seller, { SellerType } from "@/components/Seller";
import Search from "@/components/Search";
import { useUser } from "@/context/UserContext";

type Props = {
  productos: ProductType[];
  vendedores: SellerType[];
};

export default function PanelClient({ productos, vendedores }: Props) {
  const { user } = useUser();
  console.log("user: ", user)
  console.log("/////productos:  ",productos, "/////vendedores: ",vendedores)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex gap-4">
        <Link
          href="/panel/new_product"
          className="text-emerald-600 hover:bg-emerald-100 text-2xl font-extrabold px-7 py-5"
        >
          + Nuevo producto
        </Link>
        <Link
          href={`/panel/${user}`}
          className="bg-emerald-600 hover:bg-emerald-400 text-2xl font-extrabold text-white px-7 py-5 rounded-lg transition"
        >
          Ver mis productos
        </Link>
      </div>

      {/* lista vendedores */}
      <div className="flex-col w-full">
        <div className="flex">
          <div className="text-emerald-600 text-2xl font-extrabold my-4 px-7 py-5">
            Otras tiendas
            <div className="gap-6 px-7 py-5">
              {vendedores.map((v, i) => (
                <div className="flex" key={i}>
                  <Seller vendedor={v} productos={productos} />
                </div>
              ))}
            </div>
          </div>

          <div className="text-emerald-600 text-2xl font-extrabold my-4 px-7 py-5">
            <p>Otros productos</p>
            <Search />
            <div className="flex flex-wrap border rounded-lg my-4 justify-center gap-6 px-7 py-5">
              {productos.map((p, i) => (
                <Product key={i} producto={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}