import { ProductType } from "./Product";
import { fake_products } from "./utils/data";

export type SellerType= {
        id: string; Nombre:string; Email:string
        
}
type Props = {
  seller: SellerType;
};
export default function Seller({ seller }: Props){
  return (
    <div className="flex items-center p-4 w-48 shadow-md space-x-2">
    <p className="text-lg font-semibold text-emerald-600">
        {seller.Nombre}
      </p>
      <p className="text-xs font-light inline-block text-gray-600 fle"> 
        {
          fake_products.products.filter((p: ProductType) => p.IdAdministrador === seller.id).length 
        } productos
      </p>

    </div>
  );
}