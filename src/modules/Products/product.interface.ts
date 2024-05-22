import { Model } from "mongoose";


export type TVariant = {
    type: string;
    value: string;
};

export type TInventory = {
    quantity: number;
    inStock: boolean;
};

export type TProduct = {
    name: string;
    productId:string,
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: TVariant[];
    inventory: TInventory;
};

export type QueryParams = {
    name?: string;
    category?: string; 
  };

// for creating static 
export interface ProductModel extends Model<TProduct>{
    isProductExists(productId: string): Promise<TProduct | null>
}