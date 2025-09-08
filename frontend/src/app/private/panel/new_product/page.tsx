"use client"
//post del producto (create)
import { crearProducto } from "@/app/service/productService";
import BottonPanel from "@/components/BottonPanel";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

export default function NewProduct() {

    const { user } = useUser(); // idAdministrador del context
    const [nombre, setNombre] = useState<string>("");   // string vacío
    const [categoria, setCategoria] = useState<string>(""); 
    const [stock, setStock] = useState<number>(0);     // número inicial válido
    const [precio, setPrecio] = useState<number>(0); 
    const [file, setFile] = useState<File | null>(null); // file separado

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!file) {
    alert("Debes seleccionar una imagen");
    return;
  }
  try {
    const producto = await crearProducto(
      {
        Nombre: nombre,
        Categoria: categoria,
        Stock: stock,
        Precio: precio,
        IdAdministrador: user, // id del admin logueado
      },
      file
    );
    console.log("Producto creado:", producto);
    alert("producto creado exitosamente");

    // 🔹 Resetear valores
    setNombre("");
    setCategoria("");
    setStock(0);
    setPrecio(0);
    setFile(null);

    // 🔹 Resetear el input file manualmente
    const fileInput = document.getElementById("Imagen") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  } catch (err) {
    console.error("Error:", err);
  }
};

    return(
        <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)] ">
            
            <BottonPanel/>
            
            <p className="text-emerald-600 text-2xl font-extrabold px-7 py-5">
                Datos del producto
            </p>
            <form onSubmit={handleSubmit} className="border-2 border-emerald-700 bg-emerald-50 px-20 py-4 rounded">
                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="category" id="category" >Categoria:</label>
                <input value={categoria} type="text" id="category"  className="border border-gray-400 rounded"
                    onChange={e => setCategoria(e.target.value)}
                    />

                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="name" id="name" >Nombre:</label>
                <input value={nombre} type="text" id="name" className="border border-gray-400 rounded" 
                    onChange={e => setNombre(e.target.value)}
                    />
                
                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="Stock" id="Stock" >Stock:</label>
                <input value={stock} type="number" id="Stock" className="border border-gray-400 rounded" 
                    onChange={e => setStock(Number(e.target.value))}
                    />

                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="Imagen" id="Imagen" >Imagen:</label>
                <input type="file" id="Imagen" className="border border-gray-400 rounded" 
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    />

                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="Precio" id="Precio" >Precio:</label>
                <input value={precio} type="number" id="Precio" className="border border-gray-400 rounded" 
                    onChange={e => setPrecio(Number(e.target.value))} 
                    />
                
                <button className=" flex flex-col items-center bg-emerald-600 my-12 hover:bg-emerald-400 font-extrabold text-white px-7 py-5 rounded-lg transition"
                type="submit">Crear producto</button>
                
            </form>
            
        </div>

    );
}