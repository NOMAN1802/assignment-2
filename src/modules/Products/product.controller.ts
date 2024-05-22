import { Request, Response } from "express"
import { ProductServices } from "./product.service"
import { TProduct } from "./product.interface";

import ProductZodSchema from "./product.validation";

// create a product
const createProduct = async (req: Request, res:Response)=>{
  
try{
    const productData:TProduct = req.body;
    // Validation using Zod
    const zodParsedData = ProductZodSchema.parse(productData);

    const result = await ProductServices.createProduct(zodParsedData)
    res.json({
        success: true,
        message: "Product created successfully!",
        data: result,
    });
}catch(err){
    res.status(500).json({
        success: false,
        message:  "Could not create product!",
        error: err,
      });
}

};

// get all products & search by name

const getProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;

    if (searchTerm) {
      // If the searchTerm query parameter is present, search products by name
      const productData = await ProductServices.searchProductsByName(searchTerm);
      const message = productData.length !== 0
        ? `Products found successfully with name matching: ${searchTerm}`
        : `No products found with name matching: ${searchTerm}`;

      res.status(200).json({
        success: true,
        message,
        data: productData,
      });
    } else {
      // Otherwise, fetch all products
      const productData = await ProductServices.getAllProducts();
      const message = productData.length !== 0 ? "Products fetched successfully!" : "No products found.";

      res.status(200).json({
        success: true,
        message,
        data: productData,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

// Get a single product by id

const getSingleProduct = async (req: Request, res: Response) => {
    try{
    const { productId } = req.params;
    const result = await ProductServices.getSingleProduct(productId)

    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    })
    }catch(err){
     
      res.status(500).json({
        success: false,
        message:  'Failed to retrieve product',
        error: err,
    });
    }
  };

// Update a product by id

 const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const zodParsedData = ProductZodSchema.parse(updateData);
    const result = await ProductServices.updateProductDB(productId, zodParsedData);
  
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
   
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || 'Something went wrong',
      error: err,
    });
  }
};

// Delete a product

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductServices.deleteProductDB(productId);
    console.log(deletedProduct);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: null ,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error|| 'Could not delete product',
    });
  }
};

    
export const ProductControllers = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    
}