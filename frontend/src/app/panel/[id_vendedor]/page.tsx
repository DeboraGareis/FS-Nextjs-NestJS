"use client"
import BottonPanel from "@/components/BottonPanel";
import Product, { ProductType } from "@/components/Product";
import Search from "@/components/Search";
import { fake_products } from "@/components/utils/data";

import { use } from "react";

export default function ProductosVendedor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const productos: ProductType[] = fake_products.products;
    
    return(
        <div>
        <div className="text-emerald-600 text-2xl font-extrabold my-4 px-7 py-5">
            <p className= "">Productos del vendedor </p>
            < Search />
            {/* Lista de productos */}
            <div className="flex flex-wrap border rounded-lg my-4 justify-center gap-6 px-7 py-5">
                {productos.map((producto: ProductType, index: number) => (
                <Product key={index} producto={producto} />
                ))}
            </div>
            
        </div>
        <BottonPanel/>
        </div>
        

    );
}