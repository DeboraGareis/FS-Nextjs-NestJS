"use client"

import BottonPanel from "@/components/BottonPanel";

export default function NewProduct() {
    return(
        <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)] ">
            
            <p className="text-emerald-600 text-2xl font-extrabold px-7">
                Datos del producto
            </p>
            <div className="border-2 border-emerald-700 bg-emerald-50 px-20 py-4 rounded">
                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="category" id="category" >Categoria:</label>
                <input type="text" id="category"  className="border border-gray-400 rounded"/>

                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="name" id="name" >Nombre:</label>
                <input type="text" id="name" className="border border-gray-400 rounded" />
                
                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="Stock" id="Stock" >Stock:</label>
                <input type="number" id="Stock" className="border border-gray-400 rounded" />

                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="Imagen" id="Imagen" >URL Imagen:</label>
                <input type="text" id="Imagen" className="border border-gray-400 rounded" />

                <label className="my-4 mt-8 block text-2xl font-extrabold" htmlFor="Precio" id="Precio" >Precio:</label>
                <input type="number" id="Precio" className="border border-gray-400 rounded" />

                {/* INCLUIR IdAdministrador */}
            </div>
            <BottonPanel/>
        </div>

    );
}