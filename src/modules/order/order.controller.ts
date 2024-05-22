import { Request, Response } from "express";
import { TOrder } from "./order.interface";
import { OrderServices } from "./order.service";
import { Product  } from "../Products/product.model";
import OrderZodSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;

    // Validation using Zod
    const zodParsedData = OrderZodSchema.parse(orderData);
    const orderedProduct = await Product.findById(zodParsedData.productId);
    if (!orderedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // Check  availability
    if (zodParsedData.quantity > orderedProduct.inventory.quantity) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock",
      });
    }
    // Decrease  quantity
    orderedProduct.inventory.quantity -= zodParsedData.quantity;
    // Update inStock status
    orderedProduct.inventory.inStock = orderedProduct.inventory.quantity > 0;
    await orderedProduct.save();
    const result = await OrderServices.createOrder(zodParsedData);
    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:error.massage || "Something went wrong",
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.query.email as string | undefined;

    if (email) {
      // If the email query parameter is present, fetch orders by email
      const orderData = await OrderServices.getOrdersByEmail(email);
      const message = orderData.length !== 0
        ? `Orders fetched successfully for email: ${email}`
        : `No orders found for email: ${email}`;

      res.status(200).json({
        success: true,
        message,
        data: orderData,
      });
    } else {
      // Otherwise, fetch all orders
      const orderData = await OrderServices.getAllOrders();
      const message = orderData.length !== 0 ? "Orders fetched successfully!" : "No orders found.";

      res.status(200).json({
        success: true,
        message,
        data: orderData,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};


export const OrderControllers = {
  createOrder,
  getOrders

};