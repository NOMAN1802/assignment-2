import { Request, Response } from "express";
import { TOrder } from "./order.interface";
import { OrderServices } from "./order.service";
import { Product as ProductModel } from "../Products/product.model";
import OrderZodSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;
    // Validation using Zod
    const zodParsedData = OrderZodSchema.parse(orderData);
    const product = await ProductModel.findById(zodParsedData.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // Check  availability
    if (zodParsedData.quantity > product.inventory.quantity) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock",
      });
    }
    // Decrease  quantity
    product.inventory.quantity -= zodParsedData.quantity;
    // Update inStock status
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();
    const result = await OrderServices.createOrder(zodParsedData);
    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};




export const OrderController = {
  createOrder,

};