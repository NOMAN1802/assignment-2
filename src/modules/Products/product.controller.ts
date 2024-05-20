import { Request, Response } from "express"
import { ProductServices } from "./product.service"

const createProduct = async (req: Request, res:Response)=>{
  
    // console.log(req.body);
    const productData = req.body
    const result = await ProductServices.createProduct(productData)
    res.json({
        success: true,
        message: "Product created successfully!",
        data: result,
    });


};

export const ProductControllers = {
    createProduct,
}