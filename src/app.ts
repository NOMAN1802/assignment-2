import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/Products/product.route";
import { OrderRoutes } from "./modules/order/order.route";
const app = express();

//parsers
app.use(express.json());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next!");
});

export default app;