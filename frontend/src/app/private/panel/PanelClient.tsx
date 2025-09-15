"use client";

import Link from "next/link";
import Product, { ProductType } from "@/components/Product";
import Seller, { SellerType } from "@/components/Seller";
import Search from "@/components/Search";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { ObtenerUserPorId } from "@/app/service/userService";

export type UserType = {
  id: string;
  nombre: string;
  password: string;
  email: string;
  activo: boolean;
};

type Props = {
  productos: ProductType[];
  vendedores: SellerType[];
};

export default function PanelClient({ productos, vendedores }: Props) {
  const { user } = useUser();
  const [rtaUser, setRtaUser] = useState<UserType>({
    id: "",
    nombre: "",
    password: "",
    email: "",
    activo: false,
  });
  const [productosFiltrados, setProductosFiltrados] =
    useState<ProductType[]>(productos);
  useEffect(() => {
    const DataUser = async () => {
      if (user) {
        const data = await ObtenerUserPorId(user);
        if (data) setRtaUser(data);
      }
    };
    DataUser();
  }, [user]);

  console.log("user: ", user, "//activo o no:", rtaUser.activo);
  console.log("💟 productos: ", productos);

  console.log("/////productos:  ", productos, "/////vendedores: ", vendedores);

  return (
    <div className="flex flex-col min-h-screen items-center justify-start p-8 pb-10 gap-10 sm:p-10">
      {/* Botones solo para vendedores */}
      {rtaUser.activo && (
        <div className="flex gap-4">
          <Link
            href="/private/panel/new_product"
            className="text-emerald-600 hover:bg-emerald-100 text-2xl font-extrabold px-7 py-5"
          >
            + Nuevo producto
          </Link>
          <Link
            href={`/private/panel/${user}`}
            className="bg-emerald-600 hover:bg-emerald-400 text-2xl font-extrabold text-white px-7 py-5 rounded-lg transition"
          >
            Ver mis productos
          </Link>
        </div>
      )}

      {/* lista vendedores */}
      <div className="flex-col w-full gap-4">
        <div className="flex">
          <div className="text-emerald-600 text-2xl font-extrabold my-4 px-7 py-5">
            Otras tiendas
            <div className="gap-6 px-7 py-5">
              {vendedores.map((v, i) => (
                <div className="flex" key={i}>
                  <Seller
                    vendedor={v}
                    productos={productos}
                    vistaVendedor={rtaUser.activo}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* lista productos */}
          <div className="text-emerald-600 text-2xl font-extrabold my-4 px-7 py-5">
            <p>Otros productos</p>
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
                  No se encontraron productos
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
