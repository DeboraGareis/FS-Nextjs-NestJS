import Link from "next/link";
import { ProductType } from "./Product";
import VendedorClient from "@/app/private/panel/[id_vendedor]/VendedorClient";

export type SellerType = {
  id: string;
  nombre: string;
  email: string;
};
type Props = {
  productos: ProductType[];
  vendedor: SellerType;
  vistaVendedor?: boolean;
};
export default function Seller({ productos, vendedor, vistaVendedor }: Props) {
  return (
    <div className="flex items-center p-4 w-48 shadow-md space-x-2">
      <p className="text-lg font-semibold text-emerald-600">
        <Link href={`/private/panel/${vendedor.id}`}>{vendedor.nombre}</Link>
      </p>
      <p className="text-xs font-light inline-block text-gray-600 fle">
        {
          productos.filter(
            (p: ProductType) => p.idAdministrador === vendedor.id,
          ).length
        }{" "}
        productos
      </p>
    </div>
  );
}
