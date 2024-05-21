import { Request, Response } from "express"
import { ProductServices } from "./product.service"

// create a product
const createProduct = async (req: Request, res:Response)=>{
  
try{
    const productData = req.body
    const result = await ProductServices.createProduct(productData)
    res.json({
        success: true,
        message: "Product created successfully!",
        data: result,
    });
}catch(err: any){
    res.status(500).json({
        success: false,
        message: "Could not create product!",
        error: err,
      });
}

};

// get all products

const getAllProducts = async(req:Request, res: Response) =>{
   try{
    
    const result = await ProductServices.getAllProducts();
    res.json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
   }catch(err: any){
    res.status(500).json({
        success: false,
        message: "Could not fetch products!",
        error: err,
      });
   }
};

export const ProductControllers = {
    createProduct,
    getAllProducts,
}