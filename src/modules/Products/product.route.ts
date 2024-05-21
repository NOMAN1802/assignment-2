import express, { Request, Response } from 'express';
import { Product } from './product.model';
import { ProductControllers } from './product.controller';
const router = express.Router()

router.post("/", ProductControllers.createProduct);

router.get("/",ProductControllers.getAllProducts);
router.get("/:productId",ProductControllers.getSingleProduct);
router.put("/:productId",ProductControllers.updateProduct);

export const ProductRoutes = router;