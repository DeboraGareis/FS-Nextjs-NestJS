import carritoService from "@/app/service/carritoService";
import { useCarrito } from "@/context/CarritoContext";
import { detalleOrdenService } from "@/app/service/detalleOrdenService";
import { Button } from "@/app/utils/Button";
import { ObtenerProductoSegunIdProducto } from "@/app/service/productService";

type AgregarProductoType = {
  idProducto?: string;
  precio?: number;
  idUsuario?: string;
};

type ResBackCarrito = {
  id: string;
  fecha: string;
  total: string;
};

const Carrito = ({ idProducto, precio, idUsuario }: AgregarProductoType) => {
  const { agregarOCrearCarrito, obtenerCarritoPorVendedor } = useCarrito();
  //crear carrito y orden de compra
  const handleClick = async () => {
    if (!idProducto || !precio || !idUsuario) return;

    const producto = await ObtenerProductoSegunIdProducto(idProducto);
    const idVendedor = producto.idAdministrador;

    // existe carrito para ese vendedor
    const carritoExistente = obtenerCarritoPorVendedor(idVendedor);

    if (carritoExistente) {
      // Si ya existe, solo agrego detalle de orden
      const crearDetalleOrden = {
        cantidad: "1",
        id_producto: idProducto,
        id_carrito: carritoExistente.id,
        precio: precio,
      };
      await detalleOrdenService(crearDetalleOrden);
    } else {
      // Crear nuevo carrito en el backend
      const res: ResBackCarrito = await carritoService(
        idProducto,
        precio,
        idUsuario,
      );
      agregarOCrearCarrito(res, idVendedor);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-full relative group shadow-lg shadow-gray-400"
    >
      <Button
        text="Agregar a carrito"
        green={true}
        styleButton="text-sm cursor-pointer"
      />
    </div>
  );
};

export default Carrito;
