import carritoService from "@/app/service/carritoService";
import { useCarrito } from "@/context/CarritoContext";
import { detalleOrdenService } from "@/app/service/detalleOrdenService";
import { Button } from "@/app/utils/Button";
import { ObtenerProductoSegunIdProducto } from "@/app/service/productService";
import { useToken } from "@/context/TokenContext";

type AgregarProductoType = {
  idProducto?: string;
  precio?: number;
  idUsuario?: string;
};

type ResBackCarrito = {
  id: string;
  fecha: string;
  total: string;
  token: string;
};

const Carrito = ({ idProducto, precio, idUsuario }: AgregarProductoType) => {
  const { token } = useToken();
  const { carritos, agregarOCrearCarrito, obtenerCarritoPorVendedor } =
    useCarrito();
  //crear carrito y orden de compra
  const handleClick = async () => {
    if (!idProducto || !precio || !idUsuario) return;

    const producto = await ObtenerProductoSegunIdProducto(idProducto);
    const idVendedor = producto.idAdministrador;

    const carritoExistente = obtenerCarritoPorVendedor(idVendedor);

    if (carritoExistente && token) {
      // Si ya existe, solo agrego detalle de orden
      const crearDetalleOrden = {
        cantidad: "1",
        id_producto: idProducto,
        id_carrito: carritoExistente.id,
        precio: precio,
        token: token,
      };
      await detalleOrdenService(crearDetalleOrden);
    } else {
      // Crear nuevo carrito en el backend
      if (token) {
        const res: ResBackCarrito = await carritoService(
          idProducto,
          precio,
          idUsuario,
          token,
        );
        agregarOCrearCarrito(res, idVendedor);
      }
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
