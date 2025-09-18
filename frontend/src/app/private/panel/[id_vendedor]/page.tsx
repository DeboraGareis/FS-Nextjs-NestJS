import VendedorClient from "./VendedorClient";
import { ObtenerProductosVendedor } from "@/app/service/productService";

export default async function ProductosVendedor({
  params,
}: {
  params: { id_vendedor: string };
}) {
  const { id_vendedor } = params;
  console.log("params.id_vendedor:", id_vendedor);

  const productos = await ObtenerProductosVendedor(id_vendedor);
  return <VendedorClient productos={productos} id_vendedor={id_vendedor} />;
}