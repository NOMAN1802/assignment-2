import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/Products/product.route";
import { OrderRoutes } from "./modules/order/order.route";
const app = express();

//parsers
app.use(express.json());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

// Route not found middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
    error: err,
  });
});


app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next!");
});

export default app;