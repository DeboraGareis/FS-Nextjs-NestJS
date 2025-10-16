import host from "./api";
import { detalleOrdenService } from "./detalleOrdenService";

interface CarritoBack {
  fecha: string;
  total: string;
  id_usuario: string;
}

const carritoService = async (
  idProducto: string,
  precio: number,
  idUsuario: string,
  token: string,
) => {
  try {
    const fecha = new Date();

    const carritoBack: CarritoBack = {
      fecha: fecha.toISOString().split("T")[0],
      total: String(precio),
      id_usuario: idUsuario,
    };
    const res = await host.post("/carrito", carritoBack, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.data.id) {
      const crearDetalleOrden = {
        id_carrito: res.data.id,
        id_producto: idProducto,
        cantidad: "1",
        precio: precio,
        token: token,
      };

      await detalleOrdenService(crearDetalleOrden);
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
    throw new Error("Error");
  }
};
export default carritoService;
