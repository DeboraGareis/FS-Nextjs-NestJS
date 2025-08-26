"use client";

import Product from "@/components/Product";
import type { ProductType } from "@/components/Product";
import Search from "@/components/Search";
import Seller, { SellerType } from "@/components/Seller";
import { fake_id, fake_products, fake_users } from "@/components/utils/data";
import { useRouter } from "next/navigation";

export default function Panel() {
  const router = useRouter();
  const productos: ProductType[] = fake_products.products;
  const vendedores: SellerType[] = fake_users.users;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Botones para gestionar productos */}
      <div className="flex gap-4">
        <button
          className="text-emerald-600 hover:bg-emerald-100 text-2xl font-extrabold px-7 py-5"
          onClick={() => router.push("/panel/new_product")}
        >
          + Nuevo producto
        </button>
        <button
          className="bg-emerald-600 hover:bg-emerald-400 text-2xl font-extrabold text-white px-7 py-5 rounded-lg transition"
          onClick={() => router.push(`/panel/${fake_id}`)}
        >
          Ver mis productos
        </button>
      </div>

      {/* lista vendedores */}
      <div className=" flex-col  w-full">
        <div className="flex ">
          <div className="text-emerald-600 text-2xl font-extrabold my-4 px-7 py-5">
            Otras tiendas
            <div className="gap-6 px-7 py-5">
              {vendedores.map((vendedor: SellerType, index: number) => (
                <div className="flex" key={index}>
                  <Seller seller={vendedor} />
                </div>
              ))}
            </div>
          </div>

          <div className="text-emerald-600 text-2xl font-extrabold my-4 px-7 py-5">
            <p className="">Otros productos</p>
            <Search />
            {/* Lista de productos */}
            <div className="flex flex-wrap border rounded-lg my-4 justify-center gap-6 px-7 py-5">
              {productos.map((producto: ProductType, index: number) => (
                <Product key={index} producto={producto} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
