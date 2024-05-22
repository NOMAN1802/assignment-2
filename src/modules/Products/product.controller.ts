import { Request, Response } from "express"
import { ProductServices } from "./product.service"
import { updateProduct as updateProductDoc } from "./product.service"
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
        message: err.message || "Could not create product!",
        error: err,
      });
}

};

// get all products

const getAllProducts = async(req:Request, res: Response) =>{
  try {
    const { query } = req;
    const result = await ProductServices.getAllProducts(query);
    const isQueryEmpty = Object.keys(query).length === 0;
    res.status(200).json({
      success: true,
      message: isQueryEmpty
        ? "Products fetched successfully!"
        : `Products matching search term '${Object.values(query)}' fetched successfully!`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// Get a single product by id

const getSingleProduct = async (req: Request, res: Response) => {
    try{
    const { productId } = req.params
    const result = await ProductServices.getSingleProduct(productId)

    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    })
    }catch(err: any){
     
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve product',
        error: err.message,
    })
    }
  };
// Update a product by id

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await updateProductDoc(productId, updateData);
  
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
   
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// Delete a product

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductServices.deleteProductDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Could not delete product',
    });
  }
};

    
export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    
}