import Image from 'next/image';

export type ProductType= {
        Categoria: string;
        Nombre: string;
        Stock: number;
        Imagen: string;
        Precio: number;
        IdAdministrador: string;
}
type Props = {
  producto: ProductType;
};

export default function Product({ producto }: Props){
  return (
    //<div className="flex flex-col items-center border rounded-lg p-4 w-48 shadow-md">
    <div className="flex flex-col items-center border border-gray-300 p-2 w-48 shadow-md">
      {/* Precio */}
      <p className="text-lg font-semibold text-emerald-600 mb-2">
        ${producto.Precio}
      </p>

      {/* Imagen optimizada */}
      <div className="relative w-32 h-32 mb-2">
        <Image 
           src={producto.Imagen}
           alt={producto.Nombre}
          fill
          className="object-contain"
        />
      </div>

      {/* Botón de ayuda + cantidad */}
      <div className="flex items-center gap-2">
        <button
          role="img"
          aria-label="info"
          className="text-xl bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-300"
        >
          ?
        </button>
        <p className="text-sm text-gray-700">Stock: {producto.Stock}</p>
      </div>
    </div>
  );
}