import { UpdateQuery } from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (params: TProduct) =>{

    //  custom static

  if (await Product.isProductExists(params.productId)){
    throw new Error('product already exist')
   }
    const result = await Product.create(params)
    return result;
}
const getAllProducts = async () =>{
    const result = await Product.find().select('-_id')
    return result;
}

const getSingleProduct = async (productId: string) => {
    
   const result = await Product.findOne({productId}).select('-_id')
   console.log(result);
   return result
  }

  export const updateProduct = async (productId: string, updateData: UpdateQuery<TProduct>): Promise<TProduct | null> => {
    const result = await Product.findOneAndUpdate(
      { productId },
      updateData,
      { new: true, fields: { _id: 0 } }  
    ).exec();
    console.log(result);
    return result;
  };

export const ProductServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct
}