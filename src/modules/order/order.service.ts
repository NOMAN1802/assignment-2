import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";


const createOrder = async (orderData: TOrder)=> {
     
      // create the order to database
      const result = await OrderModel.create(orderData);
      console.log(result);
    
      return result;
  };
  const getAllOrders = async (): Promise<TOrder[]> => {
    const orders = await OrderModel.find();
    return orders;
  };

  const getOrdersByEmail = async (email: string): Promise<TOrder[]> => {
    const orders = await OrderModel.find({ email });
    return orders;
  };
 
export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrdersByEmail
  
};