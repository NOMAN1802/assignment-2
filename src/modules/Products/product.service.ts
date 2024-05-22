import { UpdateQuery } from "mongoose";
import { QueryParams, TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (productData: TProduct)=> {

     if (await Product.isProductExists(productData.productId)) {
        throw new Error('Product already exists');
      }
      // create the product to database
      const result = await Product.create(productData);
      console.log(result);
    
      return result;
  };


const getAllProducts = async (query: QueryParams) =>{

  try{
    const searchOption: { [key: string]: any } = {};
  if (query.name) {
    searchOption.name = { $regex: query.name, $options: "i" };
  }
  if (query.category) {
    searchOption.category = { $regex: query.category, $options: "i" };
  }
  const result = await Product.find(searchOption)
  return result;
  }catch(err: any){
    throw new Error(err)
  }
}

const getSingleProduct = async (id: string) => {  
   const result = await Product.findById(id).select('-_id')
   return result
  }

   const updateProduct = async (productId: string, updateData: UpdateQuery<TProduct>): Promise<TProduct | null> => {
    const result = await Product.findOneAndUpdate(
      { productId },
      updateData,
      { new: true, fields: { _id: 0 } }  
    ).exec();
    return result;
  };

  const deleteProductDB = async (id: string): Promise<TProduct | null> => {
    const deletedProduct = await Product.findByIdAndDelete(id).exec()
    return deletedProduct;
  };

export const ProductServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct ,
   deleteProductDB,
}