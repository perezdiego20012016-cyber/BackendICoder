import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../controllers/product.controller.js";
export const productsRouter = Router();
productsRouter.get("/", asyncHandler(listProducts));
productsRouter.get("/:pid", asyncHandler(getProduct));
productsRouter.post("/", asyncHandler(createProduct));
productsRouter.put("/:pid", asyncHandler(updateProduct));
productsRouter.delete("/:pid", asyncHandler(deleteProduct));
