import { ObtenerProductos } from "../service/productService";
import { ObtenerVendedores } from "../service/userService";
import PanelClient from "./PanelClient";

export default async function PanelPage() {
  const productos = await ObtenerProductos();
  const vendedores = await ObtenerVendedores();
  return <PanelClient productos={productos} vendedores={vendedores} />;
}