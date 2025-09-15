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
  //el metodo Obtener productos no me devuelve el idAdministrador,
  //por ende cuando quiero enviar un mensaje me salta el error,
  //porque no tengo el id del remitente, pero el id del administrador
  // lo recibo del un params, que la verdad nose de donde viene 🙂
  return <VendedorClient productos={productos} idVendedor={id_vendedor} />;
}
