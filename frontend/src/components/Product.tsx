import { ChangeEvent, FormEvent } from "react";
import { fake_products } from "./utils/data";
export default function Production() {
  const productos = fake_products

  return (
    <div  className="flex items-center gap-2 w-full max-w-md">
      <p></p>
      <div className="flex-grow px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"> 
        
      </div>
      <span role="img" aria-label="search" className="text-2xl" >?</span>
    </div>
  );
}