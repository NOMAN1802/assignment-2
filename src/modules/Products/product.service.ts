import { QueryParams, TProduct } from "./product.interface";
import { Product } from "./product.model";


const createProduct = async (productData: TProduct)=> {

    //  if (await Product.isProductExists(productData.slug)) {
    //     throw new Error('Product already exists');
    //   }
   
      // create the product to database
      const result = await Product.create(productData);
      console.log(result);
    
      return result;
  };


// const getAllProducts = async (query: QueryParams) =>{

//   try{
//     const searchOption: { [key: string]: any } = {};
//   if (query.name) {
//     searchOption.name = { $regex: query.name, $options: "i" };
//   }
//   const result = await Product.find(searchOption)
//   return result;
//   }catch(err: any){
//     throw new Error(err)
//   }
// }

const getAllProducts = async (): Promise<TProduct[]> => {
  const products = await Product.find();
  return products;
};

const searchProductsByName = async (searchTerm: string): Promise<TProduct[]> => {
  const regex = new RegExp(searchTerm, 'i'); 
  const products = await Product.find({ name: { $regex: regex } });
  return products;
};


const getSingleProduct = async (id: string) => {  
   const result = await Product.findById(id);
   return result
  }

   const updateProductDB = async (productId: string, updateData: TProduct) => {
    const updatedProduct = await Product.findByIdAndUpdate(
       productId ,
      updateData,
      { new: true}  
    );
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return updatedProduct;
  };

  const deleteProductDB = async (id: string): Promise<TProduct | null> => {
    const deletedProduct = await Product.findByIdAndDelete(id).exec()
    return deletedProduct;
  };

export const ProductServices = {
    createProduct,
    getAllProducts,
    searchProductsByName,
    getSingleProduct,
    updateProductDB ,
   deleteProductDB,
}