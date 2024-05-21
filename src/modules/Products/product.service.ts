import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (params: TProduct) =>{
    const result = await Product.create(params)
    return result;
}
const getAllProducts = async () =>{
    const result = await Product.find().select('-_id')
    return result;
}

const getSingleProduct = async (id: string) => {
    
     const result = await Product.findById(id).select('-_id')
   console.log(result);
   return result
  }

export const ProductServices = {
    createProduct,
    getAllProducts,
    getSingleProduct
}