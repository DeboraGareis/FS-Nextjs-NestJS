import { ObtenerProductos } from "../../service/productService";
import { ObtenerVendedores } from "../../service/userService";
import PanelClient from "./PanelClient";

export const dynamic = "force-dynamic";

export default async function PanelPage() {
  const productos = await ObtenerProductos();
  const vendedores = await ObtenerVendedores();
  return <PanelClient productos={productos} vendedores={vendedores} />;
}
